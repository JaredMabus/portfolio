import {
  alpha,
  createTheme,
  darken,
  lighten,
  responsiveFontSizes,
  Theme,
} from "@mui/material/styles";
import { red } from "@mui/material/colors";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";

// Neutral used for surfaces/backgrounds/text
export const neutral = {
  n0: "#000000",
  n10: "#1C1B1F",
  n20: "#313033",
  n30: "#484649",
  n40: "#605D62",
  n50: "#79767D",
  n60: "#939097",
  n70: "#AEAAAF",
  n80: "#C9C5CD",
  n90: "#E6E1E5",
  n95: "#F4EFF4",
  n98: "#FDF8FD",
  n99: "#FFFBFE",
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

export const fixedColors = {
  primaryFixed: "#A2EBC8",
  onPrimaryFixed: "#21262E",
  primaryFixedDim: "#58B488",
  onPrimaryFixedVariant: "#58B488",

  secondaryFixed: "#eeee",
  onSecondaryFixed: "#21262E",
  secondaryFixedDim: "#C1C1C1",
  onSecondaryFixedVariant: "#C1C1C1",

  tertiaryFixed: "#E5E5E5",
  onTertiaryFixed: "#0D1117",
  tertiaryFixedDim: "#30353D",
  onTertiaryFixedVariant: "#21262E",
} as const satisfies Record<FixedColorKeys, string>;

const lightThemeColors = {
  primary: "#58B488",
  onPrimary: "#FFFFFF",
  primaryContainer: "#A2EBC8",
  onPrimaryContainer: "#21262E",

  secondary: "#EFF3F7",
  onSecondary: "#21262E",
  secondaryContainer: "#eeee",
  onSecondaryContainer: "#21262E",

  tertiary: "#C1C1C1",
  onTertiary: "#21262E",
  tertiaryContainer: "#E5E5E5",
  onTertiaryContainer: "#0D1117",

  error: red[500],
  onError: "#FFFFFF",
  errorContainer: red[50],
  onErrorContainer: red[900],

  ...fixedColors,

  // Neutral palette
  background: neutral.n100,
  onBackground: neutral.n10,
  surface: neutral.n99,
  onSurface: neutral.n10,
  surfaceVariant: neutralVariant.nv90,
  onSurfaceVariant: neutralVariant.nv30,
  outline: neutralVariant.nv80,
  border: neutral.n70,
  inverseOnSurface: neutral.n95,
  inverseSurface: neutral.n20,

  surfaceDim: neutral.n80,
  surfaceBright: neutral.n98,
  surfaceContainerLowest: neutral.n100,
  surfaceContainerLow: neutral.n95,
  surfaceContainer: neutral.n99,
  surfaceContainerHigh: neutral.n80,
  surfaceContainerHighest: neutral.n80,
};

const darkThemeColors = {
  primary: "#58B488",
  onPrimary: "#000000",
  primaryContainer: "#58B488",
  onPrimaryContainer: "#A2EBC8",

  secondary: "#21262E",
  onSecondary: "#FFFFFF",
  secondaryContainer: "#30353D",
  onSecondaryContainer: "#E5E5E5",

  tertiary: "#0D1117",
  onTertiary: "#FFFFFF",
  tertiaryContainer: "#21262E",
  onTertiaryContainer: "#E5E5E5",

  error: red[200],
  onError: "#000000",
  errorContainer: red[700],
  onErrorContainer: red[50],

  ...fixedColors,

  // Neutral palette
  background: neutral.n0,
  onBackground: neutral.n90,
  surface: neutral.n10,
  onSurface: neutral.n90,
  surfaceVariant: neutralVariant.nv30,
  onSurfaceVariant: neutralVariant.nv80,
  outline: neutralVariant.nv30,
  border: neutral.n40,
  inverseOnSurface: neutral.n10,
  inverseSurface: neutral.n90,

  surfaceDim: neutral.n10,
  surfaceBright: neutralVariant.nv20,
  surfaceContainerLowest: neutral.n0,
  surfaceContainerLow: neutral.n10,
  surfaceContainer: neutral.n20,
  surfaceContainerHigh: neutralVariant.nv20,
  surfaceContainerHighest: neutral.n20,
};

export const GlobalStyle = {
  "*": { padding: 0, margin: 0, boxSizing: "border-box" },
  html: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
  },
  body: { height: "100%", minHeight: "100vh", width: "100%" },
  "#root": { height: "100%", width: "100%" },
  a: { textDecoration: "none !important" },
  code: {
    fontFamily:
      'source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace',
  },
};

let theme = createTheme({
  typography: {
    fontFamily: ["Montserrat", "sans-serif"].join(","),
    // DISPLAY
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
      lineHeight: 1.4286,
      letterSpacing: "0.007143em",
      fontWeight: 500,
      textTransform: "none",
    },
    caption: {
      fontSize: 12,
      lineHeight: 1.3333,
      letterSpacing: "0.041667em",
      fontWeight: 500,
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
          h3: "h2",
          h4: "h3",
          h5: "h4",
          h6: "h5",
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
    },
  },
});

export let themeLight = createTheme(theme, {
  palette: {
    mode: "light",

    primary: {
      main: lightThemeColors.primary,
      light: lighten(lightThemeColors.primary, 0.2),
      dark: darken(lightThemeColors.primary, 0.15),
      contrastText: lightThemeColors.onPrimary,
      high: darken(lightThemeColors.primary, 0.12),
      low: lighten(lightThemeColors.primary, 0.12),
    },
    secondary: {
      main: lightThemeColors.secondary,
      light: lighten(lightThemeColors.secondary, 0.2),
      dark: darken(lightThemeColors.secondary, 0.15),
      contrastText: lightThemeColors.onSecondary,
      high: darken(lightThemeColors.secondary, 0.12),
      low: lighten(lightThemeColors.secondary, 0.12),
    },
    tertiary: {
      main: lightThemeColors.tertiary,
      light: lighten(lightThemeColors.tertiary, 0.2),
      dark: darken(lightThemeColors.tertiary, 0.15),
      contrastText: lightThemeColors.onTertiary,
      high: darken(lightThemeColors.tertiary, 0.12),
      low: lighten(lightThemeColors.tertiary, 0.12),
    },
    error: {
      main: lightThemeColors.error,
      light: lighten(lightThemeColors.error, 0.2),
      dark: darken(lightThemeColors.error, 0.15),
      contrastText: lightThemeColors.onError,
      high: darken(lightThemeColors.error, 0.12),
      low: lighten(lightThemeColors.error, 0.12),
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
        contrastText: lightThemeColors.onErrorContainer,
        high: darken(lightThemeColors.errorContainer, 0.1),
        low: lighten(lightThemeColors.errorContainer, 0.1),
      },
    }),

    text: {
      primary: lightThemeColors.onBackground,
      secondary: lighten(lightThemeColors.onBackground, 0.2),
      disabled: alpha(lightThemeColors.onBackground, 0.4),
    },

    // expose onBackground as PaletteColor for high/low usage
    onBackground: theme.palette.augmentColor({
      color: {
        main: lightThemeColors.onBackground,
        high: darken(lightThemeColors.onBackground, 0.2),
        low: lighten(lightThemeColors.onBackground, 0.4),
      },
    }),

    outline: theme.palette.augmentColor({
      color: {
        main: lightThemeColors.outline,
        light: darken(lightThemeColors.outline, 0.1),
        dark: lighten(lightThemeColors.outline, 0.5),
        high: darken(lightThemeColors.outline, 0.2),
        low: lighten(lightThemeColors.outline, 0.5),
      },
    }),
    border: theme.palette.augmentColor({
      color: {
        main: lightThemeColors.border,
        light: lighten(lightThemeColors.border, 0.8),
        dark: darken(lightThemeColors.border, 0.15),
        high: darken(lightThemeColors.border, 0.2),
        low: lighten(lightThemeColors.border, 0.7),
      },
    }),

    background: {
      default: lightThemeColors.background,
      paper: lightThemeColors.surface,
    },

    surface: theme.palette.augmentColor({
      color: {
        main: lightThemeColors.surface,
        light: lighten(lightThemeColors.surface, 0.05),
        dark: darken(lightThemeColors.surface, 0.05),
        contrastText: lightThemeColors.onSurface,
        high: darken(lightThemeColors.surface, 0.06),
        low: lighten(lightThemeColors.surface, 0.06),
      },
    }),
    onSurface: theme.palette.augmentColor({
      color: {
        main: lightThemeColors.onSurface,
        high: darken(lightThemeColors.onSurface, 0.2),
        low: lighten(lightThemeColors.onSurface, 0.4),
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
    inverseSurface: theme.palette.augmentColor({
      color: {
        main: lightThemeColors.inverseSurface,
        high: darken(lightThemeColors.inverseSurface, 0.06),
        low: lighten(lightThemeColors.inverseSurface, 0.06),
      },
    }),
    inverseOnSurface: theme.palette.augmentColor({
      color: {
        main: lightThemeColors.inverseOnSurface,
        high: darken(lightThemeColors.inverseOnSurface, 0.2),
        low: lighten(lightThemeColors.inverseOnSurface, 0.35),
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
    surfaceContainerLowest: theme.palette.augmentColor({
      color: {
        main: lightThemeColors.surfaceContainerLowest,
        high: darken(lightThemeColors.surfaceContainerLowest, 0.06),
        low: lighten(lightThemeColors.surfaceContainerLowest, 0.06),
      },
    }),
    surfaceContainerLow: theme.palette.augmentColor({
      color: {
        main: lightThemeColors.surfaceContainerLow,
        high: darken(lightThemeColors.surfaceContainerLow, 0.06),
        low: lighten(lightThemeColors.surfaceContainerLow, 0.06),
      },
    }),
    surfaceContainer: theme.palette.augmentColor({
      color: {
        main: lightThemeColors.surfaceContainer,
        light: lighten(lightThemeColors.surfaceContainer, 0.5),
        dark: darken(lightThemeColors.surfaceContainer, 0.02),
        contrastText: lightThemeColors.onSurface,
        high: darken(lightThemeColors.surfaceContainer, 0.06),
        low: lighten(lightThemeColors.surfaceContainer, 0.06),
      },
    }),
    surfaceContainerHigh: theme.palette.augmentColor({
      color: {
        main: lightThemeColors.surfaceContainerHigh,
        high: darken(lightThemeColors.surfaceContainerHigh, 0.06),
        low: lighten(lightThemeColors.surfaceContainerHigh, 0.06),
      },
    }),
    surfaceContainerHighest: theme.palette.augmentColor({
      color: {
        main: lightThemeColors.surfaceContainerHighest,
        high: darken(lightThemeColors.surfaceContainerHighest, 0.06),
        low: lighten(lightThemeColors.surfaceContainerHighest, 0.06),
      },
    }),

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
        *::-webkit-scrollbar { width: 14px; }
        *::-webkit-scrollbar-track {
          border: 1px solid ${lightThemeColors.background};
          background-color: ${lightThemeColors.background};
        }
        *::-webkit-scrollbar-thumb {
          border: 2px solid ${lightThemeColors.background};
          background-color: ${darken(lightThemeColors.surfaceContainer, 0.25)};
          border-radius: 10px;
        }
        *::-webkit-scrollbar-thumb:hover { 
        background-color: ${darken(lightThemeColors.surfaceDim, 0.25)}; }
      `,
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& label": {
            color: lightThemeColors.onSurface,
          },
          "& label.Mui-focused": {
            color: lightThemeColors.onSurface,
          },
          "& .MuiInput-underline:after": {
            borderBottomColor: lightThemeColors.onSurface,
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
          backgroundColor: lightThemeColors.surfaceContainer,
          color: lightThemeColors.onSurface,
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
      main: darkThemeColors.primary,
      light: lighten(darkThemeColors.primary, 0.2),
      dark: darken(darkThemeColors.primary, 0.15),
      contrastText: darkThemeColors.onPrimary,
      high: lighten(darkThemeColors.primary, 0.12),
      low: darken(darkThemeColors.primary, 0.12),
    },
    secondary: {
      main: darkThemeColors.secondary,
      light: lighten(darkThemeColors.secondary, 0.2),
      dark: darken(darkThemeColors.secondary, 0.15),
      contrastText: darkThemeColors.onSecondary,
      high: lighten(darkThemeColors.secondary, 0.12),
      low: darken(darkThemeColors.secondary, 0.12),
    },
    tertiary: {
      main: darkThemeColors.tertiary,
      light: lighten(darkThemeColors.tertiary, 0.2),
      dark: darken(darkThemeColors.tertiary, 0.15),
      contrastText: darkThemeColors.onTertiary,
      high: lighten(darkThemeColors.tertiary, 0.12),
      low: darken(darkThemeColors.tertiary, 0.12),
    },
    error: {
      main: darkThemeColors.error,
      light: lighten(darkThemeColors.error, 0.2),
      dark: darken(darkThemeColors.error, 0.15),
      contrastText: darkThemeColors.onError,
      high: lighten(darkThemeColors.error, 0.12),
      low: darken(darkThemeColors.error, 0.12),
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
        contrastText: darkThemeColors.onErrorContainer,
        high: lighten(darkThemeColors.errorContainer, 0.1),
        low: darken(darkThemeColors.errorContainer, 0.1),
      },
    }),

    text: {
      primary: darkThemeColors.onBackground,
      secondary: darken(darkThemeColors.onBackground, 0.15),
      disabled: alpha(darkThemeColors.onBackground, 0.4),
    },

    // expose onBackground as PaletteColor for high/low usage
    onBackground: theme.palette.augmentColor({
      color: {
        main: darkThemeColors.onBackground,
        high: lighten(darkThemeColors.onBackground, 0.2),
        low: darken(darkThemeColors.onBackground, 0.25),
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
        low: darken(darkThemeColors.border, 0.3),
      },
    }),

    background: {
      default: darkThemeColors.background,
      paper: darkThemeColors.surface,
    },

    surface: theme.palette.augmentColor({
      color: {
        main: darkThemeColors.surface,
        light: lighten(darkThemeColors.surface, 0.2),
        dark: darken(darkThemeColors.surface, 0.05),
        contrastText: darkThemeColors.onSurface,
        high: lighten(darkThemeColors.surface, 0.08),
        low: darken(darkThemeColors.surface, 0.08),
      },
    }),
    onSurface: theme.palette.augmentColor({
      color: {
        main: darkThemeColors.onSurface,
        high: lighten(darkThemeColors.onSurface, 0.2),
        low: darken(darkThemeColors.onSurface, 0.25),
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
    inverseSurface: theme.palette.augmentColor({
      color: {
        main: darkThemeColors.inverseSurface,
        high: lighten(darkThemeColors.inverseSurface, 0.08),
        low: darken(darkThemeColors.inverseSurface, 0.08),
      },
    }),
    inverseOnSurface: theme.palette.augmentColor({
      color: {
        main: darkThemeColors.inverseOnSurface,
        high: lighten(darkThemeColors.inverseOnSurface, 0.2),
        low: darken(darkThemeColors.inverseOnSurface, 0.25),
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
    surfaceContainerLowest: theme.palette.augmentColor({
      color: {
        main: darkThemeColors.surfaceContainerLowest,
        high: lighten(darkThemeColors.surfaceContainerLowest, 0.08),
        low: darken(darkThemeColors.surfaceContainerLowest, 0.08),
      },
    }),
    surfaceContainerLow: theme.palette.augmentColor({
      color: {
        main: darkThemeColors.surfaceContainerLow,
        high: lighten(darkThemeColors.surfaceContainerLow, 0.08),
        low: darken(darkThemeColors.surfaceContainerLow, 0.08),
      },
    }),
    surfaceContainer: theme.palette.augmentColor({
      color: {
        main: darkThemeColors.surfaceContainer,
        light: lighten(darkThemeColors.surfaceContainer, 0.03),
        dark: lighten(darkThemeColors.surfaceContainer, 0.01),
        contrastText: darkThemeColors.onSurface,
        high: lighten(darkThemeColors.surfaceContainer, 0.08),
        low: darken(darkThemeColors.surfaceContainer, 0.08),
      },
    }),
    surfaceContainerHigh: theme.palette.augmentColor({
      color: {
        main: darkThemeColors.surfaceContainerHigh,
        high: lighten(darkThemeColors.surfaceContainerHigh, 0.08),
        low: darken(darkThemeColors.surfaceContainerHigh, 0.08),
      },
    }),
    surfaceContainerHighest: theme.palette.augmentColor({
      color: {
        main: darkThemeColors.surfaceContainerHighest,
        high: lighten(darkThemeColors.surfaceContainerHighest, 0.08),
        low: darken(darkThemeColors.surfaceContainerHighest, 0.08),
      },
    }),

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
        *::-webkit-scrollbar { width: 14px; }
        *::-webkit-scrollbar-track {
          border: 1px solid ${darkThemeColors.background};
          background-color: ${darkThemeColors.background};
        }
        *::-webkit-scrollbar-thumb {
          border: 2px solid ${darkThemeColors.background};
          background-color: ${lighten(darkThemeColors.surfaceContainer, 0.1)};
          border-radius: 10px;
        }
        *::-webkit-scrollbar-thumb:hover { 
        background-color: ${lighten(darkThemeColors.surfaceContainer, 0.25)}; }
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
          backgroundColor: darkThemeColors.surfaceContainer,
          color: darkThemeColors.onSurface,
          borderColor: darkThemeColors.outline,
        },
      },
    },
  },
});

themeLight = responsiveFontSizes(themeLight);
themeDark = responsiveFontSizes(themeDark);
