/** SI inputs; the renderer uses R_E and 400 km/s as its length/velocity units. */
export interface PhysicsSettings {
  magnetic: boolean;
  electric: boolean;
  gravity: boolean;
  drag: boolean;
  polarCapture: boolean;
  surfaceField: number;
  imf: number;
  electricScale: number;
  earthMass: number;
  charge: number;
  ionMass: number;
  massRatio: number;
  windSpeed: number;
  dragRate: number;
  obstacleRadius: number;
  pitchAngle: number;
  gyroScale: number;
}

export const DEFAULT_PHYSICS: PhysicsSettings = {
  magnetic: true,
  electric: true,
  gravity: true,
  drag: false,
  polarCapture: false,
  surfaceField: 31.2, // equatorial surface field, microtesla
  imf: -5, // uniform north/south interplanetary B, nanotesla
  electricScale: 1,
  earthMass: 1,
  charge: 1, // elementary charges
  ionMass: 1, // proton masses
  massRatio: 1836.1527, // proton/electron mass ratio
  windSpeed: 400, // km/s
  dragRate: 0.38, // inverse display time; optional illustrative closure
  obstacleRadius: 2.15,
  pitchAngle: 20, // optional prescribed cusp population
  gyroScale: 0.00002, // explicit common electromagnetic scale, NOT an SI constant
};
