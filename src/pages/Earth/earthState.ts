import { DEFAULT_PHYSICS, type PhysicsSettings } from "./physicsSettings";

export type EarthTab = "scene" | "physics";
export type CameraPosition = [number, number, number];
export const DEFAULT_SECTIONS = {
  solarActivity: true,
  appearance: true,
  interaction: false,
  forces: true,
  solarWind: true,
  species: false,
  optionalModels: false,
  displayScale: false,
};
export type EarthSection = keyof typeof DEFAULT_SECTIONS;
export type SectionState = Record<EarthSection, boolean>;

export interface EarthState {
  pauseOverride: boolean | null;
  field: boolean;
  intensity: number;
  mouseStrength: number;
  physics: PhysicsSettings;
  chargeColors: boolean;
  sunSize: number;
  timeScale: number;
  panelOpen: boolean;
  mobilePanelOpen: boolean;
  activeTab: EarthTab;
  details: boolean;
  camera: CameraPosition;
  sections: SectionState;
}

export const EARTH_STORAGE_KEY = "earth-state-v1";
export const DEFAULT_CAMERA: CameraPosition = [0, 0.65, 11.5];

export function defaultEarthState(): EarthState {
  return {
    pauseOverride: null,
    field: true,
    intensity: 0,
    mouseStrength: 0,
    physics: { ...DEFAULT_PHYSICS },
    chargeColors: true,
    sunSize: 0.53,
    timeScale: 1,
    panelOpen: true,
    mobilePanelOpen: false,
    activeTab: "scene",
    details: false,
    camera: [...DEFAULT_CAMERA],
    sections: { ...DEFAULT_SECTIONS },
  };
}

const physicsRanges: Record<keyof PhysicsSettings, readonly [number, number] | null> = {
  magnetic: null,
  electric: null,
  gravity: null,
  drag: null,
  polarCapture: null,
  surfaceField: [0, 65],
  imf: [-30, 30],
  electricScale: [0, 3],
  earthMass: [0.1, 10],
  charge: [0, 3],
  ionMass: [1, 16],
  massRatio: [1, 1836.1527],
  windSpeed: [200, 1500],
  dragRate: [0, 2],
  obstacleRadius: [1, 4],
  pitchAngle: [1, 55],
  gyroScale: [0.000001, 0.0001],
};

function record(value: unknown): Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? value as Record<string, unknown>
    : {};
}

function number(value: unknown, fallback: number, min: number, max: number) {
  return typeof value === "number" && Number.isFinite(value) && value >= min && value <= max
    ? value : fallback;
}

function boolean(value: unknown, fallback: boolean) {
  return typeof value === "boolean" ? value : fallback;
}

/** Recover valid preferences independently; stale or corrupt fields use defaults. */
export function parseEarthState(serialized: string | null): EarthState {
  const defaults = defaultEarthState();
  try {
    const envelope = record(JSON.parse(serialized ?? "null"));
    if (envelope.version !== 1) return defaults;
    const saved = record(envelope.state);
    const physics = record(saved.physics);
    const sections = record(saved.sections);
    const restoredPhysics = Object.fromEntries(
      Object.entries(DEFAULT_PHYSICS).map(([key, fallback]) => {
        const range = physicsRanges[key as keyof PhysicsSettings];
        return [key, range
          ? number(physics[key], fallback as number, ...range)
          : boolean(physics[key], fallback as boolean)];
      }),
    ) as unknown as PhysicsSettings;
    const camera = saved.camera;
    const cameraValid = Array.isArray(camera) && camera.length === 3 &&
      camera.every((v) => typeof v === "number" && Number.isFinite(v)) &&
      Math.abs(Math.hypot(...camera) - Math.hypot(...DEFAULT_CAMERA)) < 0.01;
    return {
      pauseOverride: typeof saved.pauseOverride === "boolean" ? saved.pauseOverride : null,
      field: boolean(saved.field, defaults.field),
      intensity: number(saved.intensity, defaults.intensity, 0, 1),
      mouseStrength: number(saved.mouseStrength, defaults.mouseStrength, 0, 100),
      physics: restoredPhysics,
      chargeColors: boolean(saved.chargeColors, defaults.chargeColors),
      sunSize: number(saved.sunSize, defaults.sunSize, 0.1, 3),
      timeScale: number(saved.timeScale, defaults.timeScale, 0.25, 2),
      panelOpen: boolean(saved.panelOpen, defaults.panelOpen),
      mobilePanelOpen: boolean(saved.mobilePanelOpen, defaults.mobilePanelOpen),
      activeTab: saved.activeTab === "physics" ? "physics" : "scene",
      details: boolean(saved.details, defaults.details),
      camera: cameraValid ? [...camera] as CameraPosition : defaults.camera,
      sections: Object.fromEntries(
        Object.entries(DEFAULT_SECTIONS).map(([key, fallback]) =>
          [key, boolean(sections[key], fallback)]),
      ) as SectionState,
    };
  } catch {
    return defaults;
  }
}
