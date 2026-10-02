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
  type PointerInfluence,
} from "./physics";
import { earthColors as colors } from "./earthTheme";

export interface SceneSettings {
  paused: boolean;
  field: boolean;
  intensity: number;
  mouseStrength: number;
  flareId: number;
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
  renderer.toneMappingExposure = 1.1;
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
  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
  camera.position.set(0, 0.4, 10.5);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.enableZoom = false;
  controls.enablePan = false;
  controls.minPolarAngle = Math.PI * 0.3;
  controls.maxPolarAngle = Math.PI * 0.7;
  controls.rotateSpeed = 0.35;
  controls.touches.ONE = THREE.TOUCH.ROTATE;

  scene.add(new THREE.AmbientLight(0x849fc8, 0.42));
  const sun = new THREE.DirectionalLight(0xfff5e6, 2.3);
  sun.position.set(-5, 3, 5);
  scene.add(sun);
  const globe = new THREE.Group();
  globe.rotation.z = EARTH_AXIAL_TILT;
  scene.add(globe);
  const geometry = new THREE.SphereGeometry(1, 96, 64);
  const earthMaterial = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    shininess: 16,
    specular: 0x687987,
  });
  const earth = new THREE.Mesh(geometry, earthMaterial);
  earth.rotation.y = 2.9;
  globe.add(earth);
  const cloudMaterial = new THREE.MeshPhongMaterial({
    transparent: true,
    opacity: 0.6,
    depthWrite: false,
  });
  const clouds = new THREE.Mesh(
    new THREE.SphereGeometry(1.012, 80, 48),
    cloudMaterial,
  );
  clouds.rotation.y = earth.rotation.y;
  globe.add(clouds);

  // View-dependent atmospheric limb. Its illumination remains on the sunward
  // side while the globe rotates independently underneath it.
  const atmosphereMaterial = new THREE.ShaderMaterial({
    uniforms: { tint: { value: new THREE.Color(colors.atmosphere) } },
    vertexShader: `varying vec3 n; varying vec3 p;
      void main() { n = normalize(mat3(modelMatrix) * normal);
      p = (modelMatrix * vec4(position, 1.)).xyz;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.); }`,
    fragmentShader: `uniform vec3 tint; varying vec3 n; varying vec3 p;
      void main() { float rim = pow(1. - abs(dot(normalize(n), normalize(cameraPosition-p))), 3.5);
      float sun = .3 + .7 * max(dot(normalize(n), normalize(vec3(-5.,3.,5.))),0.);
      gl_FragColor = vec4(tint * 1.4, rim * sun * .72); }`,
    transparent: true,
    blending: THREE.AdditiveBlending,
    side: THREE.BackSide,
    depthWrite: false,
  });
  scene.add(
    new THREE.Mesh(new THREE.SphereGeometry(1.045, 80, 48), atmosphereMaterial),
  );

  const fieldGroup = new THREE.Group();
  fieldGroup.rotation.z = DIPOLE_TILT;
  scene.add(fieldGroup);
  // Exact ideal-dipole integral curves: r = L sin²(theta). They terminate at
  // the globe and share the magnetic axis used by the particle integrator.
  for (const shell of [1.65, 2.25, 3.05, 4.1]) {
    const start = Math.asin(Math.sqrt(1.025 / shell));
    for (let meridian = 0; meridian < 10; meridian++) {
      const phi = (meridian / 10) * Math.PI * 2;
      const points: THREE.Vector3[] = [];
      for (let j = 0; j <= 160; j++) {
        const theta = start + ((Math.PI - 2 * start) * j) / 160;
        const r = shell * Math.sin(theta) ** 2;
        points.push(
          new THREE.Vector3(
            r * Math.sin(theta) * Math.cos(phi),
            r * Math.cos(theta),
            r * Math.sin(theta) * Math.sin(phi),
          ),
        );
      }
      const line = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(points),
        new THREE.LineBasicMaterial({
          color: colors.field,
          transparent: true,
          opacity: meridian % 5 === 0 ? 0.28 : 0.11,
          depthWrite: false,
        }),
      );
      fieldGroup.add(line);
    }
  }

  const mobile = host.clientWidth < 700;
  const simulation = new ParticleSimulation(mobile ? 1800 : 4200);
  // Warm up a deterministic fixed-step evolution so the first frame already
  // contains curved trajectories instead of a blank emitter.
  for (let j = 0; j < 160; j++) simulation.step(1 / 60, 0.45, 0);
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
    color.set(
      i % 5 === 0 ? colors.field : i % 7 === 0 ? colors.paleWind : colors.wind,
    );
    color.multiplyScalar(i % 23 === 0 ? 2.2 : 1.05);
    color.toArray(particleColors, i * 3);
    sizes[i] = i % 23 === 0 ? 5.2 : 1.6 + Math.random() * 1.6;
  }
  particleGeometry.setAttribute(
    "color",
    new THREE.BufferAttribute(particleColors, 3),
  );
  particleGeometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
  const particleMaterial = new THREE.ShaderMaterial({
    uniforms: {
      pixelRatio: { value: renderer.getPixelRatio() },
      flareCenter: { value: -10 },
      flareStrength: { value: 0 },
    },
    vertexShader: `attribute float size; varying vec3 c; uniform float pixelRatio;
      uniform float flareCenter; uniform float flareStrength;
      void main() { float d = (position.x-flareCenter)/1.8;
      float burst = flareStrength * exp(-d*d);
      c = color * (1. + burst * 2.); vec4 mv = modelViewMatrix * vec4(position,1.);
      gl_PointSize = size * (1. + burst*.45) * pixelRatio * clamp(10. / -mv.z,.5,2.);
      gl_Position = projectionMatrix * mv; }`,
    fragmentShader: `varying vec3 c;
      void main() { float r = length(gl_PointCoord - .5) * 2.; if(r > 1.) discard;
      gl_FragColor = vec4(c, exp(-r*r*4.) * .9); }`,
    vertexColors: true,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const particles = new THREE.Points(particleGeometry, particleMaterial);
  particles.frustumCulled = false;
  scene.add(particles);

  const trailPositions = new Float32Array(simulation.count * 6);
  const trailGeometry = new THREE.BufferGeometry();
  trailGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(trailPositions, 3).setUsage(
      THREE.DynamicDrawUsage,
    ),
  );
  const trails = new THREE.LineSegments(
    trailGeometry,
    new THREE.LineBasicMaterial({
      color: colors.wind,
      transparent: true,
      opacity: 0.12,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    }),
  );
  trails.frustumCulled = false;
  scene.add(trails);

  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  const bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), 0.42, 0.55, 1.1);
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
      earthMaterial.normalScale.set(0.45, 0.45);
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
    camera.fov = width < 700 ? 38 : 34;
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
  let lastTime = 0,
    accumulator = 0,
    flare = 0,
    flareAge = 0,
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
      flare = 1;
      flareAge = 0;
      lastFlare = current.flareId;
    }
    if (fieldGroup.visible !== current.field) {
      fieldGroup.visible = current.field;
      renderDirty = true;
    }
    if (!current.paused) {
      accumulator += dt;
      while (accumulator >= STEP) {
        simulation.step(
          STEP,
          current.intensity,
          flare,
          -10 + flareAge * 3,
          pointer.strength > 0 ? pointer : undefined,
        );
        flareAge += STEP;
        accumulator -= STEP;
      }
      flare *= Math.exp(-dt * 0.09);
      if (flareAge > 9) flare = 0;
      particleMaterial.uniforms.flareCenter.value = -10 + flareAge * 3;
      particleMaterial.uniforms.flareStrength.value = flare;
      earth.rotation.y += dt * 0.022;
      clouds.rotation.y += dt * 0.026;
      for (let i = 0; i < simulation.count; i++) {
        const k = i * 3,
          t = i * 6;
        for (let j = 0; j < 3; j++) {
          trailPositions[t + j] = simulation.positions[k + j];
          trailPositions[t + 3 + j] =
            simulation.positions[k + j] - simulation.velocities[k + j] * 0.055;
        }
      }
      particleGeometry.attributes.position.needsUpdate = true;
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
