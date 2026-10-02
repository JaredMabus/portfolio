/**
 * A reduced test-particle model, NOT an MHD or space-weather prediction solver.
 * Length unit: Earth radius. Visual time, gyrofrequency, and wind are scaled.
 * Magnetic rotation: Boris pusher. Gravity: inverse-square central acceleration.
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
// An ideal dipole tilted approximately 11 degrees relative to the spin axis.
export const DIPOLE_TILT = EARTH_AXIAL_TILT + (11 * Math.PI) / 180;
export const EARTH_GRAVITY = 3.986004418e14 / (6.371e6 * 400_000 ** 2);
export const STEP = 1 / 120;

export function dipoleField(
  x: number,
  y: number,
  z: number,
  strength = 18,
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

export class ParticleSimulation {
  readonly count: number;
  readonly positions: Float32Array;
  readonly velocities: Float32Array;
  readonly ages: Float32Array;
  private random: () => number;

  constructor(count: number, random = Math.random) {
    this.count = count;
    this.random = random;
    this.positions = new Float32Array(count * 3);
    this.velocities = new Float32Array(count * 3);
    this.ages = new Float32Array(count);
    for (let i = 0; i < count; i++) this.reset(i, true);
  }

  private reset(i: number, fill = false) {
    const k = i * 3;
    this.positions[k] = fill
      ? -11 + this.random() * 21
      : -11 - this.random() * 2;
    this.positions[k + 1] = (this.random() + this.random() - 1) * 3.8;
    this.positions[k + 2] = (this.random() - 0.5) * 4;
    this.velocities[k] = 1.8 + this.random() * 0.5;
    this.velocities[k + 1] = (this.random() - 0.5) * 0.16;
    this.velocities[k + 2] = (this.random() - 0.5) * 0.16;
    this.ages[i] = this.random() * 12;
  }

  step(
    dt: number,
    intensity: number,
    flare: number,
    flareCenter = -7,
    pointer?: PointerInfluence,
  ) {
    for (let i = 0; i < this.count; i++) {
      const k = i * 3;
      const x = this.positions[k],
        y = this.positions[k + 1],
        z = this.positions[k + 2];
      // A finite traveling pulse, rather than changing the entire domain at
      // once: the flare's enhanced wind reaches Earth from the sunward edge.
      const localFlare = flare * Math.exp(-(((x - flareCenter) / 1.8) ** 2));
      const speed = 1.5 + intensity * 1.7 + localFlare * 3;
      const r2 = x * x + y * y + z * z;
      if (r2 < 1.04 || r2 > 230 || this.ages[i] > 28 || x > 12) {
        this.reset(i);
        continue;
      }
      const gravity = -EARTH_GRAVITY / (r2 * Math.sqrt(r2));
      const b = dipoleField(x, y, z);
      const u = stokesVelocity(x, y, z, speed);
      const interaction = pointer
        ? pointerAcceleration(x, y, z, pointer)
        : [0, 0, 0];
      // Exact exponential half-step drag splitting avoids explicit-Euler drag
      // instability. The Boris step rotates velocity around the SAME dipole
      // used by the displayed analytic field lines.
      const damping = Math.exp((-0.65 * dt) / 2);
      const v: Vec3 = [0, 0, 0];
      for (let j = 0; j < 3; j++)
        v[j] = u[j] + (this.velocities[k + j] - u[j]) * damping;
      const next = borisVelocity(
        v,
        b,
        [
          x * gravity + interaction[0],
          y * gravity + interaction[1],
          z * gravity + interaction[2],
        ],
        dt,
        i % 5 === 0 ? -0.7 : 1,
      );
      for (let j = 0; j < 3; j++) {
        this.velocities[k + j] = u[j] + (next[j] - u[j]) * damping;
        this.positions[k + j] += this.velocities[k + j] * dt;
      }
      this.ages[i] += dt;
    }
  }
}
