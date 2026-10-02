import { describe, expect, it } from "vitest";
import {
  borisVelocity,
  dipoleField,
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
    const baseline = new ParticleSimulation(1, () => 0.5);
    const interactive = new ParticleSimulation(1, () => 0.5);
    baseline.positions.set([-4, 0.4, 0]);
    interactive.positions.set(baseline.positions);
    baseline.step(STEP, 0.45, 0);
    interactive.step(STEP, 0.45, 0, -7, {
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
    for (let i = 0; i < 3000; i++) simulation.step(STEP, 1, 1);
    expect(Array.from(simulation.positions).every(Number.isFinite)).toBe(true);
    expect(Array.from(simulation.velocities).every(Number.isFinite)).toBe(true);
    expect(Math.max(...simulation.positions.map(Math.abs))).toBeLessThan(16);
  });
});
