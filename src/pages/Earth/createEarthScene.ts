import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import {
  DIPOLE_TILT,
  EARTH_AXIAL_TILT,
  ParticleSimulation,
  STEP,
  SUN_POSITION,
  flowToWorld,
  magnetospherePoint,
  dipoleMeridianPoint,
  type PointerInfluence,
} from "./physics";
import type { PhysicsSettings } from "./physicsSettings";
import { earthColors as colors } from "./earthTheme";

export interface SceneSettings {
  paused: boolean;
  field: boolean;
  intensity: number;
  mouseStrength: number;
  flareId: number;
  resetId: number;
  physics: PhysicsSettings;
  chargeColors: boolean;
  sunSize: number;
  timeScale: number;
}

export function createEarthScene(
  host: HTMLDivElement,
  settings: { current: SceneSettings },
  onReady: () => void,
  onError: (message: string) => void,
) {
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: false,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
  renderer.setClearColor(0x000000);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;
  renderer.domElement.setAttribute(
    "aria-label",
    "Rotating Earth with magnetic dipole field lines and flowing solar particles. Move your mouse to stir the particles. Drag to orbit the view.",
  );
  renderer.domElement.setAttribute("role", "img");
  renderer.domElement.style.touchAction = "pan-y";
  renderer.domElement.style.cursor = "crosshair";
  host.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  // A scene background clears in the render target's linear color space;
  // clearing before RenderPass would apply the screen's sRGB transform twice.
  scene.background = new THREE.Color(colors.space);
  const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 2000);
  camera.position.set(0, 0.65, 11.5);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.enableZoom = false;
  controls.enablePan = false;
  controls.minPolarAngle = Math.PI * 0.3;
  controls.maxPolarAngle = Math.PI * 0.7;
  controls.rotateSpeed = 0.35;
  controls.touches.ONE = THREE.TOUCH.ROTATE;

  const sun = new THREE.DirectionalLight(0xffffff, 3.0);
  sun.position.set(...SUN_POSITION);
  sun.target.position.set(0, 0, 0);
  scene.add(sun);
  const globe = new THREE.Group();
  globe.rotation.z = EARTH_AXIAL_TILT;
  scene.add(globe);
  const geometry = new THREE.SphereGeometry(1, 96, 64);
  const earthMaterial = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    shininess: 45,
    specular: 0x161b20,
  });
  // A small daylight ocean-scattering contribution gives the dark surface
  // reflectance map its orbital blue appearance without an external halo.
  earthMaterial.onBeforeCompile = (shader) => {
    shader.fragmentShader = shader.fragmentShader.replace(
      "#include <map_fragment>",
      `
      #include <map_fragment>
      #ifdef USE_SPECULARMAP
        float ocean = texture2D(specularMap, vSpecularMapUv).r;
        diffuseColor.rgb += vec3(.009, .032, .065) * ocean;
      #endif
    `,
    );
  };
  const earth = new THREE.Mesh(geometry, earthMaterial);
  earth.rotation.y = 2.9;
  globe.add(earth);
  const cloudMaterial = new THREE.MeshPhongMaterial({
    transparent: true,
    opacity: 0.93,
    depthWrite: false,
  });
  const clouds = new THREE.Mesh(
    new THREE.SphereGeometry(1.012, 80, 48),
    cloudMaterial,
  );
  clouds.rotation.y = earth.rotation.y;
  globe.add(clouds);

  // A white solar disk with a gentle limb falloff. Distances and its size are
  // deliberately compressed; the illumination direction stays sunward.
  const sunDisk = new THREE.Mesh(
    new THREE.SphereGeometry(1, 64, 48),
    new THREE.ShaderMaterial({
      vertexShader: `varying vec3 n; varying vec3 p;
        void main(){n=normalize(normalMatrix*normal); vec4 v=modelViewMatrix*vec4(position,1.);
        p=v.xyz; gl_Position=projectionMatrix*v;}`,
      fragmentShader: `varying vec3 n; varying vec3 p;
        void main(){float mu=max(dot(normalize(n),normalize(-p)),0.);
        gl_FragColor=vec4(vec3(1.35+.35*sqrt(mu)),1.);}`,
    }),
  );
  // The distant disk and directional light share the same Earth-to-Sun axis.
  // Its size is angular diameter, independent of irradiance on Earth.
  sunDisk.position.set(...SUN_POSITION);
  scene.add(sunDisk);

  const fieldGroup = new THREE.Group();
  scene.add(fieldGroup);
  // One continuous thick trace, through the two meridional lobes. Mapping it
  // with the same deformation as B keeps the displayed field and forces aligned.
  const fieldPoints: THREE.Vector3[] = [];
  for (let j = 0; j < 720; j++) {
    const theta = (j / 720) * Math.PI * 2;
    const p = dipoleMeridianPoint(theta);
    fieldPoints.push(new THREE.Vector3(...magnetospherePoint(...p)));
  }
  const fieldCurve = new THREE.CatmullRomCurve3(fieldPoints, true);
  const fieldMaterial = new THREE.MeshBasicMaterial({
    color: colors.field,
    transparent: true,
    opacity: 0.64,
  });
  fieldGroup.add(
    new THREE.Mesh(
      new THREE.TubeGeometry(fieldCurve, 720, 0.018, 6, true),
      fieldMaterial,
    ),
  );
  // Scale-compressed Shue-style boundary silhouette. This is a distinct,
  // subdued reference for the magnetopause, not an additional dipole shell.
  const boundaryPoints: THREE.Vector3[] = [];
  for (let j = 0; j <= 360; j++) {
    const theta = -2.35 + (j / 360) * 4.7;
    const r = 3.35 * (2 / (1 + Math.cos(theta))) ** 0.55;
    boundaryPoints.push(
      new THREE.Vector3(
        ...flowToWorld(-r * Math.cos(theta), r * Math.sin(theta) * 0.6, -0.15),
      ),
    );
  }
  const boundary = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints(boundaryPoints),
    new THREE.LineDashedMaterial({
      color: colors.field,
      transparent: true,
      opacity: 0.13,
      dashSize: 0.06,
      gapSize: 0.09,
    }),
  );
  boundary.computeLineDistances();
  fieldGroup.add(boundary);

  // Thin auroral curtains, independently illuminated by precipitation at each
  // magnetic pole. No atmospheric blue shell surrounds the globe.
  const auroras: THREE.ShaderMaterial[] = [];
  const auroraGroup = new THREE.Group();
  auroraGroup.rotation.z = DIPOLE_TILT;
  scene.add(auroraGroup);
  for (const pole of [1, -1]) {
    const auroraGeometry = new THREE.SphereGeometry(
      1.035,
      128,
      12,
      0,
      Math.PI * 2,
      pole > 0 ? 0.25 : Math.PI - 0.43,
      0.18,
    );
    const material = new THREE.ShaderMaterial({
      uniforms: {
        bandStart: { value: pole > 0 ? 0.25 : Math.PI - 0.43 },
        activity: { value: 0 },
        time: { value: 0 },
        tint: { value: new THREE.Color(colors.aurora) },
      },
      vertexShader: `varying vec2 vUv; uniform float bandStart; void main(){vUv=vec2(uv.x,(acos(clamp(normal.y,-1.,1.))-bandStart)/.18); gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,
      fragmentShader: `varying vec2 vUv; uniform float activity; uniform float time; uniform vec3 tint;
        void main(){float curtain=.5+.5*sin(vUv.x*170.+sin(vUv.x*45.+time)*2.);
        float edge=pow(sin(vUv.y*3.14159265),1.5);
        gl_FragColor=vec4(tint*1.8,edge*curtain*activity*.7);}`,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    auroras.push(material);
    auroraGroup.add(new THREE.Mesh(auroraGeometry, material));
  }

  const mobile = host.clientWidth < 700;
  const simulation = new ParticleSimulation(mobile ? 1800 : 4200);
  const particleGeometry = new THREE.BufferGeometry();
  particleGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(simulation.positions, 3).setUsage(
      THREE.DynamicDrawUsage,
    ),
  );
  const particleColors = new Float32Array(simulation.count * 3);
  const sizes = new Float32Array(simulation.count);
  const color = new THREE.Color();
  for (let i = 0; i < simulation.count; i++) {
    color.set(simulation.charges[i] > 0 ? colors.wind : colors.electron);
    color.multiplyScalar(i % 23 === 0 ? 2.7 : 1.15);
    color.toArray(particleColors, i * 3);
    sizes[i] = i % 23 === 0 ? 6.5 : 1.3 + Math.random() ** 2 * 3.0;
  }
  particleGeometry.setAttribute(
    "color",
    new THREE.BufferAttribute(particleColors, 3),
  );
  particleGeometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
  particleGeometry.setAttribute(
    "visibility",
    new THREE.BufferAttribute(simulation.active, 1).setUsage(
      THREE.DynamicDrawUsage,
    ),
  );
  const particleMaterial = new THREE.ShaderMaterial({
    uniforms: { pixelRatio: { value: renderer.getPixelRatio() } },
    vertexShader: `attribute float size; attribute float visibility; varying vec3 c;
      varying float opacity; uniform float pixelRatio;
      void main() { c=color; opacity=visibility; vec4 mv=modelViewMatrix*vec4(position,1.);
      gl_PointSize=size*pixelRatio*clamp(11./-mv.z,.5,2.5);
      gl_Position=projectionMatrix*mv; }`,
    fragmentShader: `varying vec3 c; varying float opacity;
      void main() { float r=length(gl_PointCoord-.5)*2.; if(r>1. || opacity<.5) discard;
      float core=exp(-r*r*18.); float halo=exp(-r*r*4.5)*.28;
      gl_FragColor=vec4(c, (core+halo)*.9); }`,
    vertexColors: true,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const particles = new THREE.Points(particleGeometry, particleMaterial);
  particles.frustumCulled = false;
  scene.add(particles);

  const trailSegments = 8;
  const trailPositions = new Float32Array(simulation.count * trailSegments * 6);
  const history = new Float32Array(simulation.count * (trailSegments + 1) * 3);
  const trailColors = new Float32Array(trailPositions.length);
  for (let i = 0; i < simulation.count; i++) {
    for (let j = 0; j < trailSegments; j++) {
      for (let v = 0; v < 2; v++) {
        const fade = (1 - (j + v) / trailSegments) * 0.24;
        for (let c = 0; c < 3; c++)
          trailColors[(i * trailSegments + j) * 6 + v * 3 + c] =
            particleColors[i * 3 + c] * fade;
      }
    }
  }
  const trailGeometry = new THREE.BufferGeometry();
  trailGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(trailPositions, 3).setUsage(
      THREE.DynamicDrawUsage,
    ),
  );
  trailGeometry.setAttribute(
    "color",
    new THREE.BufferAttribute(trailColors, 3),
  );
  const trails = new THREE.LineSegments(
    trailGeometry,
    new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.24,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    }),
  );
  trails.frustumCulled = false;
  scene.add(trails);

  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  const bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), 0.2, 0.15, 1.5);
  composer.addPass(bloom);
  composer.addPass(new OutputPass());

  let disposed = false;
  let renderDirty = true;
  const textures: THREE.Texture[] = [];
  const loader = new THREE.TextureLoader();
  const base = `${import.meta.env.BASE_URL}earth/`;
  const load = (
    filename: string,
    apply: (texture: THREE.Texture) => void,
    srgb = false,
  ) =>
    new Promise<void>((resolve, reject) => {
      loader.load(
        base + filename,
        (texture) => {
          if (disposed) {
            texture.dispose();
            resolve();
            return;
          }
          texture.colorSpace = srgb ? THREE.SRGBColorSpace : THREE.NoColorSpace;
          texture.anisotropy = Math.min(
            renderer.capabilities.getMaxAnisotropy(),
            8,
          );
          textures.push(texture);
          apply(texture);
          renderDirty = true;
          resolve();
        },
        undefined,
        reject,
      );
    });
  Promise.all([
    load(
      "earth-day.jpg",
      (texture) => {
        earthMaterial.map = texture;
        earthMaterial.needsUpdate = true;
      },
      true,
    ),
    load("earth-normal.jpg", (texture) => {
      earthMaterial.normalMap = texture;
      earthMaterial.normalScale.set(0.08, 0.08);
      earthMaterial.needsUpdate = true;
    }),
    load("earth-specular.jpg", (texture) => {
      earthMaterial.specularMap = texture;
      earthMaterial.needsUpdate = true;
    }),
    load(
      "earth-clouds.png",
      (texture) => {
        cloudMaterial.map = texture;
        cloudMaterial.needsUpdate = true;
      },
      true,
    ),
  ])
    .then(() => {
      if (!disposed) onReady();
    })
    .catch(() => {
      if (!disposed)
        onError("The Earth textures could not load. Refresh to try again.");
    });

  const resize = () => {
    const width = host.clientWidth,
      height = host.clientHeight;
    if (!width || !height) return;
    camera.aspect = width / height;
    // Mobile keeps the globe and inner field in view without squeezing Earth.
    camera.fov = width < 700 ? 48 : 40;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
    composer.setSize(width, height);
    renderDirty = true;
  };
  const observer = new ResizeObserver(resize);
  observer.observe(host);
  resize();

  const pointerNdc = new THREE.Vector2();
  const pointerRay = new THREE.Raycaster();
  const pointerPlane = new THREE.Plane();
  const viewNormal = new THREE.Vector3();
  const pointerPosition = new THREE.Vector3();
  const pointer: PointerInfluence = {
    position: [0, 0, 0],
    normal: [0, 0, 1],
    strength: 0,
  };
  let pointerActive = false;
  const pointerMaterial = new THREE.MeshBasicMaterial({
    color: colors.field,
    transparent: true,
    opacity: 0,
    depthTest: false,
    depthWrite: false,
  });
  const pointerMarker = new THREE.Mesh(
    new THREE.RingGeometry(0.105, 0.115, 40),
    pointerMaterial,
  );
  pointerMarker.renderOrder = 10;
  scene.add(pointerMarker);
  const movePointer = (event: PointerEvent) => {
    // Preserve touch scrolling and drag-to-orbit. Hover alone stirs particles.
    pointerActive = event.pointerType !== "touch" && event.buttons === 0;
    const rect = renderer.domElement.getBoundingClientRect();
    pointerNdc.set(
      ((event.clientX - rect.left) / rect.width) * 2 - 1,
      1 - ((event.clientY - rect.top) / rect.height) * 2,
    );
  };
  const clearPointer = () => {
    pointerActive = false;
  };
  renderer.domElement.addEventListener("pointermove", movePointer);
  renderer.domElement.addEventListener("pointerup", movePointer);
  renderer.domElement.addEventListener("pointerdown", clearPointer);
  renderer.domElement.addEventListener("pointerleave", clearPointer);
  renderer.domElement.addEventListener("pointercancel", clearPointer);
  window.addEventListener("blur", clearPointer);
  const clearHiddenPointer = () => {
    if (document.hidden) clearPointer();
  };
  document.addEventListener("visibilitychange", clearHiddenPointer);

  let visible = true;
  const intersection = new IntersectionObserver((entries) => {
    visible = entries[0].isIntersecting;
  });
  intersection.observe(host);
  let lastSettings = settings.current;
  let lastReset = -1;
  let lastColors: boolean | undefined;
  const refreshColors = (byCharge: boolean) => {
    for (let i = 0; i < simulation.count; i++) {
      color.set(
        byCharge
          ? simulation.charges[i] > 0
            ? colors.wind
            : colors.electron
          : colors.sun,
      );
      color.multiplyScalar(i % 23 === 0 ? 2.7 : 1.15);
      color.toArray(particleColors, i * 3);
      for (let j = 0; j < trailSegments; j++)
        for (let v = 0; v < 2; v++) {
          const fade = (1 - (j + v) / trailSegments) * 0.24;
          for (let c = 0; c < 3; c++)
            trailColors[(i * trailSegments + j) * 6 + v * 3 + c] =
              particleColors[i * 3 + c] * fade;
        }
    }
    particleGeometry.attributes.color.needsUpdate = true;
    trailGeometry.attributes.color.needsUpdate = true;
  };
  let lastTime = 0,
    accumulator = 0,
    lastFlare = settings.current.flareId;
  const frame = (now: number) => {
    if (disposed) return;
    const dt = Math.min((now - (lastTime || now)) / 1000, 0.05);
    lastTime = now;
    if (!visible || document.hidden) {
      clearPointer();
      return;
    }
    const current = settings.current;
    if (lastSettings !== current) {
      if (lastSettings.physics !== current.physics) simulation.guided.fill(0);
      lastSettings = current;
      renderDirty = true;
    }
    simulation.settings = current.physics;
    sunDisk.scale.setScalar(
      sunDisk.position.distanceTo(camera.position) *
        Math.tan((current.sunSize * Math.PI) / 360),
    );
    if (lastColors !== current.chargeColors) {
      refreshColors(current.chargeColors);
      lastColors = current.chargeColors;
      renderDirty = true;
    }
    if (lastReset !== current.resetId) {
      simulation.reset();
      history.fill(0);
      trailPositions.fill(0);
      particleGeometry.attributes.visibility.needsUpdate = true;
      trailGeometry.attributes.position.needsUpdate = true;
      auroras.forEach((material) => {
        material.uniforms.activity.value = 0;
      });
      lastReset = current.resetId;
      accumulator = 0;
      renderDirty = true;
    }
    const cameraMoved = controls.update();
    const oldStrength = pointer.strength;
    pointer.strength =
      current.mouseStrength === 0
        ? 0
        : pointer.strength +
          ((pointerActive ? current.mouseStrength : 0) - pointer.strength) *
            (1 - Math.exp(-dt * 12));
    if (pointer.strength < 0.001) pointer.strength = 0;
    if (
      pointerActive ||
      pointer.strength > 0 ||
      oldStrength !== pointer.strength
    ) {
      camera.getWorldDirection(viewNormal).negate();
      pointerPlane.setFromNormalAndCoplanarPoint(viewNormal, controls.target);
      pointerRay.setFromCamera(pointerNdc, camera);
      if (pointerRay.ray.intersectPlane(pointerPlane, pointerPosition)) {
        pointer.position = [
          pointerPosition.x,
          pointerPosition.y,
          pointerPosition.z,
        ];
        pointer.normal = [viewNormal.x, viewNormal.y, viewNormal.z];
        pointerMarker.position.copy(pointerPosition);
        pointerMarker.quaternion.copy(camera.quaternion);
      }
      pointerMaterial.opacity = pointer.strength * 0.55;
      renderDirty = true;
    }
    if (lastFlare !== current.flareId) {
      simulation.launchEruption();
      lastFlare = current.flareId;
    }
    if (fieldGroup.visible !== current.field) {
      fieldGroup.visible = current.field;
      renderDirty = true;
    }
    if (!current.paused) {
      accumulator += dt * current.timeScale;
      while (accumulator >= STEP) {
        simulation.step(
          STEP,
          current.intensity,
          pointer.strength > 0 ? pointer : undefined,
        );
        accumulator -= STEP;
      }
      auroras.forEach((material, pole) => {
        material.uniforms.activity.value = Math.min(
          1,
          simulation.precipitation[pole],
        );
        material.uniforms.time.value += dt;
      });
      earth.rotation.y += dt * 0.022;
      clouds.rotation.y += dt * 0.026;
      for (let i = 0; i < simulation.count; i++) {
        const k = i * 3,
          h = i * (trailSegments + 1) * 3;
        for (let j = trailSegments; j >= 0; j--) {
          for (let c = 0; c < 3; c++) {
            history[h + j * 3 + c] =
              j === 0 ||
              simulation.ages[i] <= dt + STEP ||
              !simulation.active[i]
                ? simulation.positions[k + c]
                : history[h + (j - 1) * 3 + c];
          }
        }
        for (let j = 0; j < trailSegments; j++) {
          const t = (i * trailSegments + j) * 6;
          for (let c = 0; c < 3; c++) {
            trailPositions[t + c] = history[h + j * 3 + c];
            trailPositions[t + c + 3] = history[h + (j + 1) * 3 + c];
          }
        }
      }
      particleGeometry.attributes.position.needsUpdate = true;
      particleGeometry.attributes.visibility.needsUpdate = true;
      trailGeometry.attributes.position.needsUpdate = true;
    }
    if (!current.paused || cameraMoved || renderDirty) composer.render();
    renderDirty = false;
  };
  const contextLost = (event: Event) => {
    event.preventDefault();
    renderer.setAnimationLoop(null);
    onError(
      "The graphics context was interrupted. Refresh to restart the scene.",
    );
  };
  renderer.domElement.addEventListener("webglcontextlost", contextLost);
  renderer.setAnimationLoop(frame);

  return () => {
    disposed = true;
    renderer.setAnimationLoop(null);
    observer.disconnect();
    intersection.disconnect();
    controls.dispose();
    renderer.domElement.removeEventListener("pointermove", movePointer);
    renderer.domElement.removeEventListener("pointerup", movePointer);
    renderer.domElement.removeEventListener("pointerdown", clearPointer);
    renderer.domElement.removeEventListener("pointerleave", clearPointer);
    renderer.domElement.removeEventListener("pointercancel", clearPointer);
    window.removeEventListener("blur", clearPointer);
    document.removeEventListener("visibilitychange", clearHiddenPointer);
    renderer.domElement.removeEventListener("webglcontextlost", contextLost);
    scene.traverse((object) => {
      if (
        object instanceof THREE.Mesh ||
        object instanceof THREE.Line ||
        object instanceof THREE.Points
      ) {
        object.geometry.dispose();
        const materials = Array.isArray(object.material)
          ? object.material
          : [object.material];
        materials.forEach((material) => material.dispose());
      }
    });
    textures.forEach((texture) => texture.dispose());
    composer.passes.forEach((pass) => pass.dispose());
    composer.dispose();
    renderer.dispose();
    renderer.domElement.remove();
  };
}
