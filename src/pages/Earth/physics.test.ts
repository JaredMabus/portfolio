import { describe, expect, it } from "vitest";
import {
  borisVelocity,
  normalizedChargeMass,
  convectionElectricField,
  EARTH_GRAVITY,
  dipoleField,
  dipoleMeridianPoint,
  magnetospherePoint,
  magnetosphereField,
  DIPOLE_TILT,
  ParticleSimulation,
  STEP,
  SUN_POSITION,
  FLOW_DIRECTION,
  worldToFlow,
  flowToWorld,
  stokesVelocity,
  pointerAcceleration,
  type Vec3,
} from "./physics";

import { DEFAULT_PHYSICS } from "./physicsSettings";

describe("Earth test-particle dynamics", () => {
  it("keeps cursor forces finite, local, and inactive when released", () => {
    const pointer = {
      position: [0, 0, 0] as Vec3,
      normal: [0, 0, 1] as Vec3,
      strength: 1,
    };
    expect(pointerAcceleration(0, 0, 0, pointer).every(Number.isFinite)).toBe(
      true,
    );
    const nearby = pointerAcceleration(0.5, 0, 0, pointer);
    expect(nearby[0]).toBeGreaterThan(0);
    expect(nearby[1]).toBeGreaterThan(0);
    expect(Math.hypot(...pointerAcceleration(5, 0, 0, pointer))).toBeLessThan(
      0.0001,
    );
    expect(
      Math.hypot(
        ...pointerAcceleration(0.5, 0, 0, { ...pointer, strength: 0 }),
      ),
    ).toBe(0);
  });

  it("changes integrated trajectories under a cursor force", () => {
    const baseline = new ParticleSimulation(2, () => 0.5);
    const interactive = new ParticleSimulation(2, () => 0.5);
    baseline.active[0] = interactive.active[0] = 1;
    baseline.positions.set([-4, 0.4, 0]);
    interactive.positions.set(baseline.positions);
    baseline.step(STEP, 0.45);
    interactive.step(STEP, 0.45, {
      position: [-4, 0, 0],
      normal: [0, 0, 1],
      strength: 1,
    });
    expect(interactive.velocities[1]).toBeGreaterThan(baseline.velocities[1]);
    expect(interactive.positions[1]).toBeGreaterThan(baseline.positions[1]);
  });

  it("conserves kinetic energy over many magnetic-only rotations", () => {
    let velocity: Vec3 = [2, -0.5, 0.3];
    const initialEnergy = velocity.reduce((sum, value) => sum + value ** 2, 0);
    for (let i = 0; i < 10000; i++)
      velocity = borisVelocity(velocity, [0.3, 5, -0.2], [0, 0, 0], STEP);
    expect(velocity.reduce((sum, value) => sum + value ** 2, 0)).toBeCloseTo(
      initialEnergy,
      10,
    );
  });

  it("applies an external acceleration when there is no magnetic field", () => {
    expect(borisVelocity([1, 0, 0], [0, 0, 0], [-2, 0, 0], 0.1)).toEqual([
      0.8, 0, 0,
    ]);
  });

  it("has no slip on the Stokes sphere and recovers the far-field flow", () => {
    expect(stokesVelocity(1.8, 0, 0, 2)).toEqual([0, 0, 0]);
    const far = stokesVelocity(1000000, 0, 0, 2);
    expect(far[0]).toBeCloseTo(2, 4);
    expect(far[1]).toBeCloseTo(0, 10);
    expect(far[2]).toBeCloseTo(0, 10);
  });

  it("aligns the displayed dipole curves with the force field", () => {
    const theta = 1.1,
      shell = 3;
    const radius = shell * Math.sin(theta) ** 2;
    const x = radius * Math.sin(theta),
      y = radius * Math.cos(theta);
    const dx = shell * 3 * Math.sin(theta) ** 2 * Math.cos(theta);
    const dy =
      shell *
      (2 * Math.sin(theta) * Math.cos(theta) ** 2 - Math.sin(theta) ** 3);
    const c = Math.cos(DIPOLE_TILT),
      s = Math.sin(DIPOLE_TILT);
    const field = dipoleField(c * x - s * y, s * x + c * y, 0);
    const tangent = [c * dx - s * dy, s * dx + c * dy];
    expect(field[0] * tangent[1] - field[1] * tangent[0]).toBeCloseTo(0, 10);
  });

  it("remains finite through a sustained high-intensity flare", () => {
    let seed = 123;
    const simulation = new ParticleSimulation(100, () => {
      seed = (seed * 16807) % 2147483647;
      return seed / 2147483647;
    });
    simulation.launchEruption();
    for (let i = 0; i < 3000; i++) simulation.step(STEP, 1);
    expect(Array.from(simulation.positions).every(Number.isFinite)).toBe(true);
    expect(Array.from(simulation.velocities).every(Number.isFinite)).toBe(true);
    expect(Math.max(...simulation.positions.map(Math.abs))).toBeLessThan(21);
  });
  it("starts empty and launches equal numbers of both charge signs", () => {
    const simulation = new ParticleSimulation(200);
    for (let i = 0; i < 120; i++) simulation.step(STEP, 0);
    expect(simulation.active.reduce((a, b) => a + b, 0)).toBe(0);
    simulation.launchEruption();
    expect(simulation.active.reduce((a, b) => a + b, 0)).toBeGreaterThan(100);
    expect(
      simulation.charges.reduce(
        (sum, q, i) => sum + q * simulation.active[i],
        0,
      ),
    ).toBe(0);
    for (let i = 0; i < 3200; i++) simulation.step(STEP, 0);
    expect(simulation.active.reduce((a, b) => a + b, 0)).toBe(0);
  });

  it("rotates opposite charges in opposite directions without adding energy", () => {
    const positive = borisVelocity([1, 0, 0], [0, 2, 0], [0, 0, 0], STEP, 1);
    const negative = borisVelocity([1, 0, 0], [0, 2, 0], [0, 0, 0], STEP, -1);
    expect(positive[2]).toBeCloseTo(-negative[2], 10);
    expect(Math.hypot(...positive)).toBeCloseTo(1, 10);
    expect(Math.hypot(...negative)).toBeCloseTo(1, 10);
  });

  it("keeps the warped field divergence-free and tangent to the mapped dipole", () => {
    for (const originalX of [-3, 3]) {
      const point = magnetospherePoint(originalX, 1.4, 0.3);
      const originalB = dipoleField(originalX, 1.4, 0.3);
      const epsilon = 0.00001;
      const adjacent = magnetospherePoint(
        originalX + originalB[0] * epsilon,
        1.4 + originalB[1] * epsilon,
        0.3 + originalB[2] * epsilon,
      );
      const tangent = adjacent.map((v, j) => (v - point[j]) / epsilon);
      const b = magnetosphereField(...point);
      expect(b[0] * tangent[1] - b[1] * tangent[0]).toBeCloseTo(0, 4);
      let divergence = 0;
      for (let axis = 0; axis < 3; axis++) {
        const plus = [...point] as Vec3,
          minus = [...point] as Vec3;
        plus[axis] += epsilon;
        minus[axis] -= epsilon;
        divergence +=
          (magnetosphereField(...plus)[axis] -
            magnetosphereField(...minus)[axis]) /
          (2 * epsilon);
      }
      expect(divergence).toBeCloseTo(0, 5);
    }
  });

  it("mirrors large pitch angles and precipitates loss-cone particles", () => {
    for (const pitch of [0, 0.99]) {
      const simulation = new ParticleSimulation(2, () => pitch);
      simulation.settings = { ...DEFAULT_PHYSICS, polarCapture: true };
      simulation.positions.set([0.3, 1.9, 0]);
      simulation.velocities.set([0, -1.5, 0]);
      simulation.active[0] = 1;
      let minimumRadius = 1.93,
        precipitation = 0,
        mirrored = false;
      for (let i = 0; i < 1000; i++) {
        simulation.step(STEP, 0);
        const radius = Math.hypot(...simulation.positions.slice(0, 3));
        if (radius > minimumRadius + 0.1 && minimumRadius < 1.9)
          mirrored = true;
        minimumRadius = Math.min(minimumRadius, radius);
        precipitation = Math.max(precipitation, simulation.precipitation[0]);
      }
      if (pitch === 0) {
        expect(precipitation).toBeGreaterThan(0);
        expect(simulation.active[0]).toBe(0);
      } else {
        expect(minimumRadius).toBeGreaterThan(1.1);
        expect(mirrored).toBe(true);
        expect(precipitation).toBe(0);
      }
    }
  });
});

describe("Adjustable physical forces", () => {
  function freeParticle() {
    const sim = new ParticleSimulation(2);
    sim.settings = {
      ...DEFAULT_PHYSICS,
      magnetic: false,
      electric: false,
      gravity: false,
      drag: false,
    };
    sim.positions.set([-4, 0.5, 0, -4, 0.5, 0]);
    sim.velocities.set([1, 0, 0, 1, 0, 0]);
    sim.active.fill(1);
    return sim;
  }
  it("uses the physical species mass ratio and consistent SI normalization", () => {
    const positive = normalizedChargeMass(1, DEFAULT_PHYSICS);
    const negative = normalizedChargeMass(-1, DEFAULT_PHYSICS);
    expect(-negative / positive).toBeCloseTo(1836.1527, 8);
    expect(positive).toBeCloseTo(0.030513573, 5);
    const electric = convectionElectricField(DEFAULT_PHYSICS);
    expect(electric[0]).toBeCloseTo(-FLOW_DIRECTION[2] * 0.005, 10);
    expect(electric[1]).toBe(0);
    expect(electric[2]).toBeCloseTo(FLOW_DIRECTION[0] * 0.005, 10);
    expect(
      electric.reduce((dot, v, i) => dot + v * FLOW_DIRECTION[i], 0),
    ).toBeCloseTo(0, 10);
    expect(normalizedChargeMass(1, { ...DEFAULT_PHYSICS, charge: 0 })).toBe(0);
    expect(
      normalizedChargeMass(1, { ...DEFAULT_PHYSICS, ionMass: 2 }),
    ).toBeCloseTo(positive / 2);
  });
  it("moves ballistically with every equation disabled", () => {
    const sim = freeParticle();
    sim.step(0.1, 0);
    expect(sim.positions[0]).toBeCloseTo(-3.9, 5);
    expect(Array.from(sim.velocities)).toEqual([1, 0, 0, 1, 0, 0]);
  });
  it("applies equal gravitational acceleration to both masses", () => {
    const sim = freeParticle();
    sim.settings.gravity = true;
    sim.settings.earthMass = 3;
    sim.step(0.1, 0);
    expect(sim.velocities[0]).toBeCloseTo(
      1 + ((4 * EARTH_GRAVITY * 3) / 16.25 ** 1.5) * 0.1,
      6,
    );
    expect(sim.velocities[0]).toBe(sim.velocities[3]);
    expect(sim.velocities[1]).toBeLessThan(0);
  });
  it("accelerates opposite charges oppositely under an imposed electric field", () => {
    const sim = freeParticle();
    sim.settings.electric = true;
    sim.velocities.fill(0);
    sim.settings.massRatio = 1;
    sim.step(0.1, 0);
    expect(sim.velocities[2]).toBeGreaterThan(0);
    expect(sim.velocities[2]).toBeCloseTo(-sim.velocities[5], 8);
    const speed = Math.hypot(...sim.velocities.slice(0, 3));
    expect(speed).toBeGreaterThan(0);
  });
  it("turns magnetic trajectories without doing work", () => {
    const sim = freeParticle();
    sim.settings.magnetic = true;
    sim.step(0.1, 0);
    expect(sim.velocities[2]).not.toBe(0);
    expect(sim.velocities[5]).not.toBe(0);
    expect(Math.hypot(...sim.velocities.slice(0, 3))).toBeCloseTo(1, 5);
    expect(Math.hypot(...sim.velocities.slice(3, 6))).toBeCloseTo(1, 5);
  });
  it("enables drag only when requested and resets the particle population", () => {
    const sim = freeParticle();
    sim.settings.drag = true;
    sim.step(0.1, 0);
    expect(sim.velocities[0]).toBeLessThan(1);
    sim.reset();
    expect(Array.from(sim.active)).toEqual([0, 0]);
    expect(sim.precipitation).toEqual([0, 0]);
    sim.step(STEP, 0);
    expect(sim.active[0]).toBe(0);
  });
  it("launches an arch with trailing legs and a faster leading front", () => {
    let seed = 17;
    const sim = new ParticleSimulation(500, () => {
      seed = (seed * 16807) % 2147483647;
      return seed / 2147483647;
    });
    sim.launchEruption();
    const fronts: number[] = [],
      legs: number[] = [];
    for (let i = 0; i < sim.count; i++) {
      if (!sim.active[i]) continue;
      const [x, y] = worldToFlow(
        ...(Array.from(sim.positions.slice(i * 3, i * 3 + 3)) as Vec3),
      );
      const velocity = worldToFlow(
        ...(Array.from(sim.velocities.slice(i * 3, i * 3 + 3)) as Vec3),
      );
      expect(x).toBeGreaterThan(-6.41);
      if (Math.abs(y) < 0.2) fronts.push(velocity[0]);
      if (Math.abs(y) > 1.2) legs.push(velocity[0]);
    }
    expect(fronts.length).toBeGreaterThan(10);
    expect(legs.length).toBeGreaterThan(10);
    expect(Math.min(...fronts)).toBeGreaterThan(Math.max(...legs));
  });
});

describe("Shared Sun geometry", () => {
  it("launches the eruption from the visible Sun direction toward Earth", () => {
    // Deterministic center-of-arch particles have no transverse offset.
    const sim = new ParticleSimulation(10, () => 0.5);
    sim.launchEruption();
    const sunLength = Math.hypot(...SUN_POSITION);
    const p = Array.from(sim.positions.slice(0, 3));
    const v = Array.from(sim.velocities.slice(0, 3));
    for (let axis = 0; axis < 3; axis++) {
      expect(p[axis] / Math.hypot(...p)).toBeCloseTo(
        SUN_POSITION[axis] / sunLength,
        6,
      );
      expect(v[axis] / Math.hypot(...v)).toBeCloseTo(
        -SUN_POSITION[axis] / sunLength,
        6,
      );
    }
  });
  it("compresses the Sun-facing field and stretches the opposite tail", () => {
    for (const distance of [-3, 3]) {
      const point = flowToWorld(distance, 0, 0);
      const warped = worldToFlow(...magnetospherePoint(...point));
      expect(warped[1]).toBeCloseTo(0, 10);
      expect(warped[2]).toBeCloseTo(0, 10);
      if (distance < 0) expect(Math.abs(warped[0])).toBeLessThan(3);
      else expect(warped[0]).toBeGreaterThan(3);
    }
  });
});

describe("Sun-facing dipole meridian", () => {
  it("has a compressed dayside and a long tail along the solar axis", () => {
    const tail = magnetospherePoint(...dipoleMeridianPoint(Math.PI / 2));
    const dayside = magnetospherePoint(...dipoleMeridianPoint(Math.PI * 1.5));
    const tailAxial = worldToFlow(...tail)[0];
    const dayAxial = worldToFlow(...dayside)[0];
    expect(dayAxial).toBeLessThan(-2);
    expect(dayAxial).toBeGreaterThan(-3.2);
    expect(tailAxial).toBeGreaterThan(8);
    expect(tailAxial / Math.abs(dayAxial)).toBeGreaterThan(3);
  });
  it("keeps the visible meridian tangent to the actual magnetic field in 3D", () => {
    for (const theta of [0.9, 1.3, 1.9, 4, 4.6, 5.1]) {
      const epsilon = 1e-6;
      const p = magnetospherePoint(...dipoleMeridianPoint(theta));
      const next = magnetospherePoint(...dipoleMeridianPoint(theta + epsilon));
      const tangent = next.map((v, i) => (v - p[i]) / epsilon);
      const b = magnetosphereField(...p);
      const cross = [
        tangent[1] * b[2] - tangent[2] * b[1],
        tangent[2] * b[0] - tangent[0] * b[2],
        tangent[0] * b[1] - tangent[1] * b[0],
      ];
      expect(
        Math.hypot(...cross) / Math.hypot(...tangent) / Math.hypot(...b),
      ).toBeLessThan(1e-5);
    }
  });
});
