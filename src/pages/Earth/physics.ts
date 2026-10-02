import { DEFAULT_PHYSICS, type PhysicsSettings } from "./physicsSettings";
/**
 * A reduced test-particle model, NOT an MHD or space-weather prediction solver.
 * Length unit: Earth radius. Visual time, gyrofrequency, and wind are scaled.
 * Magnetic rotation: Boris pusher. Gravity: inverse-square central acceleration.
 * A prescribed stretched field and guiding-center cusp population illustrate
 * gyromotion, magnetic mirroring, and atmospheric precipitation.
 * SI-based inputs with explicitly reduced electromagnetic acceleration.
 * Optional Stokes drag and prescribed cusp capture are disabled by default.
 * https://docs.plasmapy.org/en/stable/api/plasmapy.simulation.particle_integrators.BorisIntegrator.html
 */
export type Vec3 = [number, number, number];
export interface PointerInfluence {
  position: Vec3;
  normal: Vec3;
  strength: number;
}

/** Bounded local repulsion and swirl for exploration, separate from physics. */
export function pointerAcceleration(
  x: number,
  y: number,
  z: number,
  pointer: PointerInfluence,
): Vec3 {
  const dx = x - pointer.position[0],
    dy = y - pointer.position[1],
    dz = z - pointer.position[2];
  const [nx, ny, nz] = pointer.normal;
  const depth = dx * nx + dy * ny + dz * nz;
  const px = dx - depth * nx,
    py = dy - depth * ny,
    pz = dz - depth * nz;
  const distance2 = px * px + py * py + pz * pz;
  const envelope =
    pointer.strength * Math.exp(-distance2 / 0.9 - (depth * depth) / 18);
  const repulsion = (7 * envelope) / Math.sqrt(distance2 + 0.16);
  const swirl = 3 * envelope;
  return [
    px * repulsion + (ny * pz - nz * py) * swirl,
    py * repulsion + (nz * px - nx * pz) * swirl,
    pz * repulsion + (nx * py - ny * px) * swirl,
  ];
}
export const EARTH_AXIAL_TILT = -(23.44 * Math.PI) / 180;
// A dipole tilted approximately 11 degrees relative to the spin axis.
// Its moment points southward: B enters Earth near the northern magnetic pole.
export const DIPOLE_TILT = EARTH_AXIAL_TILT + (11 * Math.PI) / 180;
export const EARTH_GRAVITY = 3.986004418e14 / (6.371e6 * 400_000 ** 2);
export const STEP = 1 / 120;
export const EARTH_RADIUS = 6.371e6;
export const VELOCITY_UNIT = 400_000;
export const PROTON_CHARGE_MASS = 1.602176634e-19 / 1.67262192369e-27;

// One Earth-to-Sun direction owns the visible disk, incoming plasma, and
// compression axis. A world-space frame keeps them aligned when orbiting.
export const SUN_POSITION: Vec3 = [-42, 16, -90];
const sunDistance = Math.hypot(...SUN_POSITION);
export const FLOW_DIRECTION = SUN_POSITION.map((v) => -v / sunDistance) as Vec3;
const transverseLength = Math.hypot(FLOW_DIRECTION[0], FLOW_DIRECTION[2]);
const FLOW_SIDE: Vec3 = [
  -FLOW_DIRECTION[2] / transverseLength,
  0,
  FLOW_DIRECTION[0] / transverseLength,
];
const FLOW_UP: Vec3 = [
  FLOW_SIDE[1] * FLOW_DIRECTION[2] - FLOW_SIDE[2] * FLOW_DIRECTION[1],
  FLOW_SIDE[2] * FLOW_DIRECTION[0] - FLOW_SIDE[0] * FLOW_DIRECTION[2],
  FLOW_SIDE[0] * FLOW_DIRECTION[1] - FLOW_SIDE[1] * FLOW_DIRECTION[0],
];
export function flowToWorld(x: number, y: number, z: number): Vec3 {
  return [0, 1, 2].map(
    (i) => x * FLOW_DIRECTION[i] + y * FLOW_UP[i] + z * FLOW_SIDE[i],
  ) as Vec3;
}
export function worldToFlow(x: number, y: number, z: number): Vec3 {
  return [FLOW_DIRECTION, FLOW_UP, FLOW_SIDE].map(
    (v) => x * v[0] + y * v[1] + z * v[2],
  ) as Vec3;
}

/** Convert SI q/m into normalized acceleration per microtesla. The same
 * explicit scale multiplies electric and magnetic acceleration, preserving
 * E-cross-B drift and the real species mass ratio while enlarging gyro-orbits.
 */
export function normalizedChargeMass(sign: number, settings: PhysicsSettings) {
  return (
    ((((sign * PROTON_CHARGE_MASS * EARTH_RADIUS) / VELOCITY_UNIT) *
      1e-6 *
      settings.charge) /
      settings.ionMass) *
    (sign < 0 ? settings.massRatio : 1) *
    settings.gyroScale
  );
}

export function physicalField(
  x: number,
  y: number,
  z: number,
  settings: PhysicsSettings,
): Vec3 {
  const b = magnetosphereField(x, y, z);
  return [
    (b[0] * settings.surfaceField) / 18,
    (b[1] * settings.surfaceField) / 18 + settings.imf / 1000,
    (b[2] * settings.surfaceField) / 18,
  ];
}

/** E = -U cross B_IMF. B_IMF is along world +y; flow points from the Sun toward Earth.
 * Returns E / velocity unit in microtesla for the normalized Boris kick.
 */
export function convectionElectricField(settings: PhysicsSettings): Vec3 {
  const scale =
    (((settings.windSpeed / 400) * settings.imf) / 1000) *
    settings.electricScale;
  return [FLOW_DIRECTION[2] * scale, 0, -FLOW_DIRECTION[0] * scale];
}

export function dipoleField(
  x: number,
  y: number,
  z: number,
  strength = -18,
): Vec3 {
  const r2 = Math.max(x * x + y * y + z * z, 1);
  const mx = -Math.sin(DIPOLE_TILT);
  const my = Math.cos(DIPOLE_TILT);
  const dot = mx * x + my * y;
  const scale = strength / (r2 * Math.sqrt(r2));
  return [
    scale * ((3 * dot * x) / r2 - mx),
    scale * ((3 * dot * y) / r2 - my),
    (scale * 3 * dot * z) / r2,
  ];
}

// No-slip sphere solution: u = U [(1 - 3a/4r - a³/4r³)eₓ
//                              + (-3a/4r + 3a³/4r³)nₓ n].
export function stokesVelocity(
  x: number,
  y: number,
  z: number,
  speed: number,
  radius = 1.8,
): Vec3 {
  const r = Math.sqrt(x * x + y * y + z * z);
  if (r <= radius) return [0, 0, 0];
  const ar = radius / r;
  const axial = 1 - 0.75 * ar - 0.25 * ar ** 3;
  const radial = -0.75 * ar + 0.75 * ar ** 3;
  return [
    speed * (axial + (radial * x * x) / (r * r)),
    (speed * radial * x * y) / (r * r),
    (speed * radial * x * z) / (r * r),
  ];
}

/** Boris rotation conserves |v| for a magnetic-only step. */
export function borisVelocity(
  v: Vec3,
  b: Vec3,
  a: Vec3,
  dt: number,
  chargeToMass = 1,
): Vec3 {
  const hx = (a[0] * dt) / 2,
    hy = (a[1] * dt) / 2,
    hz = (a[2] * dt) / 2;
  const vx = v[0] + hx,
    vy = v[1] + hy,
    vz = v[2] + hz;
  const tx = (b[0] * chargeToMass * dt) / 2,
    ty = (b[1] * chargeToMass * dt) / 2,
    tz = (b[2] * chargeToMass * dt) / 2;
  const factor = 2 / (1 + tx * tx + ty * ty + tz * tz);
  const px = vx + vy * tz - vz * ty;
  const py = vy + vz * tx - vx * tz;
  const pz = vz + vx * ty - vy * tx;
  return [
    vx + factor * (py * tz - pz * ty) + hx,
    vy + factor * (pz * tx - px * tz) + hy,
    vz + factor * (px * ty - py * tx) + hz,
  ];
}

/** Smooth coordinate deformation shared by the field and its visible curve.
 * This prescribed geometry is a scale-compressed magnetosphere, not an MHD
 * solution. The Piola transform below preserves magnetic flux (div B = 0).
 */
/** A dipole meridian in the plane containing the magnetic axis and Sun.
 * Keeping the unwarped curve in this plane makes its long lobe follow the
 * anti-solar stretch, instead of drawing two round lobes in the old XY plane.
 */
export function dipoleMeridianPoint(theta: number, shell = 3.2): Vec3 {
  const axis: Vec3 = [-Math.sin(DIPOLE_TILT), Math.cos(DIPOLE_TILT), 0];
  const axial = FLOW_DIRECTION.reduce((sum, v, i) => sum + v * axis[i], 0);
  const equator = FLOW_DIRECTION.map((v, i) => v - axial * axis[i]) as Vec3;
  const length = Math.hypot(...equator);
  const radius = shell * Math.sin(theta) ** 2;
  return axis.map(
    (v, i) =>
      radius * (Math.cos(theta) * v + (Math.sin(theta) * equator[i]) / length),
  ) as Vec3;
}

export function magnetospherePoint(x: number, y: number, z: number): Vec3 {
  const [axial, up, side] = worldToFlow(x, y, z);
  const warped =
    axial < -1
      ? -1 - Math.log1p(0.32 * (-axial - 1)) / 0.32
      : axial > 1
        ? axial + 1.2 * (axial - 1) ** 2
        : axial;
  return flowToWorld(warped, up, side);
}

export function magnetosphereField(x: number, y: number, z: number): Vec3 {
  const [axial, up, side] = worldToFlow(x, y, z);
  const originalX =
    axial < -1
      ? -1 - Math.expm1(0.32 * (-axial - 1)) / 0.32
      : axial > 1
        ? 1 + (Math.sqrt(1 + 4.8 * (axial - 1)) - 1) / 2.4
        : axial;
  const derivative =
    originalX < -1
      ? 1 / (1 + 0.32 * (-originalX - 1))
      : originalX > 1
        ? 1 + 2.4 * (originalX - 1)
        : 1;
  const original = flowToWorld(originalX, up, side);
  const b = worldToFlow(...dipoleField(...original));
  return flowToWorld(b[0], b[1] / derivative, b[2] / derivative);
}

/** Stokes sphere solution expressed in the same Sun-to-Earth flow frame. */
export function solarStokesVelocity(
  x: number,
  y: number,
  z: number,
  speed: number,
  radius: number,
): Vec3 {
  return flowToWorld(...stokesVelocity(...worldToFlow(x, y, z), speed, radius));
}

const EMISSION_DISTANCE = 6.8;

export class ParticleSimulation {
  readonly count: number;
  readonly positions: Float32Array;
  readonly velocities: Float32Array;
  readonly ages: Float32Array;
  readonly active: Float32Array;
  readonly charges: Int8Array;
  readonly guided: Uint8Array;
  readonly precipitation = [0, 0];
  private centers: Float64Array;
  private moments: Float64Array;
  private energies: Float64Array;
  private directions: Int8Array;
  private phases: Float64Array;
  private random: () => number;
  private emission = 0;
  private cursor = 0;
  settings: PhysicsSettings = { ...DEFAULT_PHYSICS };

  reset() {
    this.active.fill(0);
    this.guided.fill(0);
    this.ages.fill(0);
    this.precipitation.fill(0);
    this.emission = 0;
    this.cursor = 0;
  }

  constructor(count: number, random = Math.random) {
    this.count = count - (count % 2);
    this.random = random;
    this.positions = new Float32Array(this.count * 3);
    this.velocities = new Float32Array(this.count * 3);
    this.ages = new Float32Array(this.count);
    this.active = new Float32Array(this.count);
    this.charges = Int8Array.from({ length: this.count }, (_, i) =>
      i % 2 ? -1 : 1,
    );
    this.guided = new Uint8Array(this.count);
    this.centers = new Float64Array(this.count * 3);
    this.moments = new Float64Array(this.count);
    this.energies = new Float64Array(this.count);
    this.directions = new Int8Array(this.count);
    this.phases = new Float64Array(this.count);
  }

  private emitPair(position: Vec3, velocity: Vec3) {
    for (let j = 0; j < 2; j++) {
      const i = (this.cursor + j) % this.count,
        k = i * 3;
      this.positions.set(position, k);
      this.velocities.set(velocity, k);
      this.active[i] = 1;
      this.ages[i] = 0;
      this.guided[i] = 0;
      this.phases[i] = this.random() * Math.PI * 2;
    }
    this.cursor = (this.cursor + 2) % this.count;
  }

  /** Expanding flux-rope shell at the upstream edge; Sun–Earth transit omitted.
   * Adjacent tracers are paired so each eruption is exactly charge balanced.
   */
  launchEruption() {
    const speed = this.settings.windSpeed / 400;
    for (let pair = 0; pair < Math.floor(this.count * 0.42); pair++) {
      // A horseshoe-shaped flux rope: a leading arch and two trailing legs.
      // Twisted strands wrap its minor radius. This is an initial condition,
      // not a self-consistent coronal MHD eruption or a detached circular ring.
      const t = (this.random() - 0.5) * Math.PI;
      const strand = Math.floor(this.random() * 12);
      const phase = t * 5 + (strand / 12) * Math.PI * 2;
      const tube = 0.045 + this.random() * 0.08;
      const radius = 1.25 + tube * Math.cos(phase);
      this.emitPair(
        flowToWorld(
          -EMISSION_DISTANCE + 0.4 + radius * Math.cos(t),
          radius * Math.sin(t),
          tube * Math.sin(phase),
        ),
        flowToWorld(
          speed * (0.65 + 0.65 * Math.cos(t)),
          speed * 0.28 * Math.sin(t),
          speed * 0.04 * Math.sin(phase),
        ),
      );
    }
  }

  private enterCusp(i: number) {
    const k = i * 3;
    const p = this.positions.subarray(k, k + 3);
    const b = physicalField(p[0], p[1], p[2], this.settings);
    const magnitude = Math.hypot(...b);
    const speed = Math.max(
      1.1,
      Math.hypot(...this.velocities.subarray(k, k + 3)),
    );
    // A prescribed distribution of pitch angles provides both trapped and
    // loss-cone populations. Charge does not select the destination pole.
    const pitch = Math.max(
      0.001,
      ((this.settings.pitchAngle * Math.PI) / 180) *
        (0.25 + this.random() * 1.5),
    );
    this.moments[i] = (speed * speed * Math.sin(pitch) ** 2) / (2 * magnitude);
    this.energies[i] =
      (speed * speed) / 2 -
      (this.settings.gravity ? EARTH_GRAVITY * this.settings.earthMass : 0) /
        Math.hypot(...p);
    this.directions[i] = p[0] * b[0] + p[1] * b[1] + p[2] * b[2] > 0 ? -1 : 1;
    this.centers.set(p, k);
    this.guided[i] = 1;
  }

  private stepGuided(i: number, dt: number) {
    const k = i * 3;
    const p: Vec3 = [this.centers[k], this.centers[k + 1], this.centers[k + 2]];
    const b = physicalField(...p, this.settings),
      magnitude = Math.hypot(...b);
    const unit = b.map((v) => v / magnitude) as Vec3;
    const speed = Math.sqrt(
      Math.max(
        0.002,
        2 *
          (this.energies[i] +
            (this.settings.gravity
              ? EARTH_GRAVITY * this.settings.earthMass
              : 0) /
              Math.hypot(...p) -
            this.moments[i] * magnitude),
      ),
    );
    let next = p.map(
      (v, j) => v + unit[j] * speed * this.directions[i] * dt,
    ) as Vec3;
    let nextB = physicalField(...next, this.settings),
      nextMagnitude = Math.hypot(...nextB);
    // Conservation of energy and magnetic moment determines the mirror point.
    // A failed inward step reverses parallel motion without increasing energy.
    if (
      this.energies[i] +
        (this.settings.gravity ? EARTH_GRAVITY * this.settings.earthMass : 0) /
          Math.hypot(...next) <
      this.moments[i] * nextMagnitude
    ) {
      this.directions[i] *= -1;
      next = p.map(
        (v, j) => v + unit[j] * speed * this.directions[i] * dt,
      ) as Vec3;
      nextB = physicalField(...next, this.settings);
      nextMagnitude = Math.hypot(...nextB);
    }
    this.centers.set(next, k);
    if (Math.hypot(...next) < 1.035) {
      this.precipitation[next[1] > 0 ? 0 : 1] += 0.025;
      this.active[i] = 0;
      return;
    }
    // Resolved visual gyromotion around the guiding center. Electron mass and
    // both gyroradii are scaled for readability, rather than using SI ratios.
    const q = normalizedChargeMass(this.charges[i], this.settings);
    this.phases[i] -= q * nextMagnitude * dt;
    const radius = Math.min(
      0.1,
      Math.sqrt((2 * this.moments[i]) / nextMagnitude) /
        Math.max(Math.abs(q), 1e-10),
    );
    const n = nextB.map((v) => v / nextMagnitude) as Vec3;
    const length = Math.hypot(n[0], n[1]) || 1;
    const u: Vec3 = [-n[1] / length, n[0] / length, 0];
    const v: Vec3 = [-n[2] * u[1], n[2] * u[0], n[0] * u[1] - n[1] * u[0]];
    for (let j = 0; j < 3; j++) {
      const position =
        next[j] +
        radius *
          (u[j] * Math.cos(this.phases[i]) + v[j] * Math.sin(this.phases[i]));
      this.velocities[k + j] = (position - this.positions[k + j]) / dt;
      this.positions[k + j] = position;
    }
  }

  step(dt: number, intensity: number, pointer?: PointerInfluence) {
    for (let pole = 0; pole < 2; pole++)
      this.precipitation[pole] *= Math.exp(-dt * 1.2);
    this.emission += dt * Math.max(0, intensity) * this.count * 0.075;
    while (this.emission >= 1) {
      this.emitPair(
        flowToWorld(
          -EMISSION_DISTANCE + 0.6,
          (this.random() - 0.5) * 6,
          (this.random() - 0.5) * 3.5,
        ),
        flowToWorld(
          this.settings.windSpeed / 400,
          (this.random() - 0.5) * 0.12,
          (this.random() - 0.5) * 0.12,
        ),
      );
      this.emission--;
    }
    for (let i = 0; i < this.count; i++) {
      if (!this.active[i]) continue;
      const k = i * 3;
      const x = this.positions[k],
        y = this.positions[k + 1],
        z = this.positions[k + 2];
      const r2 = x * x + y * y + z * z;
      const axial = worldToFlow(x, y, z)[0];
      if (r2 < 1.015 || r2 > 420 || this.ages[i] > 24 || axial > 15) {
        this.active[i] = 0;
        continue;
      }
      this.ages[i] += dt;
      // Prescribed cusp entry represents access by reconnection. It is not
      // claimed to emerge from a static dipole or the Stokes approximation.
      const latitude =
        (-Math.sin(DIPOLE_TILT) * x + Math.cos(DIPOLE_TILT) * y) /
        Math.sqrt(r2);
      if (
        this.settings.polarCapture &&
        this.settings.magnetic &&
        this.settings.surfaceField > 0 &&
        this.settings.charge > 0 &&
        !this.guided[i] &&
        axial > -1.8 &&
        axial < 0.7 &&
        r2 < 7.8 &&
        Math.abs(latitude) > 0.57 &&
        i % 6 < 4
      )
        this.enterCusp(i);
      if (
        this.guided[i] &&
        (!this.settings.polarCapture ||
          !this.settings.magnetic ||
          this.settings.surfaceField === 0 ||
          this.settings.charge === 0)
      ) {
        this.guided[i] = 0;
      }
      if (this.guided[i]) {
        this.stepGuided(i, dt);
        continue;
      }
      const config = this.settings;
      const b = config.magnetic
        ? physicalField(x, y, z, config)
        : ([0, 0, 0] as Vec3);
      const electric = config.electric
        ? convectionElectricField(config)
        : [0, 0, 0];
      const q = normalizedChargeMass(this.charges[i], config);
      // Subcycle by local gyrofrequency; Boris remains bounded at the cap.
      // Display scaling keeps default gyrosteps resolved without SI microsteps.
      const substeps = Math.min(
        64,
        Math.max(1, Math.ceil((Math.abs(q) * Math.hypot(...b) * dt) / 0.3)),
      );
      const h = dt / substeps;
      for (let n = 0; n < substeps; n++) {
        const px = this.positions[k],
          py = this.positions[k + 1],
          pz = this.positions[k + 2];
        const radius = Math.hypot(px, py, pz);
        if (radius < 1.035) {
          this.active[i] = 0;
          const latitude =
            (-Math.sin(DIPOLE_TILT) * px + Math.cos(DIPOLE_TILT) * py) / radius;
          if (Math.abs(latitude) > 0.7)
            this.precipitation[latitude > 0 ? 0 : 1] += 0.025;
          break;
        }
        const g = config.gravity
          ? (-EARTH_GRAVITY * config.earthMass) / radius ** 3
          : 0;
        const localB = config.magnetic ? physicalField(px, py, pz, config) : b;
        const u = config.drag
          ? solarStokesVelocity(
              px,
              py,
              pz,
              config.windSpeed / 400,
              config.obstacleRadius,
            )
          : [0, 0, 0];
        const damping = config.drag ? Math.exp((-config.dragRate * h) / 2) : 1;
        const interaction = pointer
          ? pointerAcceleration(px, py, pz, pointer)
          : [0, 0, 0];
        const v = [0, 1, 2].map(
          (j) => u[j] + (this.velocities[k + j] - u[j]) * damping,
        ) as Vec3;
        const next = borisVelocity(
          v,
          localB,
          [
            px * g + q * electric[0] + interaction[0],
            py * g + q * electric[1] + interaction[1],
            pz * g + q * electric[2] + interaction[2],
          ],
          h,
          q,
        );
        for (let j = 0; j < 3; j++) {
          this.velocities[k + j] = u[j] + (next[j] - u[j]) * damping;
          this.positions[k + j] += this.velocities[k + j] * h;
        }
      }
    }
  }
}
