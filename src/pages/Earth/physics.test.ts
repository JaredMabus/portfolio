import { describe, expect, it } from "vitest";
import {
  borisVelocity,
  dipoleField,
  magnetospherePoint,
  magnetosphereField,
  DIPOLE_TILT,
  ParticleSimulation,
  STEP,
  stokesVelocity,
  pointerAcceleration,
  type Vec3,
} from "./physics";

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
