import type {
  Neutral,
  NeutralVariant,
  SurfaceTint,
  ThemeColorSeed,
  ThemeMode,
} from "./theme.types";

// Neutral used for surfaces/backgrounds/text
export const neutral = {
  n0: "#000000",
  n5: "#0F0F11",
  n10: "#181818",
  n15: "#1F1F1F",
  n20: "#313033",
  n25: "#3D3B3E",
  n30: "#484649",
  n35: "#545156",
  n40: "#605D62",
  n45: "#6C6970",
  n50: "#79767D",
  n55: "#86838A",
  n60: "#939097",
  n65: "#A39FA3",
  n70: "#AEAAAF",
  n75: "#BCB9C1",
  n80: "#CFCFCF",
  n85: "#d1cfcf",
  n90: "#dbdada",
  n95: "#E4E4E4",
  n96: "#F0F0F0",
  n97: "#F8F8F8",
  n98: "#FCFCFC",
  n99: "#FEFEFE",
  n100: "#FFFFFF",
} satisfies Neutral;

// Neutral-Variant is reserved for structure (outline, dividers, surfaceVariant, chips).
export const neutralVariant = {
  nv10: "#1D1A22",
  nv20: "#322F37",
  nv30: "#49454F",
  nv40: "#605D66",
  nv50: "#79747E",
  nv60: "#938F99",
  nv70: "#AEA9B4",
  nv80: "#CAC4D0",
  nv90: "#E7E0EC",
} satisfies NeutralVariant;

const surfaceTint: SurfaceTint = {
  source: "primary",
  amount: 0,
  neutralColor: neutralVariant.nv50,
};

export const themeColorSeed = {
  primary: "#d24f23ff",
  secondary: "#FFC107",
  tertiary: "#795548",
  error: "#F44336",
  surfaceTint,
} satisfies ThemeColorSeed;

export const themeColorModeOverrides = {
  light: {
    secondary: "#7A5B00",
  },
  dark: {
    secondary: "#FFD166",
  },
} as const;

export const colorStateLayerOpacity = {
  hover: 0.04,
  selected: 0.08,
  focus: 0.12,
  focusVisible: 0.3,
  outlinedBorder: 0.5,
  dragged: 0.16,
  disabled: 0.38,
  disabledBg: 0.12,
};

export const surfaceStateLayerOpacity = {
  hover: 0.08,
  selected: 0.1,
  focus: 0.1,
  focusVisible: 0.3,
  outlinedBorder: 0.5,
  dragged: 0.16,
  disabled: 0.38,
  disabledBg: 0.12,
};

export const surfaceToneReferences = {
  light: {
    background: neutral.n98,
    onBackground: neutral.n10,
    onSurface: neutral.n10,
    surface: neutral.n100,
    surfaceDim: neutral.n90,
    surfaceBright: neutral.n100,
    surfaceContainerLowest: neutral.n100,
    surfaceContainerLow: neutral.n98,
    surfaceContainer: neutral.n100,
    surfaceContainerHigh: neutral.n96,
    surfaceContainerHighest: neutral.n90,
    inverseOnSurface: neutral.n95,
    inverseSurface: neutral.n20,
    surfaceVariant: neutralVariant.nv90,
    onSurfaceVariant: neutralVariant.nv30,
    outline: neutralVariant.nv80,
    border: neutral.n70,
  },
  dark: {
    background: neutral.n10,
    onBackground: neutral.n95,
    onSurface: neutral.n95,
    surface: neutral.n10,
    surfaceDim: neutral.n10,
    surfaceBright: neutral.n25,
    surfaceContainerLowest: neutral.n5,
    surfaceContainerLow: neutral.n15,
    surfaceContainer: neutral.n15,
    surfaceContainerHigh: neutral.n20,
    surfaceContainerHighest: neutral.n25,
    inverseOnSurface: neutral.n20,
    inverseSurface: neutral.n95,
    surfaceVariant: neutralVariant.nv30,
    onSurfaceVariant: neutralVariant.nv80,
    outline: neutralVariant.nv30,
    border: neutral.n40,
  },
} as const;

export const surfaceTintWeights = {
  light: {
    background: 0,
    onBackground: 0.02,
    onSurface: 0.02,
    surface: 0,
    surfaceDim: 0.035,
    surfaceBright: 0,
    surfaceContainerLowest: 0,
    surfaceContainerLow: 0.008,
    surfaceContainer: 0,
    surfaceContainerHigh: 0.022,
    surfaceContainerHighest: 0.042,
    inverseOnSurface: 0.02,
    inverseSurface: 0.018,
    surfaceVariant: 0.03,
    onSurfaceVariant: 0.018,
    outline: 0.012,
    border: 0.01,
  },
  dark: {
    background: 0.06,
    onBackground: 0.04,
    onSurface: 0.04,
    surface: 0.06,
    surfaceDim: 0.06,
    surfaceBright: 0.1,
    surfaceContainerLowest: 0.05,
    surfaceContainerLow: 0.07,
    surfaceContainer: 0.08,
    surfaceContainerHigh: 0.09,
    surfaceContainerHighest: 0.1,
    inverseOnSurface: 0.035,
    inverseSurface: 0.04,
    surfaceVariant: 0.055,
    onSurfaceVariant: 0.035,
    outline: 0.018,
    border: 0.014,
  },
} as const satisfies Record<
  ThemeMode,
  Record<keyof (typeof surfaceToneReferences)["light"], number>
>;
