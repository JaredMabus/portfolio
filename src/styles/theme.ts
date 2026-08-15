import {
  alpha,
  createTheme,
  darken,
  getContrastRatio,
  lighten,
  responsiveFontSizes,
  Theme,
} from "@mui/material/styles";
import { common, grey } from "@mui/material/colors";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";

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
  n85: "#D1CFCF",
  n90: "#DBDADA",
  n95: "#E4E4E4",
  n96: "#F0F0F0",
  n97: "#F8F8F8",
  n98: "#FCFCFC",
  n99: "#FEFEFE",
  n100: "#FFFFFF",
};

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
};

export type FixedColorKeys =
  | "primaryFixed"
  | "onPrimaryFixed"
  | "primaryFixedDim"
  | "onPrimaryFixedVariant"
  | "secondaryFixed"
  | "onSecondaryFixed"
  | "secondaryFixedDim"
  | "onSecondaryFixedVariant"
  | "tertiaryFixed"
  | "onTertiaryFixed"
  | "tertiaryFixedDim"
  | "onTertiaryFixedVariant";

type ThemeMode = "light" | "dark";
type SurfaceTintSource = "primary" | "neutral" | "none";

export type StateLayer = {
  hover: string;
  selected: string;
  focus: string;
  focusVisible: string;
  outlinedBorder: string;
  dragged: string;
  disabled: string;
  disabledBg: string;
};

export type ColorRole = {
  main: string;
  high: string;
  low: string;
  on: string;
  state: StateLayer;
};

export type SurfaceRole = ColorRole;

export type ThemeColorScheme = {
  primary: ColorRole;
  secondary: ColorRole;
  error: ColorRole;
  surface: SurfaceRole;
  surfaceContainerLowest: SurfaceRole;
  surfaceContainerLow: SurfaceRole;
  surfaceContainerGlass: SurfaceRole;
  surfaceContainer: SurfaceRole;
  surfaceContainerHigh: SurfaceRole;
  surfaceContainerHighest: SurfaceRole;
  primaryContainer: string;
  onPrimaryContainer: string;
  secondaryContainer: string;
  onSecondaryContainer: string;
  tertiary: string;
  onTertiary: string;
  tertiaryContainer: string;
  onTertiaryContainer: string;
  errorContainer: string;
  onErrorContainer: string;
  outline: string;
  border: string;
  background: string;
  onBackground: string;
  surfaceVariant: string;
  onSurfaceVariant: string;
  surfaceDim: string;
  surfaceBright: string;
  inverseOnSurface: string;
  inverseSurface: string;
} & Record<FixedColorKeys, string>;

export const themeColorSeed = {
  primary: "#58B488",
  secondary: "#3A7D60",
  tertiary: "#21262E",
  error: "#F44336",
  surfaceTint: {
    // source: "primary" uses the brand hue, "neutral" uses neutralColor, and
    // "none" disables chroma in the surface ramp.
    source: "primary" as SurfaceTintSource,
    // Multiplier over the M3-style surface tint ramp. Use 0 to turn tint off.
    amount: 0.6,
    neutralColor: neutralVariant.nv50,
  },
};

const colorStateLayerOpacity = {
  hover: 0.04,
  selected: 0.08,
  focus: 0.12,
  focusVisible: 0.3,
  outlinedBorder: 0.5,
  dragged: 0.16,
  disabled: 0.38,
  disabledBg: 0.12,
};

const surfaceStateLayerOpacity = {
  hover: 0.08,
  selected: 0.1,
  focus: 0.1,
  focusVisible: 0.3,
  outlinedBorder: 0.5,
  dragged: 0.16,
  disabled: 0.38,
  disabledBg: 0.12,
};

const surfaceToneReferences = {
  light: {
    background: neutral.n100,
    onBackground: neutral.n10,
    onSurface: neutral.n10,
    surface: neutral.n99,
    surfaceDim: neutral.n90,
    surfaceBright: neutral.n100,
    surfaceContainerLowest: neutral.n100,
    surfaceContainerLow: neutral.n98,
    surfaceContainer: neutral.n97,
    surfaceContainerHigh: neutral.n96,
    surfaceContainerHighest: neutral.n95,
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
    surfaceBright: "#3D3D3D",
    surfaceContainerLowest: neutral.n5,
    surfaceContainerLow: neutral.n15,
    surfaceContainer: "#202020",
    surfaceContainerHigh: "#2A2A2A",
    surfaceContainerHighest: "#343434",
    inverseOnSurface: neutral.n20,
    inverseSurface: neutral.n95,
    surfaceVariant: neutralVariant.nv30,
    onSurfaceVariant: neutralVariant.nv80,
    outline: neutralVariant.nv30,
    border: neutral.n40,
  },
} as const;

const surfaceTintWeights = {
  light: {
    background: 0.006,
    onBackground: 0.02,
    onSurface: 0.02,
    surface: 0.012,
    surfaceDim: 0.035,
    surfaceBright: 0.006,
    surfaceContainerLowest: 0.002,
    surfaceContainerLow: 0.018,
    surfaceContainer: 0.028,
    surfaceContainerHigh: 0.038,
    surfaceContainerHighest: 0.048,
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

type SurfaceToneKey = keyof (typeof surfaceToneReferences)["light"];

function hexToRgb(hex: string) {
  const value = hex.replace("#", "");
  return {
    r: Number.parseInt(value.slice(0, 2), 16),
    g: Number.parseInt(value.slice(2, 4), 16),
    b: Number.parseInt(value.slice(4, 6), 16),
  };
}

function rgbChannelToHex(value: number) {
  return Math.round(value).toString(16).padStart(2, "0").toUpperCase();
}

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

function mixHex(base: string, tint: string, tintWeight: number) {
  const baseRgb = hexToRgb(base);
  const tintRgb = hexToRgb(tint);
  const safeTintWeight = clamp01(tintWeight);
  const baseWeight = 1 - safeTintWeight;

  return `#${rgbChannelToHex(
    baseRgb.r * baseWeight + tintRgb.r * safeTintWeight,
  )}${rgbChannelToHex(
    baseRgb.g * baseWeight + tintRgb.g * safeTintWeight,
  )}${rgbChannelToHex(baseRgb.b * baseWeight + tintRgb.b * safeTintWeight)}`;
}

function createStateLayer(
  color: string,
  opacity: typeof colorStateLayerOpacity,
): StateLayer {
  return {
    hover: alpha(color, opacity.hover),
    selected: alpha(color, opacity.selected),
    focus: alpha(color, opacity.focus),
    focusVisible: alpha(color, opacity.focusVisible),
    outlinedBorder: alpha(color, opacity.outlinedBorder),
    dragged: alpha(color, opacity.dragged),
    disabled: alpha(color, opacity.disabled),
    disabledBg: alpha(color, opacity.disabledBg),
  };
}

function readableOnColor(color: string) {
  return getContrastRatio(color, common.white) >
    getContrastRatio(color, common.black)
    ? common.white
    : common.black;
}

function modeColorMain(seed: string, mode: ThemeMode) {
  return mode === "light" ? seed : lighten(seed, 0.15);
}

function createColorRole(main: string, mode: ThemeMode): ColorRole {
  return {
    main,
    high: mode === "light" ? darken(main, 0.12) : lighten(main, 0.12),
    low: mode === "light" ? lighten(main, 0.12) : darken(main, 0.12),
    on: readableOnColor(main),
    state: createStateLayer(main, colorStateLayerOpacity),
  };
}

function createRoleFromSeed(seed: string, mode: ThemeMode): ColorRole {
  return createColorRole(modeColorMain(seed, mode), mode);
}

function createContainerRole(seed: string, mode: ThemeMode): ColorRole {
  const main =
    mode === "light"
      ? mixHex(common.white, seed, 0.18)
      : mixHex(neutral.n0, seed, 0.42);
  const tonalOn = mode === "light" ? darken(seed, 0.58) : lighten(seed, 0.78);
  const on =
    getContrastRatio(main, tonalOn) >= 4.5 ? tonalOn : readableOnColor(main);

  return {
    main,
    high: mode === "light" ? darken(main, 0.08) : lighten(main, 0.08),
    low: mode === "light" ? lighten(main, 0.08) : darken(main, 0.08),
    on,
    state: createStateLayer(on, surfaceStateLayerOpacity),
  };
}

function createFixedColorRoles(
  primarySeed: string,
  secondarySeed: string,
  tertiarySeed: string,
): Record<FixedColorKeys, string> {
  const createFixed = (seed: string) => ({
    fixed: mixHex(common.white, seed, 0.16),
    fixedDim: mixHex(common.white, seed, 0.28),
    onFixed: darken(seed, 0.58),
    onFixedVariant: darken(seed, 0.36),
  });
  const primary = createFixed(primarySeed);
  const secondary = createFixed(secondarySeed);
  const tertiary = createFixed(tertiarySeed);

  return {
    primaryFixed: primary.fixed,
    onPrimaryFixed: primary.onFixed,
    primaryFixedDim: primary.fixedDim,
    onPrimaryFixedVariant: primary.onFixedVariant,
    secondaryFixed: secondary.fixed,
    onSecondaryFixed: secondary.onFixed,
    secondaryFixedDim: secondary.fixedDim,
    onSecondaryFixedVariant: secondary.onFixedVariant,
    tertiaryFixed: tertiary.fixed,
    onTertiaryFixed: tertiary.onFixed,
    tertiaryFixedDim: tertiary.fixedDim,
    onTertiaryFixedVariant: tertiary.onFixedVariant,
  };
}

export const fixedColors = createFixedColorRoles(
  themeColorSeed.primary,
  themeColorSeed.secondary,
  themeColorSeed.tertiary,
);

function surfaceTintColor() {
  if (themeColorSeed.surfaceTint.source === "none") {
    return null;
  }

  return themeColorSeed.surfaceTint.source === "neutral"
    ? themeColorSeed.surfaceTint.neutralColor
    : themeColorSeed.primary;
}

function tintSurfaceValue(mode: ThemeMode, key: SurfaceToneKey) {
  const tint = surfaceTintColor();
  const amount = clamp01(themeColorSeed.surfaceTint.amount);
  const baseValue = surfaceToneReferences[mode][key];

  if (!tint || amount === 0) {
    return baseValue;
  }

  return mixHex(baseValue, tint, surfaceTintWeights[mode][key] * amount);
}

function createSurfaceRole(
  main: string,
  high: string,
  low: string,
  onSurface: string,
): SurfaceRole {
  return {
    main,
    high,
    low,
    on: onSurface,
    state: createStateLayer(onSurface, surfaceStateLayerOpacity),
  };
}

function createGlassSurfaceRole(
  mode: ThemeMode,
  lowSurface: string,
  mainSurface: string,
  highSurface: string,
  onSurface: string,
): SurfaceRole {
  const opacity =
    mode === "light"
      ? { low: 0.44, main: 0.58, high: 0.7 }
      : { low: 0.32, main: 0.46, high: 0.58 };

  return createSurfaceRole(
    alpha(mainSurface, opacity.main),
    alpha(highSurface, opacity.high),
    alpha(lowSurface, opacity.low),
    onSurface,
  );
}

function createThemeColorScheme(mode: ThemeMode): ThemeColorScheme {
  const primary = createRoleFromSeed(themeColorSeed.primary, mode);
  const secondary = createRoleFromSeed(themeColorSeed.secondary, mode);
  const tertiary = createRoleFromSeed(themeColorSeed.tertiary, mode);
  const error = createRoleFromSeed(themeColorSeed.error, mode);
  const primaryContainer = createContainerRole(themeColorSeed.primary, mode);
  const secondaryContainer = createContainerRole(
    themeColorSeed.secondary,
    mode,
  );
  const tertiaryContainer = createContainerRole(themeColorSeed.tertiary, mode);
  const errorContainer = createContainerRole(themeColorSeed.error, mode);
  const onSurface = tintSurfaceValue(mode, "onSurface");
  const surface = tintSurfaceValue(mode, "surface");
  const surfaceContainerLowest = tintSurfaceValue(
    mode,
    "surfaceContainerLowest",
  );
  const surfaceContainerLow = tintSurfaceValue(mode, "surfaceContainerLow");
  const surfaceContainer = tintSurfaceValue(mode, "surfaceContainer");
  const surfaceContainerHigh = tintSurfaceValue(mode, "surfaceContainerHigh");
  const surfaceContainerHighest = tintSurfaceValue(
    mode,
    "surfaceContainerHighest",
  );

  return {
    primary,
    secondary,
    error,
    surface: createSurfaceRole(
      surface,
      surfaceContainer,
      surfaceContainerLowest,
      onSurface,
    ),
    surfaceContainerLowest: createSurfaceRole(
      surfaceContainerLowest,
      surface,
      mode === "light" ? common.white : neutral.n0,
      onSurface,
    ),
    surfaceContainerLow: createSurfaceRole(
      surfaceContainerLow,
      surfaceContainer,
      surface,
      onSurface,
    ),
    surfaceContainerGlass: createGlassSurfaceRole(
      mode,
      surfaceContainerLow,
      surfaceContainer,
      surfaceContainerHigh,
      onSurface,
    ),
    surfaceContainer: createSurfaceRole(
      surfaceContainer,
      surfaceContainerHigh,
      surfaceContainerLow,
      onSurface,
    ),
    surfaceContainerHigh: createSurfaceRole(
      surfaceContainerHigh,
      surfaceContainerHighest,
      surfaceContainer,
      onSurface,
    ),
    surfaceContainerHighest: createSurfaceRole(
      surfaceContainerHighest,
      tintSurfaceValue(mode, "surfaceBright"),
      surfaceContainerHigh,
      onSurface,
    ),
    primaryContainer: primaryContainer.main,
    onPrimaryContainer: primaryContainer.on,
    secondaryContainer: secondaryContainer.main,
    onSecondaryContainer: secondaryContainer.on,
    tertiary: tertiary.main,
    onTertiary: tertiary.on,
    tertiaryContainer: tertiaryContainer.main,
    onTertiaryContainer: tertiaryContainer.on,
    errorContainer: errorContainer.main,
    onErrorContainer: errorContainer.on,
    ...fixedColors,
    outline: tintSurfaceValue(mode, "outline"),
    border: tintSurfaceValue(mode, "border"),
    background: tintSurfaceValue(mode, "background"),
    onBackground: tintSurfaceValue(mode, "onBackground"),
    surfaceVariant: tintSurfaceValue(mode, "surfaceVariant"),
    onSurfaceVariant: tintSurfaceValue(mode, "onSurfaceVariant"),
    surfaceDim: tintSurfaceValue(mode, "surfaceDim"),
    surfaceBright: tintSurfaceValue(mode, "surfaceBright"),
    inverseOnSurface: tintSurfaceValue(mode, "inverseOnSurface"),
    inverseSurface: tintSurfaceValue(mode, "inverseSurface"),
  };
}

const lightThemeColors = createThemeColorScheme("light");
const darkThemeColors = createThemeColorScheme("dark");

export const GlobalStyle = {
  "*": { padding: 0, margin: 0, boxSizing: "border-box" },
  html: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
    WebkitFontSmoothing: "antialiased",
    WebkitTextSizeAdjust: "100%",
    MozOsxFontSmoothing: "grayscale",
    scrollbarGutter: "stable",
  },
  body: {
    height: "100%",
    minHeight: "100dvh",
    width: "100%",
    overflowX: "hidden",
    overflowY: "auto",
    scrollbarGutter: "stable",
  },
  "#root": { height: "100%", width: "100%" },
  "input, textarea, select": {
    fontSize: "1rem",
  },
  "@media (max-width: 600px)": {
    ".MuiInputBase-root, input, textarea, select": {
      fontSize: "1rem",
    },
  },
  a: { textDecoration: "none !important" },
  code: {
    fontFamily:
      'source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace',
  },
};

let theme = createTheme({
  typography: {
    fontFamily: ["Roboto", "Montserrat", "sans-serif"].join(","),
    h1: {
      fontSize: 57,
      lineHeight: 1.1228,
      letterSpacing: "-0.004386em",
      fontWeight: 400,
    },
    h2: { fontSize: 45, lineHeight: 1.1556, letterSpacing: 0, fontWeight: 400 },
    h3: { fontSize: 36, lineHeight: 1.2222, letterSpacing: 0, fontWeight: 400 },

    // HEADLINES
    h4: { fontSize: 32, lineHeight: 1.25, letterSpacing: 0, fontWeight: 400 },
    h5: { fontSize: 28, lineHeight: 1.2857, letterSpacing: 0, fontWeight: 400 },
    h6: { fontSize: 24, lineHeight: 1.3333, letterSpacing: 0, fontWeight: 400 },

    // TITLES
    subtitle1: {
      fontSize: 22,
      lineHeight: 1.2727,
      letterSpacing: 0,
      fontWeight: 400,
    },
    subtitle2: {
      fontSize: 18,
      lineHeight: 1.5,
      letterSpacing: "0.009375em",
      fontWeight: 500,
    },

    body1: {
      fontSize: 16,
      lineHeight: 1.5,
      letterSpacing: "0.03125em",
      fontWeight: 400,
    },
    body2: {
      fontSize: 14,
      lineHeight: 1.4286,
      letterSpacing: "0.017857em",
      fontWeight: 400,
    },

    // LABELS
    button: {
      fontSize: 14,
      fontWeight: 500,
      lineHeight: 1,
      letterSpacing: "0.007143em",
      textTransform: "none",
    },
    caption: {
      fontSize: 12,
      fontWeight: 500,
      lineHeight: 1.3333,
      letterSpacing: "0.041667em",
    },
    overline: {
      fontSize: 14,
      lineHeight: 1.4286,
      letterSpacing: "0.007143em",
      fontWeight: 500,
      textTransform: "none",
    },
  },
  breakpoints: { values: { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536 } },
  shape: { borderRadius: 4 },
  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          h1: "h1",
          h2: "h2",
          h3: "h3",
          h4: "h4",
          h5: "h5",
          h6: "h6",
          subtitle1: "h6",
          subtitle2: "p",
          body1: "p",
          body2: "p",
          button: "span",
          caption: "span",
          overline: "span",
        },
      },
    },
    MuiMenu: {
      defaultProps: {
        disableScrollLock: true,
      },
    },
    MuiPopover: {
      defaultProps: {
        disableScrollLock: true,
      },
    },
    MuiSelect: {
      defaultProps: {
        MenuProps: {
          disableScrollLock: true,
        },
      },
    },
    MuiChip: {
      variants: [
        {
          props: { color: "neutral" },
          style: ({ theme }: { theme: Theme }) => ({
            color: theme.palette.text.secondary,
            backgroundColor: theme.palette.neutral.main,
            "& .MuiChip-icon, & .MuiChip-deleteIcon, & .material-symbol": {
              color: "inherit",
            },
            "&.MuiChip-clickable:hover": {
              color: theme.palette.text.primary,
              backgroundColor: theme.palette.neutral.high,
            },
            "&.Mui-disabled": {
              color: theme.palette.text.disabled,
              backgroundColor: theme.palette.action.disabledBackground,
            },
          }),
        },
        {
          props: { variant: "outlined", color: "neutral" },
          style: ({ theme }: { theme: Theme }) => ({
            color: theme.palette.text.secondary,
            backgroundColor: "transparent",
            borderColor: theme.palette.border.main,
            "& .MuiChip-icon, & .MuiChip-deleteIcon, & .material-symbol": {
              color: "inherit",
            },
            "&.MuiChip-clickable:hover": {
              color: theme.palette.text.primary,
              backgroundColor: alpha(theme.palette.neutral.high, 0.6),
              borderColor: theme.palette.border.high,
            },
            "&.Mui-disabled": {
              color: theme.palette.text.disabled,
              borderColor: theme.palette.action.disabledBackground,
            },
          }),
        },
      ],
    },
    MuiIconButton: {
      styleOverrides: {
        root: ({ theme }: { theme: Theme }) => ({
          "--icon-btn-radius": "50%",
          border: "1px solid transparent",
          borderRadius: "var(--icon-btn-radius)",
          color: theme.palette.text.primary,
          overflow: "hidden",
          transition: "all 0.2s ease-in-out",

          "&.MuiIconButton-sizeSmall": {
            padding: theme.spacing(0.5),
          },
          "&.MuiIconButton-sizeMedium": {
            padding: theme.spacing(0.75),
          },
          "&.MuiIconButton-sizeLarge": {
            padding: theme.spacing(1),
          },

          "& .MuiSvgIcon-root, & .material-symbol": {
            color: "inherit",
            fontSize: "1em",
            position: "relative",
            zIndex: 1,
          },

          "&.MuiIconButton-colorInherit": {
            color: "inherit",
          },
          "&.MuiIconButton-colorPrimary": {
            color: theme.palette.primary.main,
          },
          "&.MuiIconButton-colorSecondary": {
            color: theme.palette.secondary.main,
          },
          "&.MuiIconButton-colorError": {
            color: theme.palette.error.main,
          },
          "&.MuiIconButton-colorInfo": {
            color: theme.palette.info.main,
          },
          "&.MuiIconButton-colorSuccess": {
            color: theme.palette.success.main,
          },
          "&.MuiIconButton-colorWarning": {
            color: theme.palette.warning.main,
          },
          "&.Mui-disabled": {
            color: theme.palette.text.disabled,
          },

          "& .MuiTouchRipple-root, & .MuiTouchRipple-child": {
            borderRadius: "var(--icon-btn-radius)",
            transition: "all 0.2s ease-in-out",
          },
          "& .MuiTouchRipple-root": {
            zIndex: 0,
          },
        }),
      },
      variants: [
        {
          props: { variant: "outlined", color: "primary" },
          style: ({ theme }: { theme: Theme }) => ({
            color: theme.palette.primary.main,
            backgroundColor: "transparent",
            borderColor: theme.palette.primary.state.outlinedBorder,
            "&:hover": {
              color: theme.palette.primary.main,
              backgroundColor: theme.palette.primary.state.hover,
              borderColor: theme.palette.primary.main,
            },
            "&.Mui-disabled": {
              color: theme.palette.text.disabled,
              backgroundColor: "transparent",
              borderColor: theme.palette.action.disabledBackground,
            },
          }),
        },
        {
          props: { variant: "outlined", color: "neutral" },
          style: ({ theme }: { theme: Theme }) => ({
            "--app-state-selected":
              theme.palette.surfaceContainer.state.selected,
            color: theme.palette.text.secondary,
            backgroundColor: "transparent",
            borderColor: theme.palette.border.main,
            "& .MuiTouchRipple-child": {
              backgroundColor: "var(--app-state-selected)",
            },
            "&:hover": {
              color: theme.palette.text.primary,
              backgroundColor: alpha(theme.palette.surfaceContainer.high, 0.6),
              borderColor: theme.palette.border.high,
            },
            "&.Mui-disabled": {
              color: theme.palette.text.disabled,
              backgroundColor: "transparent",
              borderColor: theme.palette.action.disabledBackground,
            },
          }),
        },
        {
          props: { color: "neutral" },
          style: ({ theme }: { theme: Theme }) => ({
            "--app-state-selected":
              theme.palette.surfaceContainerHighest.state.selected,
            color: theme.palette.text.secondary,
            backgroundColor: "transparent",
            "& .MuiTouchRipple-child": {
              backgroundColor: "var(--app-state-selected)",
            },
            "&:hover": {
              color: theme.palette.text.primary,
              backgroundColor: theme.palette.surfaceContainerHigh.main,
            },
            "&.Mui-disabled": {
              color: theme.palette.text.disabled,
              backgroundColor: "transparent",
            },
          }),
        },
      ],
    },
    MuiTooltip: {
      defaultProps: {
        placement: "bottom",
        arrow: true,
        enterDelay: 500,
        slotProps: {
          popper: {
            sx: { pointerEvents: "none" },
            modifiers: [{ name: "offset", options: { offset: [0, -8] } }],
          },
        },
      },
      styleOverrides: {
        tooltip: ({ theme }: { theme: Theme }) => ({
          minHeight: 34,
          display: "flex",
          alignItems: "center",
          padding: theme.spacing(0.875, 1.5),
          borderRadius: 8,
          backgroundColor:
            theme.palette.mode === "light"
              ? common.black
              : theme.palette.inverseSurface.main,
          color:
            theme.palette.mode === "light"
              ? common.white
              : theme.palette.inverseOnSurface.main,
          fontSize: 12,
          fontWeight: 500,
          lineHeight: 1.4,
          letterSpacing: "0.01em",
          boxShadow: theme.shadows[2],
        }),
        arrow: ({ theme }: { theme: Theme }) => ({
          color:
            theme.palette.mode === "light"
              ? common.black
              : theme.palette.inverseSurface.main,
          fontSize: 10,
        }),
      },
    },
    MuiButton: {
      styleOverrides: {
        root: ({ theme }: { theme: Theme }) => ({
          borderRadius: 24,
          whiteSpace: "nowrap",
          padding: 10,
          width: "auto",

          "& .MuiButton-icon > *:nth-of-type(1)": {
            fontSize: "1em",
          },

          "& > :not(.MuiTouchRipple-root), & .MuiButton-icon, & .MuiButton-loadingIndicator, & .MuiLoadingButton-loadingIndicator, & .MuiSvgIcon-root, & .material-symbol":
            {
              zIndex: 1,
            },

          "& .MuiTouchRipple-root": {
            zIndex: 0,
          },

          // Loading state
          "&.MuiButton-loading": {
            cursor: "wait",
            color: alpha(theme.palette.text.disabled, 0.2),
            "& .MuiSvgIcon-root, & .material-symbol": {
              color: "inherit",
            },
          },
          "& .MuiButton-loadingIndicator, & .MuiLoadingButton-loadingIndicator":
            {
              color: theme.palette.text.disabled,
            },
          // Disabled state
          "&.Mui-disabled": {
            color: theme.palette.text.disabled,
          },
        }),
        contained: ({ theme }: { theme: Theme }) => ({
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none",
          },
        }),
        outlined: ({ theme }: { theme: Theme }) => ({
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none",
          },
        }),
      },
      variants: [
        {
          props: { variant: "contained", color: "neutral" },
          style: ({ theme }: { theme: Theme }) => ({
            "--app-state-selected":
              theme.palette.surfaceContainer.state.selected,
            color: theme.palette.text.secondary,
            backgroundColor: theme.palette.surfaceContainer.main,
            transition: theme.transitions.create("all", {
              duration: theme.transitions.duration.short,
              easing: theme.transitions.easing.easeInOut,
            }),
            "& .MuiTouchRipple-child": {
              backgroundColor: "var(--app-state-selected)",
            },
            "& .MuiSvgIcon-root, & .material-symbol": {
              color: "inherit",
            },

            "&:hover": {
              color: theme.palette.text.primary,
              backgroundColor: theme.palette.surfaceContainer.state.hover,
              "& .MuiSvgIcon-root, & .material-symbol": {
                color: "inherit",
              },
            },
          }),
        },
        {
          props: { variant: "outlined", color: "neutral" },
          style: ({ theme }: { theme: Theme }) => ({
            "--app-state-selected":
              theme.palette.surfaceContainer.state.selected,
            color: theme.palette.text.secondary,
            backgroundColor: theme.palette.surfaceContainer.main,
            borderColor: theme.palette.border.main,
            borderRadius: "24px",
            transition: theme.transitions.create("all", {
              duration: theme.transitions.duration.short,
              easing: theme.transitions.easing.easeInOut,
            }),
            "& .MuiTouchRipple-child": {
              backgroundColor: "var(--app-state-selected)",
            },
            "& .MuiSvgIcon-root, & .material-symbol": {
              color: "inherit",
            },

            "&:hover": {
              color: theme.palette.text.primary,
              backgroundColor: theme.palette.surfaceContainer.state.hover,
              borderColor: theme.palette.border.high,
              "& .MuiSvgIcon-root, & .material-symbol": {
                color: "inherit",
              },
            },
          }),
        },
        {
          props: { variant: "text", color: "neutral" },
          style: ({ theme }: { theme: Theme }) => ({
            "--app-state-selected":
              theme.palette.surfaceContainer.state.selected,
            color: theme.palette.text.secondary,
            borderRadius: "24px",
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
            background: alpha(theme.palette.surfaceContainer.main, 0.1),
            transition: theme.transitions.create("all", {
              duration: theme.transitions.duration.short,
              easing: theme.transitions.easing.easeInOut,
            }),
            "& .MuiTouchRipple-child": {
              backgroundColor: "var(--app-state-selected)",
            },
            "& .MuiSvgIcon-root, & .material-symbol": {
              color: "inherit",
            },

            "&:hover": {
              color: theme.palette.text.primary,
              backgroundColor: alpha(theme.palette.surfaceContainer.high, 0.4),
              "& .MuiSvgIcon-root, & .material-symbol": {
                color: "inherit",
              },
            },
          }),
        },
      ],
    },
    MuiSkeleton: {
      styleOverrides: {
        root: ({ theme }: { theme: Theme }) => {
          return {
            "&::after": {
              background: `linear-gradient(90deg, transparent 0%, ${alpha(
                grey[900],
                0.04,
              )} 60%, transparent 100%)`,
              ...theme.applyStyles("dark", {
                background: `linear-gradient(90deg, transparent 0%, ${alpha(
                  grey[400],
                  0.05,
                )} 60%, transparent 100%)`,
              }),
            },
          };
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: ({ theme }: { theme: Theme }) => ({
          "&.side-nav-button": {
            display: "flex",
            alignItems: "center",
            borderRadius: 8,
            whiteSpace: "nowrap",
            transition: theme.transitions.create("all", {
              duration: theme.transitions.duration.shortest,
              easing: theme.transitions.easing.easeInOut,
            }),
            color: theme.palette.text.secondary,
            "--app-state-hover": theme.palette.surfaceContainer.state.hover,
            "--app-state-focus-visible":
              theme.palette.surfaceContainer.state.focusVisible,
            "--app-state-selected":
              theme.palette.surfaceContainer.state.selected,
            "--app-state-disabled-bg":
              theme.palette.surfaceContainer.state.disabledBg,

            minHeight: 44,
            paddingTop: 0,
            paddingBottom: 0,
            marginTop: 0,
            marginBottom: 0,

            [theme.breakpoints.up("md")]: {
              minHeight: 36,
              marginTop: 0,
              marginBottom: 0,
            },

            "& .MuiListItemText-root": {
              margin: 0,
              paddingLeft: 0,
            },

            "& .MuiListItemText-primary": {
              color: theme.palette.text.primary,
              fontWeight: 500,
              fontSize: "0.95rem",
              lineHeight: 1.25,
            },

            "& .MuiListItemIcon-root, & .MuiListItemText-root, & .material-symbol, & .MuiSvgIcon-root":
              {
                position: "relative",
                zIndex: 1,
              },

            "& .MuiTouchRipple-root": {
              zIndex: 0,
            },

            "& .MuiTouchRipple-child": {
              backgroundColor: "var(--app-state-selected)",
            },

            "&:hover": {
              backgroundColor: "var(--app-state-hover)",
              color: theme.palette.text.primary,
            },

            "&.Mui-focusVisible": {
              backgroundColor: "var(--app-state-focus-visible)",
            },

            "&.Mui-selected, &.active": {
              backgroundColor: "var(--app-state-selected)",
              color: theme.palette.primary.main,
              "& .MuiListItemText-primary": {
                fontWeight: 700,
                color: theme.palette.primary.main,
              },
              "& .MuiSvgIcon-root": {
                color: theme.palette.primary.main,
              },
            },

            "&.Mui-selected:hover, &.active:hover": {
              backgroundColor: "var(--app-state-selected)",
            },

            "&.Mui-disabled": {
              backgroundColor: "var(--app-state-disabled-bg)",
              color: theme.palette.text.disabled,
            },
          },
        }),
      },
    },
  },
});

export let themeLight = createTheme(theme, {
  palette: {
    mode: "light",
    primary: {
      main: lightThemeColors.primary.main,
      light: lighten(lightThemeColors.primary.main, 0.2),
      dark: darken(lightThemeColors.primary.main, 0.15),
      contrastText: lightThemeColors.primary.on,
      high: lightThemeColors.primary.high,
      low: lightThemeColors.primary.low,
      state: lightThemeColors.primary.state,
    },
    secondary: {
      main: lightThemeColors.secondary.main,
      light: lighten(lightThemeColors.secondary.main, 0.2),
      dark: darken(lightThemeColors.secondary.main, 0.15),
      contrastText: lightThemeColors.secondary.on,
      high: lightThemeColors.secondary.high,
      low: lightThemeColors.secondary.low,
      state: lightThemeColors.secondary.state,
    },
    tertiary: {
      main: lightThemeColors.tertiary,
      light: lighten(lightThemeColors.tertiary, 0.2),
      dark: darken(lightThemeColors.tertiary, 0.15),
      contrastText: lightThemeColors.onTertiary,
      high: darken(lightThemeColors.tertiary, 0.12),
      low: lighten(lightThemeColors.tertiary, 0.12),
      state: createStateLayer(lightThemeColors.tertiary, colorStateLayerOpacity),
    },
    neutral: {
      main: lightThemeColors.surfaceContainer.main,
      light: lightThemeColors.surfaceContainerLow.main,
      dark: lightThemeColors.surfaceContainerHigh.main,
      contrastText: lightThemeColors.surface.on,
      high: lightThemeColors.surfaceContainerHigh.main,
      low: lightThemeColors.surfaceContainerLow.main,
      state: lightThemeColors.surfaceContainer.state,
    },
    error: {
      main: lightThemeColors.error.main,
      light: lighten(lightThemeColors.error.main, 0.2),
      dark: darken(lightThemeColors.error.main, 0.15),
      contrastText: lightThemeColors.error.on,
      high: lightThemeColors.error.high,
      low: lightThemeColors.error.low,
      state: lightThemeColors.error.state,
    },
    warning: {
      main: theme.palette.warning.main,
      light: theme.palette.warning.light,
      dark: theme.palette.warning.dark,
      contrastText: theme.palette.warning.contrastText,
      high: darken(theme.palette.warning.main, 0.12),
      low: lighten(theme.palette.warning.main, 0.12),
      state: createStateLayer(theme.palette.warning.main, colorStateLayerOpacity),
    },
    info: {
      main: theme.palette.info.main,
      light: theme.palette.info.light,
      dark: theme.palette.info.dark,
      contrastText: theme.palette.info.contrastText,
      high: darken(theme.palette.info.main, 0.12),
      low: lighten(theme.palette.info.main, 0.12),
      state: createStateLayer(theme.palette.info.main, colorStateLayerOpacity),
    },
    success: {
      main: theme.palette.success.main,
      light: theme.palette.success.light,
      dark: theme.palette.success.dark,
      contrastText: theme.palette.success.contrastText,
      high: darken(theme.palette.success.main, 0.12),
      low: lighten(theme.palette.success.main, 0.12),
      state: createStateLayer(theme.palette.success.main, colorStateLayerOpacity),
    },

    primaryContainer: theme.palette.augmentColor({
      color: {
        main: lightThemeColors.primaryContainer,
        contrastText: lightThemeColors.onPrimaryContainer,
        high: darken(lightThemeColors.primaryContainer, 0.1),
        low: lighten(lightThemeColors.primaryContainer, 0.1),
      },
    }),
    secondaryContainer: theme.palette.augmentColor({
      color: {
        main: lightThemeColors.secondaryContainer,
        contrastText: lightThemeColors.onSecondaryContainer,
        high: darken(lightThemeColors.secondaryContainer, 0.1),
        low: lighten(lightThemeColors.secondaryContainer, 0.1),
      },
    }),
    tertiaryContainer: theme.palette.augmentColor({
      color: {
        main: lightThemeColors.tertiaryContainer,
        contrastText: lightThemeColors.onTertiaryContainer,
        high: darken(lightThemeColors.tertiaryContainer, 0.1),
        low: lighten(lightThemeColors.tertiaryContainer, 0.1),
      },
    }),
    errorContainer: theme.palette.augmentColor({
      color: {
        main: lightThemeColors.errorContainer,
        high: darken(lightThemeColors.errorContainer, 0.2),
        low: lighten(lightThemeColors.errorContainer, 0.1),
        contrastText: lightThemeColors.onErrorContainer,
      },
    }),

    outline: theme.palette.augmentColor({
      color: {
        main: lightThemeColors.outline,
        light: darken(lightThemeColors.outline, 0.1),
        dark: lighten(lightThemeColors.outline, 0.5),
        high: darken(lightThemeColors.outline, 0.2),
        low: lighten(lightThemeColors.outline, 0.1),
      },
    }),
    border: theme.palette.augmentColor({
      color: {
        main: lightThemeColors.border,
        light: lighten(lightThemeColors.border, 0.8),
        dark: darken(lightThemeColors.border, 0.15),
        high: darken(lightThemeColors.border, 0.5),
        low: lighten(lightThemeColors.border, 0.4),
      },
    }),

    background: {
      default: lightThemeColors.background,
      paper: darken(lightThemeColors.background, 0.01),
    },
    onBackground: theme.palette.augmentColor({
      color: {
        main: lightThemeColors.onBackground,
        high: darken(lightThemeColors.onBackground, 0.2),
        low: lighten(lightThemeColors.onBackground, 0.4),
      },
    }),

    text: {
      primary: lightThemeColors.onBackground,
      secondary: lighten(lightThemeColors.onBackground, 0.2),
      disabled: alpha(lightThemeColors.onBackground, 0.4),
    },

    surface: {
      main: lightThemeColors.surface.main,
      light: lighten(lightThemeColors.surface.main, 0.05),
      dark: darken(lightThemeColors.surface.main, 0.05),
      contrastText: lightThemeColors.surface.on,
      high: lightThemeColors.surface.high,
      low: lightThemeColors.surface.low,
      state: lightThemeColors.surface.state,
    },
    onSurface: theme.palette.augmentColor({
      color: {
        main: lightThemeColors.surface.on,
        high: darken(lightThemeColors.surface.on, 0.1),
        low: lighten(lightThemeColors.surface.on, 0.1),
      },
    }),
    surfaceVariant: theme.palette.augmentColor({
      color: {
        main: lightThemeColors.surfaceVariant,
        contrastText: lightThemeColors.onSurfaceVariant,
        high: darken(lightThemeColors.surfaceVariant, 0.06),
        low: lighten(lightThemeColors.surfaceVariant, 0.06),
      },
    }),
    onSurfaceVariant: theme.palette.augmentColor({
      color: {
        main: lightThemeColors.onSurfaceVariant,
        high: darken(lightThemeColors.onSurfaceVariant, 0.2),
        low: lighten(lightThemeColors.onSurfaceVariant, 0.35),
      },
    }),

    surfaceDim: theme.palette.augmentColor({
      color: {
        main: lightThemeColors.surfaceDim,
        high: darken(lightThemeColors.surfaceDim, 0.06),
        low: lighten(lightThemeColors.surfaceDim, 0.06),
      },
    }),
    surfaceBright: theme.palette.augmentColor({
      color: {
        main: lightThemeColors.surfaceBright,
        high: darken(lightThemeColors.surfaceBright, 0.06),
        low: lighten(lightThemeColors.surfaceBright, 0.06),
      },
    }),
    inverseOnSurface: theme.palette.augmentColor({
      color: {
        main: lightThemeColors.inverseOnSurface,
        high: darken(lightThemeColors.inverseOnSurface, 0.2),
        low: lighten(lightThemeColors.inverseOnSurface, 0.35),
      },
    }),
    inverseSurface: theme.palette.augmentColor({
      color: {
        main: lightThemeColors.inverseSurface,
        high: darken(lightThemeColors.inverseSurface, 0.06),
        low: lighten(lightThemeColors.inverseSurface, 0.06),
      },
    }),
    surfaceContainerLowest: {
      main: lightThemeColors.surfaceContainerLowest.main,
      light: lighten(lightThemeColors.surfaceContainerLowest.main, 0.05),
      dark: darken(lightThemeColors.surfaceContainerLowest.main, 0.05),
      high: lightThemeColors.surfaceContainerLowest.high,
      low: lightThemeColors.surfaceContainerLowest.low,
      contrastText: lightThemeColors.surfaceContainerLowest.on,
      state: lightThemeColors.surfaceContainerLowest.state,
    },
    surfaceContainerLow: {
      main: lightThemeColors.surfaceContainerLow.main,
      light: lighten(lightThemeColors.surfaceContainerLow.main, 0.05),
      dark: darken(lightThemeColors.surfaceContainerLow.main, 0.05),
      high: lightThemeColors.surfaceContainerLow.high,
      low: lightThemeColors.surfaceContainerLow.low,
      contrastText: lightThemeColors.surfaceContainerLow.on,
      state: lightThemeColors.surfaceContainerLow.state,
    },
    surfaceContainerGlass: {
      main: lightThemeColors.surfaceContainerGlass.main,
      light: lightThemeColors.surfaceContainerGlass.high,
      dark: lightThemeColors.surfaceContainerGlass.low,
      high: lightThemeColors.surfaceContainerGlass.high,
      low: lightThemeColors.surfaceContainerGlass.low,
      contrastText: lightThemeColors.surfaceContainerGlass.on,
      state: lightThemeColors.surfaceContainerGlass.state,
    },
    surfaceContainer: {
      main: lightThemeColors.surfaceContainer.main,
      light: lighten(lightThemeColors.surfaceContainer.main, 0.05),
      dark: darken(lightThemeColors.surfaceContainer.main, 0.05),
      high: lightThemeColors.surfaceContainer.high,
      low: lightThemeColors.surfaceContainer.low,
      contrastText: lightThemeColors.surfaceContainer.on,
      state: lightThemeColors.surfaceContainer.state,
    },
    surfaceContainerHigh: {
      main: lightThemeColors.surfaceContainerHigh.main,
      light: lighten(lightThemeColors.surfaceContainerHigh.main, 0.05),
      dark: darken(lightThemeColors.surfaceContainerHigh.main, 0.05),
      high: lightThemeColors.surfaceContainerHigh.high,
      low: lightThemeColors.surfaceContainerHigh.low,
      contrastText: lightThemeColors.surfaceContainerHigh.on,
      state: lightThemeColors.surfaceContainerHigh.state,
    },
    surfaceContainerHighest: {
      main: lightThemeColors.surfaceContainerHighest.main,
      light: lighten(lightThemeColors.surfaceContainerHighest.main, 0.05),
      dark: darken(lightThemeColors.surfaceContainerHighest.main, 0.05),
      high: lightThemeColors.surfaceContainerHighest.high,
      low: lightThemeColors.surfaceContainerHighest.low,
      contrastText: lightThemeColors.surfaceContainerHighest.on,
      state: lightThemeColors.surfaceContainerHighest.state,
    },

    primaryFixed: theme.palette.augmentColor({
      color: {
        main: lightThemeColors.primaryFixed,
        contrastText: lightThemeColors.onPrimaryFixed,
        high: darken(lightThemeColors.primaryFixed, 0.1),
        low: lighten(lightThemeColors.primaryFixed, 0.1),
      },
    }),
    onPrimaryFixed: theme.palette.augmentColor({
      color: {
        main: lightThemeColors.onPrimaryFixed,
        high: darken(lightThemeColors.onPrimaryFixed, 0.2),
        low: lighten(lightThemeColors.onPrimaryFixed, 0.35),
      },
    }),
    primaryFixedDim: theme.palette.augmentColor({
      color: {
        main: lightThemeColors.primaryFixedDim,
        high: darken(lightThemeColors.primaryFixedDim, 0.1),
        low: lighten(lightThemeColors.primaryFixedDim, 0.1),
      },
    }),
    secondaryFixed: theme.palette.augmentColor({
      color: {
        main: lightThemeColors.secondaryFixed,
        contrastText: lightThemeColors.onSecondaryFixed,
        high: darken(lightThemeColors.secondaryFixed, 0.1),
        low: lighten(lightThemeColors.secondaryFixed, 0.1),
      },
    }),
    onSecondaryFixed: theme.palette.augmentColor({
      color: {
        main: lightThemeColors.onSecondaryFixed,
        high: darken(lightThemeColors.onSecondaryFixed, 0.2),
        low: lighten(lightThemeColors.onSecondaryFixed, 0.35),
      },
    }),
    secondaryFixedDim: theme.palette.augmentColor({
      color: {
        main: lightThemeColors.secondaryFixedDim,
        high: darken(lightThemeColors.secondaryFixedDim, 0.1),
        low: lighten(lightThemeColors.secondaryFixedDim, 0.1),
      },
    }),
    tertiaryFixed: theme.palette.augmentColor({
      color: {
        main: lightThemeColors.tertiaryFixed,
        contrastText: lightThemeColors.onTertiaryFixed,
        high: darken(lightThemeColors.tertiaryFixed, 0.1),
        low: lighten(lightThemeColors.tertiaryFixed, 0.1),
      },
    }),
    onTertiaryFixed: theme.palette.augmentColor({
      color: {
        main: lightThemeColors.onTertiaryFixed,
        high: darken(lightThemeColors.onTertiaryFixed, 0.2),
        low: lighten(lightThemeColors.onTertiaryFixed, 0.35),
      },
    }),
    tertiaryFixedDim: theme.palette.augmentColor({
      color: {
        main: lightThemeColors.tertiaryFixedDim,
        high: darken(lightThemeColors.tertiaryFixedDim, 0.1),
        low: lighten(lightThemeColors.tertiaryFixedDim, 0.1),
      },
    }),
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        body { color: ${lightThemeColors.surface.on}; }
        .material-symbol { color: inherit; }
        *::-webkit-scrollbar { width: 14px; }
        *::-webkit-scrollbar-track {
          border: 1px solid ${lightThemeColors.background};
          background-color: ${lightThemeColors.background};
        }
        *::-webkit-scrollbar-thumb {
          border: 4px solid ${lightThemeColors.background};
          background-color: ${darken(lightThemeColors.surfaceContainer.main, 0.25)};
          border-radius: 10px;
        }
        *::-webkit-scrollbar-thumb:hover { 
          background-color: ${darken(lightThemeColors.surfaceDim, 0.25)}; 
        }
      `,
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& label": {
            color: lightThemeColors.surface.on,
          },
          "& label.Mui-focused": {
            color: lightThemeColors.surface.on,
          },
          "& .MuiInput-underline:after": {
            borderBottomColor: lightThemeColors.surface.on,
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: lightThemeColors.outline,
        },
        root: {
          [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
            borderColor: alpha(lightThemeColors.outline, 0.8),
          },
          [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
            borderColor: alpha(lightThemeColors.outline, 1),
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: lightThemeColors.surfaceContainer.main,
          color: lightThemeColors.surface.on,
          borderColor: lightThemeColors.outline,
        },
      },
    },
  },
});

export let themeDark = createTheme(theme, {
  palette: {
    mode: "dark",
    primary: {
      main: darkThemeColors.primary.main,
      light: lighten(darkThemeColors.primary.main, 0.2),
      dark: darken(darkThemeColors.primary.main, 0.15),
      contrastText: darkThemeColors.primary.on,
      high: darkThemeColors.primary.high,
      low: darkThemeColors.primary.low,
      state: darkThemeColors.primary.state,
    },
    secondary: {
      main: darkThemeColors.secondary.main,
      light: lighten(darkThemeColors.secondary.main, 0.2),
      dark: darken(darkThemeColors.secondary.main, 0.15),
      contrastText: darkThemeColors.secondary.on,
      high: darkThemeColors.secondary.high,
      low: darkThemeColors.secondary.low,
      state: darkThemeColors.secondary.state,
    },
    tertiary: {
      main: darkThemeColors.tertiary,
      light: lighten(darkThemeColors.tertiary, 0.2),
      dark: darken(darkThemeColors.tertiary, 0.15),
      contrastText: darkThemeColors.onTertiary,
      high: lighten(darkThemeColors.tertiary, 0.12),
      low: darken(darkThemeColors.tertiary, 0.12),
      state: createStateLayer(darkThemeColors.tertiary, colorStateLayerOpacity),
    },
    neutral: {
      main: darkThemeColors.surfaceContainer.main,
      light: darkThemeColors.surfaceContainerHigh.main,
      dark: darkThemeColors.surfaceContainerLow.main,
      contrastText: darkThemeColors.surface.on,
      high: darkThemeColors.surfaceContainerHigh.main,
      low: darkThemeColors.surfaceContainerLow.main,
      state: darkThemeColors.surfaceContainer.state,
    },
    error: {
      main: darkThemeColors.error.main,
      light: lighten(darkThemeColors.error.main, 0.2),
      dark: darken(darkThemeColors.error.main, 0.15),
      contrastText: darkThemeColors.error.on,
      high: darkThemeColors.error.high,
      low: darkThemeColors.error.low,
      state: darkThemeColors.error.state,
    },
    warning: {
      main: theme.palette.warning.main,
      light: theme.palette.warning.light,
      dark: theme.palette.warning.dark,
      contrastText: theme.palette.warning.contrastText,
      high: lighten(theme.palette.warning.main, 0.12),
      low: darken(theme.palette.warning.main, 0.12),
      state: createStateLayer(theme.palette.warning.main, colorStateLayerOpacity),
    },
    info: {
      main: theme.palette.info.main,
      light: theme.palette.info.light,
      dark: theme.palette.info.dark,
      contrastText: theme.palette.info.contrastText,
      high: lighten(theme.palette.info.main, 0.12),
      low: darken(theme.palette.info.main, 0.12),
      state: createStateLayer(theme.palette.info.main, colorStateLayerOpacity),
    },
    success: {
      main: theme.palette.success.main,
      light: theme.palette.success.light,
      dark: theme.palette.success.dark,
      contrastText: theme.palette.success.contrastText,
      high: lighten(theme.palette.success.main, 0.12),
      low: darken(theme.palette.success.main, 0.12),
      state: createStateLayer(theme.palette.success.main, colorStateLayerOpacity),
    },

    primaryContainer: theme.palette.augmentColor({
      color: {
        main: darkThemeColors.primaryContainer,
        contrastText: darkThemeColors.onPrimaryContainer,
        high: lighten(darkThemeColors.primaryContainer, 0.1),
        low: darken(darkThemeColors.primaryContainer, 0.1),
      },
    }),
    secondaryContainer: theme.palette.augmentColor({
      color: {
        main: darkThemeColors.secondaryContainer,
        contrastText: darkThemeColors.onSecondaryContainer,
        high: lighten(darkThemeColors.secondaryContainer, 0.1),
        low: darken(darkThemeColors.secondaryContainer, 0.1),
      },
    }),
    tertiaryContainer: theme.palette.augmentColor({
      color: {
        main: darkThemeColors.tertiaryContainer,
        contrastText: darkThemeColors.onTertiaryContainer,
        high: lighten(darkThemeColors.tertiaryContainer, 0.1),
        low: darken(darkThemeColors.tertiaryContainer, 0.1),
      },
    }),
    errorContainer: theme.palette.augmentColor({
      color: {
        main: darkThemeColors.errorContainer,
        high: lighten(darkThemeColors.errorContainer, 0.1),
        low: darken(darkThemeColors.errorContainer, 0.1),
        contrastText: darkThemeColors.onErrorContainer,
      },
    }),

    outline: theme.palette.augmentColor({
      color: {
        main: darkThemeColors.outline,
        light: lighten(darkThemeColors.outline, 0.1),
        dark: darken(darkThemeColors.outline, 0.1),
        high: lighten(darkThemeColors.outline, 0.1),
        low: darken(darkThemeColors.outline, 0.2),
      },
    }),
    border: theme.palette.augmentColor({
      color: {
        main: darkThemeColors.border,
        light: darken(darkThemeColors.border, 0.5),
        dark: lighten(darkThemeColors.border, 0.5),
        high: lighten(darkThemeColors.border, 0.4),
        low: darken(darkThemeColors.border, 0.2),
      },
    }),

    background: {
      default: darkThemeColors.background,
      paper: darkThemeColors.surface.main,
    },

    onBackground: theme.palette.augmentColor({
      color: {
        main: darkThemeColors.onBackground,
        high: lighten(darkThemeColors.onBackground, 0.2),
        low: darken(darkThemeColors.onBackground, 0.25),
      },
    }),

    text: {
      primary: darkThemeColors.onBackground,
      secondary: darken(darkThemeColors.onBackground, 0.15),
      disabled: alpha(darkThemeColors.onBackground, 0.4),
    },

    surface: {
      main: darkThemeColors.surface.main,
      light: lighten(darkThemeColors.surface.main, 0.2),
      dark: darken(darkThemeColors.surface.main, 0.05),
      contrastText: darkThemeColors.surface.on,
      high: darkThemeColors.surface.high,
      low: darkThemeColors.surface.low,
      state: darkThemeColors.surface.state,
    },
    onSurface: theme.palette.augmentColor({
      color: {
        main: darkThemeColors.surface.on,
        high: lighten(darkThemeColors.surface.on, 0.2),
        low: darken(darkThemeColors.surface.on, 0.25),
      },
    }),
    surfaceVariant: theme.palette.augmentColor({
      color: {
        main: darkThemeColors.surfaceVariant,
        contrastText: darkThemeColors.onSurfaceVariant,
        high: lighten(darkThemeColors.surfaceVariant, 0.08),
        low: darken(darkThemeColors.surfaceVariant, 0.08),
      },
    }),
    onSurfaceVariant: theme.palette.augmentColor({
      color: {
        main: darkThemeColors.onSurfaceVariant,
        high: lighten(darkThemeColors.onSurfaceVariant, 0.2),
        low: darken(darkThemeColors.onSurfaceVariant, 0.25),
      },
    }),

    surfaceDim: theme.palette.augmentColor({
      color: {
        main: darkThemeColors.surfaceDim,
        high: lighten(darkThemeColors.surfaceDim, 0.08),
        low: darken(darkThemeColors.surfaceDim, 0.08),
      },
    }),
    surfaceBright: theme.palette.augmentColor({
      color: {
        main: darkThemeColors.surfaceBright,
        high: lighten(darkThemeColors.surfaceBright, 0.08),
        low: darken(darkThemeColors.surfaceBright, 0.08),
      },
    }),
    inverseOnSurface: theme.palette.augmentColor({
      color: {
        main: darkThemeColors.inverseOnSurface,
        high: lighten(darkThemeColors.inverseOnSurface, 0.2),
        low: darken(darkThemeColors.inverseOnSurface, 0.25),
      },
    }),
    inverseSurface: theme.palette.augmentColor({
      color: {
        main: darkThemeColors.inverseSurface,
        high: lighten(darkThemeColors.inverseSurface, 0.08),
        low: darken(darkThemeColors.inverseSurface, 0.08),
      },
    }),
    surfaceContainerLowest: {
      main: darkThemeColors.surfaceContainerLowest.main,
      light: lighten(darkThemeColors.surfaceContainerLowest.main, 0.2),
      dark: darken(darkThemeColors.surfaceContainerLowest.main, 0.05),
      high: darkThemeColors.surfaceContainerLowest.high,
      low: darkThemeColors.surfaceContainerLowest.low,
      contrastText: darkThemeColors.surfaceContainerLowest.on,
      state: darkThemeColors.surfaceContainerLowest.state,
    },
    surfaceContainerLow: {
      main: darkThemeColors.surfaceContainerLow.main,
      light: lighten(darkThemeColors.surfaceContainerLow.main, 0.2),
      dark: darken(darkThemeColors.surfaceContainerLow.main, 0.05),
      high: darkThemeColors.surfaceContainerLow.high,
      low: darkThemeColors.surfaceContainerLow.low,
      contrastText: darkThemeColors.surfaceContainerLow.on,
      state: darkThemeColors.surfaceContainerLow.state,
    },
    surfaceContainerGlass: {
      main: darkThemeColors.surfaceContainerGlass.main,
      light: darkThemeColors.surfaceContainerGlass.high,
      dark: darkThemeColors.surfaceContainerGlass.low,
      high: darkThemeColors.surfaceContainerGlass.high,
      low: darkThemeColors.surfaceContainerGlass.low,
      contrastText: darkThemeColors.surfaceContainerGlass.on,
      state: darkThemeColors.surfaceContainerGlass.state,
    },
    surfaceContainer: {
      main: darkThemeColors.surfaceContainer.main,
      light: lighten(darkThemeColors.surfaceContainer.main, 0.2),
      dark: darken(darkThemeColors.surfaceContainer.main, 0.05),
      high: darkThemeColors.surfaceContainer.high,
      low: darkThemeColors.surfaceContainer.low,
      contrastText: darkThemeColors.surfaceContainer.on,
      state: darkThemeColors.surfaceContainer.state,
    },
    surfaceContainerHigh: {
      main: darkThemeColors.surfaceContainerHigh.main,
      light: lighten(darkThemeColors.surfaceContainerHigh.main, 0.2),
      dark: darken(darkThemeColors.surfaceContainerHigh.main, 0.05),
      high: darkThemeColors.surfaceContainerHigh.high,
      low: darkThemeColors.surfaceContainerHigh.low,
      contrastText: darkThemeColors.surfaceContainerHigh.on,
      state: darkThemeColors.surfaceContainerHigh.state,
    },
    surfaceContainerHighest: {
      main: darkThemeColors.surfaceContainerHighest.main,
      light: lighten(darkThemeColors.surfaceContainerHighest.main, 0.2),
      dark: darken(darkThemeColors.surfaceContainerHighest.main, 0.05),
      high: darkThemeColors.surfaceContainerHighest.high,
      low: darkThemeColors.surfaceContainerHighest.low,
      contrastText: darkThemeColors.surfaceContainerHighest.on,
      state: darkThemeColors.surfaceContainerHighest.state,
    },

    primaryFixed: theme.palette.augmentColor({
      color: {
        main: darkThemeColors.primaryFixed,
        contrastText: darkThemeColors.onPrimaryFixed,
        high: lighten(darkThemeColors.primaryFixed, 0.1),
        low: darken(darkThemeColors.primaryFixed, 0.1),
      },
    }),
    onPrimaryFixed: theme.palette.augmentColor({
      color: {
        main: darkThemeColors.onPrimaryFixed,
        high: lighten(darkThemeColors.onPrimaryFixed, 0.2),
        low: darken(darkThemeColors.onPrimaryFixed, 0.25),
      },
    }),
    primaryFixedDim: theme.palette.augmentColor({
      color: {
        main: darkThemeColors.primaryFixedDim,
        high: lighten(darkThemeColors.primaryFixedDim, 0.1),
        low: darken(darkThemeColors.primaryFixedDim, 0.1),
      },
    }),
    secondaryFixed: theme.palette.augmentColor({
      color: {
        main: darkThemeColors.secondaryFixed,
        contrastText: darkThemeColors.onSecondaryFixed,
        high: lighten(darkThemeColors.secondaryFixed, 0.1),
        low: darken(darkThemeColors.secondaryFixed, 0.1),
      },
    }),
    onSecondaryFixed: theme.palette.augmentColor({
      color: {
        main: darkThemeColors.onSecondaryFixed,
        high: lighten(darkThemeColors.onSecondaryFixed, 0.2),
        low: darken(darkThemeColors.onSecondaryFixed, 0.25),
      },
    }),
    secondaryFixedDim: theme.palette.augmentColor({
      color: {
        main: darkThemeColors.secondaryFixedDim,
        high: lighten(darkThemeColors.secondaryFixedDim, 0.1),
        low: darken(darkThemeColors.secondaryFixedDim, 0.1),
      },
    }),
    tertiaryFixed: theme.palette.augmentColor({
      color: {
        main: darkThemeColors.tertiaryFixed,
        contrastText: darkThemeColors.onTertiaryFixed,
        high: lighten(darkThemeColors.tertiaryFixed, 0.1),
        low: darken(darkThemeColors.tertiaryFixed, 0.1),
      },
    }),
    onTertiaryFixed: theme.palette.augmentColor({
      color: {
        main: darkThemeColors.onTertiaryFixed,
        high: lighten(darkThemeColors.onTertiaryFixed, 0.2),
        low: darken(darkThemeColors.onTertiaryFixed, 0.25),
      },
    }),
    tertiaryFixedDim: theme.palette.augmentColor({
      color: {
        main: darkThemeColors.tertiaryFixedDim,
        high: lighten(darkThemeColors.tertiaryFixedDim, 0.1),
        low: darken(darkThemeColors.tertiaryFixedDim, 0.1),
      },
    }),
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: `
        body { color: ${darkThemeColors.surface.on}; }
        .material-symbol { color: inherit; }
        *::-webkit-scrollbar { width: 14px; }
        *::-webkit-scrollbar-track {
          border: 1px solid ${darkThemeColors.background};
          background-color: ${darkThemeColors.background};
        }
        *::-webkit-scrollbar-thumb {
          border: 4px solid ${darkThemeColors.background};
          background-color: ${lighten(darkThemeColors.surfaceContainer.main, 0.1)};
          border-radius: 10px;
        }
        *::-webkit-scrollbar-thumb:hover { 
          background-color: ${lighten(darkThemeColors.surfaceContainer.main, 0.25)}; 
        }
      `,
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: ({ theme }: { theme: Theme }) => ({
          color: theme.palette.text.secondary,
        }),
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: darkThemeColors.surfaceContainer.main,
          color: darkThemeColors.surface.on,
          borderColor: darkThemeColors.outline,
        },
      },
    },
  },
});

themeLight = responsiveFontSizes(themeLight);
themeDark = responsiveFontSizes(themeDark);
