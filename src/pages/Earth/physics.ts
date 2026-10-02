/**
 * A reduced test-particle model, NOT an MHD or space-weather prediction solver.
 * Length unit: Earth radius. Visual time, gyrofrequency, and wind are scaled.
 * Magnetic rotation: Boris pusher. Gravity: inverse-square central acceleration.
 * A prescribed stretched field and guiding-center cusp population illustrate
 * gyromotion, magnetic mirroring, and atmospheric precipitation.
 * Ambient velocity: analytic creeping Stokes flow past a sphere; relaxation is
 * an illustrative drag closure for plasma, not a collisional solar-wind model.
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
export function magnetospherePoint(x: number, y: number, z: number): Vec3 {
  return [
    x < -1
      ? -1 - Math.log1p(0.32 * (-x - 1)) / 0.32
      : x > 1
        ? x + 1.2 * (x - 1) ** 2
        : x,
    y,
    z,
  ];
}

export function magnetosphereField(x: number, y: number, z: number): Vec3 {
  const originalX =
    x < -1
      ? -1 - Math.expm1(0.32 * (-x - 1)) / 0.32
      : x > 1
        ? 1 + (Math.sqrt(1 + 4.8 * (x - 1)) - 1) / 2.4
        : x;
  const derivative =
    originalX < -1
      ? 1 / (1 + 0.32 * (-originalX - 1))
      : originalX > 1
        ? 1 + 2.4 * (originalX - 1)
        : 1;
  const b = dipoleField(originalX, y, z);
  return [b[0], b[1] / derivative, b[2] / derivative];
}

export const SUN_POSITION: Vec3 = [-6.8, 0.3, 0];

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

  /** Expanding flux-rope shell, initially anchored beside the white Sun.
   * Adjacent tracers are paired so each eruption is exactly charge balanced.
   */
  launchEruption() {
    for (let pair = 0; pair < Math.floor(this.count * 0.42); pair++) {
      const angle = this.random() * Math.PI * 2;
      const filament = Math.floor(this.random() * 9);
      const tubeAngle = this.random() * Math.PI * 2;
      const radius = 0.4 + filament * 0.022 + 0.075 * Math.cos(tubeAngle);
      const spread = 0.42 + this.random() * 0.13;
      this.emitPair(
        [
          SUN_POSITION[0] + 0.75 + radius * Math.cos(angle),
          radius * Math.sin(angle),
          0.22 * Math.sin(tubeAngle),
        ],
        [
          1.7 + spread * Math.cos(angle),
          spread * Math.sin(angle),
          0.13 * Math.sin(tubeAngle),
        ],
      );
    }
  }

  private enterCusp(i: number) {
    const k = i * 3;
    const p = this.positions.subarray(k, k + 3);
    const b = magnetosphereField(p[0], p[1], p[2]);
    const magnitude = Math.hypot(...b);
    const speed = Math.max(
      1.1,
      Math.hypot(...this.velocities.subarray(k, k + 3)),
    );
    // A prescribed distribution of pitch angles provides both trapped and
    // loss-cone populations. Charge does not select the destination pole.
    const pitch = 0.045 + this.random() * 0.65;
    this.moments[i] = (speed * speed * Math.sin(pitch) ** 2) / (2 * magnitude);
    this.energies[i] = (speed * speed) / 2 - EARTH_GRAVITY / Math.hypot(...p);
    this.directions[i] = p[0] * b[0] + p[1] * b[1] + p[2] * b[2] > 0 ? -1 : 1;
    this.centers.set(p, k);
    this.guided[i] = 1;
  }

  private stepGuided(i: number, dt: number) {
    const k = i * 3;
    const p: Vec3 = [this.centers[k], this.centers[k + 1], this.centers[k + 2]];
    const b = magnetosphereField(...p),
      magnitude = Math.hypot(...b);
    const unit = b.map((v) => v / magnitude) as Vec3;
    const speed = Math.sqrt(
      Math.max(
        0.002,
        2 *
          (this.energies[i] +
            EARTH_GRAVITY / Math.hypot(...p) -
            this.moments[i] * magnitude),
      ),
    );
    let next = p.map(
      (v, j) => v + unit[j] * speed * this.directions[i] * dt,
    ) as Vec3;
    let nextB = magnetosphereField(...next),
      nextMagnitude = Math.hypot(...nextB);
    // Conservation of energy and magnetic moment determines the mirror point.
    // A failed inward step reverses parallel motion without increasing energy.
    if (
      this.energies[i] + EARTH_GRAVITY / Math.hypot(...next) <
      this.moments[i] * nextMagnitude
    ) {
      this.directions[i] *= -1;
      next = p.map(
        (v, j) => v + unit[j] * speed * this.directions[i] * dt,
      ) as Vec3;
      nextB = magnetosphereField(...next);
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
    const q = this.charges[i] * (this.charges[i] < 0 ? 2.2 : 1);
    this.phases[i] -= q * nextMagnitude * dt * 3;
    const radius = Math.min(
      0.1,
      (0.28 * Math.sqrt((2 * this.moments[i]) / nextMagnitude)) / Math.abs(q),
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
        [
          SUN_POSITION[0] + 0.6,
          (this.random() - 0.5) * 6,
          (this.random() - 0.5) * 3.5,
        ],
        [
          1.4 + intensity * 1.2,
          (this.random() - 0.5) * 0.12,
          (this.random() - 0.5) * 0.12,
        ],
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
      if (r2 < 1.015 || r2 > 420 || this.ages[i] > 24 || x > 15) {
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
        !this.guided[i] &&
        x > -1.8 &&
        x < 0.7 &&
        r2 < 7.8 &&
        Math.abs(latitude) > 0.57 &&
        i % 6 < 4
      )
        this.enterCusp(i);
      if (this.guided[i]) {
        this.stepGuided(i, dt);
        continue;
      }
      const gravity = -EARTH_GRAVITY / (r2 * Math.sqrt(r2));
      const b = magnetosphereField(x, y, z);
      const speed = Math.max(1.5 + intensity, this.velocities[k]);
      const u = stokesVelocity(x, y, z, speed, 2.15);
      const interaction = pointer
        ? pointerAcceleration(x, y, z, pointer)
        : [0, 0, 0];
      const damping = Math.exp((-0.38 * dt) / 2);
      const v = [0, 1, 2].map(
        (j) => u[j] + (this.velocities[k + j] - u[j]) * damping,
      ) as Vec3;
      const next = borisVelocity(
        v,
        b,
        [
          x * gravity + interaction[0],
          y * gravity + interaction[1],
          z * gravity + interaction[2],
        ],
        dt,
        this.charges[i] * (this.charges[i] < 0 ? 2.2 : 1),
      );
      for (let j = 0; j < 3; j++) {
        this.velocities[k + j] = u[j] + (next[j] - u[j]) * damping;
        this.positions[k + j] += this.velocities[k + j] * dt;
      }
    }
  }
}
