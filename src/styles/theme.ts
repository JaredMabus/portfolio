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
  outline: neutralVariant.nv90,
  border: neutral.n50,
  inverseOnSurface: neutral.n95,
  inverseSurface: neutral.n20,

  surfaceDim: neutral.n90,
  surfaceBright: neutral.n98,
  surfaceContainerLowest: neutral.n100,
  surfaceContainerLow: neutral.n95,
  surfaceContainer: neutral.n95,
  surfaceContainerHigh: neutral.n80,
  surfaceContainerHighest: neutral.n80,
};

const darkThemeColors = {
  primary: "#78E3B1",
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

declare module "@mui/material/styles" {
  // What you read at runtime: theme.palette.<key>.main
  interface Palette {
    // 1) Chromatic containers (primary/secondary/tertiary/error)
    primaryContainer: Palette["primary"];
    onPrimaryContainer: Palette["primary"];
    secondaryContainer: Palette["primary"];
    onSecondaryContainer: Palette["primary"];
    tertiaryContainer: Palette["primary"];
    onTertiaryContainer: Palette["primary"];
    errorContainer: Palette["primary"];
    onErrorContainer: Palette["primary"];

    // 2) Fixed brand set
    primaryFixed: Palette["primary"];
    onPrimaryFixed: Palette["primary"];
    primaryFixedDim: Palette["primary"];
    onPrimaryFixedVariant: Palette["primary"];
    secondaryFixed: Palette["primary"];
    onSecondaryFixed: Palette["primary"];
    secondaryFixedDim: Palette["primary"];
    onSecondaryFixedVariant: Palette["primary"];
    tertiaryFixed: Palette["primary"];
    onTertiaryFixed: Palette["primary"];
    tertiaryFixedDim: Palette["primary"];
    onTertiaryFixedVariant: Palette["primary"];

    // 3) Neutrals & roles (do NOT redeclare `background`)
    onBackground: Palette["primary"]; // new token is OK
    surface: Palette["primary"];
    onSurface: Palette["primary"];
    surfaceVariant: Palette["primary"];
    onSurfaceVariant: Palette["primary"];
    outline: Palette["primary"];
    border: Palette["primary"];
    inverseOnSurface: Palette["primary"];
    inverseSurface: Palette["primary"];

    // 4) Surface containers
    surfaceDim: Palette["primary"];
    surfaceBright: Palette["primary"];
    surfaceContainerLowest: Palette["primary"];
    surfaceContainerLow: Palette["primary"];
    surfaceContainer: Palette["primary"];
    surfaceContainerHigh: Palette["primary"];
    surfaceContainerHighest: Palette["primary"];
  }

  // What you pass into createTheme: createTheme({ palette: { ... } })
  interface PaletteOptions {
    // 1) Chromatic containers
    primaryContainer?: PaletteOptions["primary"];
    onPrimaryContainer?: PaletteOptions["primary"];
    secondaryContainer?: PaletteOptions["primary"];
    onSecondaryContainer?: PaletteOptions["primary"];
    tertiaryContainer?: PaletteOptions["primary"];
    onTertiaryContainer?: PaletteOptions["primary"];
    errorContainer?: PaletteOptions["primary"];
    onErrorContainer?: PaletteOptions["primary"];

    // 2) Fixed brand set
    primaryFixed?: PaletteOptions["primary"];
    onPrimaryFixed?: PaletteOptions["primary"];
    primaryFixedDim?: PaletteOptions["primary"];
    onPrimaryFixedVariant?: PaletteOptions["primary"];
    secondaryFixed?: PaletteOptions["primary"];
    onSecondaryFixed?: PaletteOptions["primary"];
    secondaryFixedDim?: PaletteOptions["primary"];
    onSecondaryFixedVariant?: PaletteOptions["primary"];
    tertiaryFixed?: PaletteOptions["primary"];
    onTertiaryFixed?: PaletteOptions["primary"];
    tertiaryFixedDim?: PaletteOptions["primary"];
    onTertiaryFixedVariant?: PaletteOptions["primary"];

    // 3) Neutrals & roles (do NOT redeclare `background`)
    onBackground?: PaletteOptions["primary"]; // new token is OK
    surface?: PaletteOptions["primary"];
    onSurface?: PaletteOptions["primary"];
    surfaceVariant?: PaletteOptions["primary"];
    onSurfaceVariant?: PaletteOptions["primary"];
    outline?: PaletteOptions["primary"];
    border?: PaletteOptions["primary"];
    inverseOnSurface?: PaletteOptions["primary"];
    inverseSurface?: PaletteOptions["primary"];

    // 4) Surface containers
    surfaceDim?: PaletteOptions["primary"];
    surfaceBright?: PaletteOptions["primary"];
    surfaceContainerLowest?: PaletteOptions["primary"];
    surfaceContainerLow?: PaletteOptions["primary"];
    surfaceContainer?: PaletteOptions["primary"];
    surfaceContainerHigh?: PaletteOptions["primary"];
    surfaceContainerHighest?: PaletteOptions["primary"];
  }

  // Keep your small extension for augmentColor convenience (optional)
  interface SimplePaletteColorOptions {
    container?: string;
    onContainer?: string;
  }
}

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
    button: { fontWeight: 600, textTransform: "none" },
  },
  breakpoints: { values: { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536 } },
  shape: { borderRadius: 4 },
});

export let themeLight = createTheme(theme, {
  palette: {
    mode: "light",
    primary: {
      main: lightThemeColors.primary,
      light: lighten(lightThemeColors.primary, 0.2),
      dark: darken(lightThemeColors.primary, 0.15),
      contrastText: lightThemeColors.onPrimary,
    },
    secondary: {
      main: lightThemeColors.secondary,
      light: lighten(lightThemeColors.secondary, 0.2),
      dark: darken(lightThemeColors.secondary, 0.15),
      contrastText: lightThemeColors.onSecondary,
    },
    tertiary: {
      main: lightThemeColors.tertiary,
      light: lighten(lightThemeColors.tertiary, 0.2),
      dark: darken(lightThemeColors.tertiary, 0.15),
      contrastText: lightThemeColors.onTertiary,
    },
    error: {
      main: lightThemeColors.error,
      light: lighten(lightThemeColors.error, 0.2),
      dark: darken(lightThemeColors.error, 0.15),
      contrastText: lightThemeColors.onError,
    },
    primaryContainer: theme.palette.augmentColor({
      color: {
        main: lightThemeColors.primaryContainer,
        contrastText: lightThemeColors.onPrimaryContainer,
      },
    }),
    secondaryContainer: theme.palette.augmentColor({
      color: {
        main: lightThemeColors.secondaryContainer,
        contrastText: lightThemeColors.onSecondaryContainer,
      },
    }),
    tertiaryContainer: theme.palette.augmentColor({
      color: {
        main: lightThemeColors.tertiaryContainer,
        contrastText: lightThemeColors.onTertiaryContainer,
      },
    }),
    errorContainer: theme.palette.augmentColor({
      color: {
        main: lightThemeColors.errorContainer,
        contrastText: lightThemeColors.onErrorContainer,
      },
    }),
    text: {
      primary: lightThemeColors.onBackground,
      secondary: lightThemeColors.onSurfaceVariant,
      disabled: alpha(lightThemeColors.onBackground, 0.4),
    },
    outline: theme.palette.augmentColor({
      color: {
        main: lightThemeColors.outline,
        light: lighten(lightThemeColors.outline, 0.85),
        dark: darken(lightThemeColors.outline, 1),
      },
    }),
    border: theme.palette.augmentColor({
      color: {
        main: lightThemeColors.border,
        light: lighten(lightThemeColors.border, 0.7),
        dark: darken(lightThemeColors.border, 0.15),
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
      },
    }),
    onSurface: theme.palette.augmentColor({
      color: { main: lightThemeColors.onSurface },
    }),
    surfaceVariant: theme.palette.augmentColor({
      color: {
        main: lightThemeColors.surfaceVariant,
        contrastText: lightThemeColors.onSurfaceVariant,
      },
    }),
    onSurfaceVariant: theme.palette.augmentColor({
      color: { main: lightThemeColors.onSurfaceVariant },
    }),
    inverseOnSurface: theme.palette.augmentColor({
      color: { main: lightThemeColors.inverseOnSurface },
    }),
    inverseSurface: theme.palette.augmentColor({
      color: { main: lightThemeColors.inverseSurface },
    }),
    surfaceDim: theme.palette.augmentColor({
      color: { main: lightThemeColors.surfaceDim },
    }),
    surfaceBright: theme.palette.augmentColor({
      color: { main: lightThemeColors.surfaceBright },
    }),
    surfaceContainerLowest: theme.palette.augmentColor({
      color: { main: lightThemeColors.surfaceContainerLowest },
    }),
    surfaceContainerLow: theme.palette.augmentColor({
      color: { main: lightThemeColors.surfaceContainerLow },
    }),
    surfaceContainer: theme.palette.augmentColor({
      color: {
        main: lightThemeColors.surfaceContainer,
        light: lighten(lightThemeColors.surfaceContainer, 0.5),
        dark: darken(lightThemeColors.surfaceContainer, 0.02),
        contrastText: lightThemeColors.onSurface,
      },
    }),
    surfaceContainerHigh: theme.palette.augmentColor({
      color: { main: lightThemeColors.surfaceContainerHigh },
    }),
    surfaceContainerHighest: theme.palette.augmentColor({
      color: { main: lightThemeColors.surfaceContainerHighest },
    }),
    primaryFixed: theme.palette.augmentColor({
      color: {
        main: lightThemeColors.primaryFixed,
        contrastText: lightThemeColors.onPrimaryFixed,
      },
    }),
    onPrimaryFixed: theme.palette.augmentColor({
      color: { main: lightThemeColors.onPrimaryFixed },
    }),
    primaryFixedDim: theme.palette.augmentColor({
      color: { main: lightThemeColors.primaryFixedDim },
    }),
    secondaryFixed: theme.palette.augmentColor({
      color: {
        main: lightThemeColors.secondaryFixed,
        contrastText: lightThemeColors.onSecondaryFixed,
      },
    }),
    onSecondaryFixed: theme.palette.augmentColor({
      color: { main: lightThemeColors.onSecondaryFixed },
    }),
    secondaryFixedDim: theme.palette.augmentColor({
      color: { main: lightThemeColors.secondaryFixedDim },
    }),
    tertiaryFixed: theme.palette.augmentColor({
      color: {
        main: lightThemeColors.tertiaryFixed,
        contrastText: lightThemeColors.onTertiaryFixed,
      },
    }),
    onTertiaryFixed: theme.palette.augmentColor({
      color: { main: lightThemeColors.onTertiaryFixed },
    }),
    tertiaryFixedDim: theme.palette.augmentColor({
      color: { main: lightThemeColors.tertiaryFixedDim },
    }),
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        *::-webkit-scrollbar { width: 14px; }
        *::-webkit-scrollbar-track {
          border: 1px solid ${lightThemeColors.surfaceBright};
          background-color: ${lightThemeColors.background};
        }
        *::-webkit-scrollbar-thumb {
          border: 2px solid ${lightThemeColors.background};
          background-color: ${darken(lightThemeColors.surfaceDim, 0.1)};
          border-radius: 10px;
        }
        *::-webkit-scrollbar-thumb:hover { 
        background-color: ${darken(lightThemeColors.surfaceDim, 0.05)}; }
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
    MuiTooltip: {
      defaultProps: {
        slotProps: {
          popper: {
            modifiers: [{ name: "offset", options: { offset: [0, 8] } }],
          },
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
    },
    secondary: {
      main: darkThemeColors.secondary,
      light: lighten(darkThemeColors.secondary, 0.2),
      dark: darken(darkThemeColors.secondary, 0.15),
      contrastText: darkThemeColors.onSecondary,
    },
    tertiary: {
      main: darkThemeColors.tertiary,
      light: lighten(darkThemeColors.tertiary, 0.2),
      dark: darken(darkThemeColors.tertiary, 0.15),
      contrastText: darkThemeColors.onTertiary,
    },
    error: {
      main: darkThemeColors.error,
      light: lighten(darkThemeColors.error, 0.2),
      dark: darken(darkThemeColors.error, 0.15),
      contrastText: darkThemeColors.onError,
    },
    primaryContainer: theme.palette.augmentColor({
      color: {
        main: darkThemeColors.primaryContainer,
        contrastText: darkThemeColors.onPrimaryContainer,
      },
    }),
    secondaryContainer: theme.palette.augmentColor({
      color: {
        main: darkThemeColors.secondaryContainer,
        contrastText: darkThemeColors.onSecondaryContainer,
      },
    }),
    tertiaryContainer: theme.palette.augmentColor({
      color: {
        main: darkThemeColors.tertiaryContainer,
        contrastText: darkThemeColors.onTertiaryContainer,
      },
    }),
    errorContainer: theme.palette.augmentColor({
      color: {
        main: darkThemeColors.errorContainer,
        contrastText: darkThemeColors.onErrorContainer,
      },
    }),
    text: {
      primary: darkThemeColors.onBackground,
      secondary: darkThemeColors.onSurfaceVariant,
      disabled: alpha(darkThemeColors.onBackground, 0.4),
    },
    outline: theme.palette.augmentColor({
      color: {
        main: darkThemeColors.outline,
        light: darken(darkThemeColors.outline, 0.3),
        dark: lighten(darkThemeColors.outline, 0.4),
      },
    }),
    border: theme.palette.augmentColor({
      color: {
        main: darkThemeColors.border,
        light: darken(darkThemeColors.border, 0.5),
        dark: lighten(darkThemeColors.border, 0.5),
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
      },
    }),
    onSurface: theme.palette.augmentColor({
      color: { main: darkThemeColors.onSurface },
    }),
    surfaceVariant: theme.palette.augmentColor({
      color: {
        main: darkThemeColors.surfaceVariant,
        contrastText: darkThemeColors.onSurfaceVariant,
      },
    }),
    onSurfaceVariant: theme.palette.augmentColor({
      color: { main: darkThemeColors.onSurfaceVariant },
    }),
    inverseOnSurface: theme.palette.augmentColor({
      color: { main: darkThemeColors.inverseOnSurface },
    }),
    inverseSurface: theme.palette.augmentColor({
      color: { main: darkThemeColors.inverseSurface },
    }),
    surfaceDim: theme.palette.augmentColor({
      color: { main: darkThemeColors.surfaceDim },
    }),
    surfaceBright: theme.palette.augmentColor({
      color: { main: darkThemeColors.surfaceBright },
    }),
    surfaceContainerLowest: theme.palette.augmentColor({
      color: { main: darkThemeColors.surfaceContainerLowest },
    }),
    surfaceContainerLow: theme.palette.augmentColor({
      color: { main: darkThemeColors.surfaceContainerLow },
    }),
    surfaceContainer: theme.palette.augmentColor({
      color: {
        main: darkThemeColors.surfaceContainer,
        light: lighten(darkThemeColors.surfaceContainer, 0.03),
        dark: lighten(darkThemeColors.surfaceContainer, 0.01),
        contrastText: darkThemeColors.onSurface,
      },
    }),
    surfaceContainerHigh: theme.palette.augmentColor({
      color: { main: darkThemeColors.surfaceContainerHigh },
    }),
    surfaceContainerHighest: theme.palette.augmentColor({
      color: { main: darkThemeColors.surfaceContainerHighest },
    }),
    primaryFixed: theme.palette.augmentColor({
      color: {
        main: darkThemeColors.primaryFixed,
        contrastText: darkThemeColors.onPrimaryFixed,
      },
    }),
    onPrimaryFixed: theme.palette.augmentColor({
      color: { main: darkThemeColors.onPrimaryFixed },
    }),
    primaryFixedDim: theme.palette.augmentColor({
      color: { main: darkThemeColors.primaryFixedDim },
    }),
    secondaryFixed: theme.palette.augmentColor({
      color: {
        main: darkThemeColors.secondaryFixed,
        contrastText: darkThemeColors.onSecondaryFixed,
      },
    }),
    onSecondaryFixed: theme.palette.augmentColor({
      color: { main: darkThemeColors.onSecondaryFixed },
    }),
    secondaryFixedDim: theme.palette.augmentColor({
      color: { main: darkThemeColors.secondaryFixedDim },
    }),
    tertiaryFixed: theme.palette.augmentColor({
      color: {
        main: darkThemeColors.tertiaryFixed,
        contrastText: darkThemeColors.onTertiaryFixed,
      },
    }),
    onTertiaryFixed: theme.palette.augmentColor({
      color: { main: darkThemeColors.onTertiaryFixed },
    }),
    tertiaryFixedDim: theme.palette.augmentColor({
      color: { main: darkThemeColors.tertiaryFixedDim },
    }),
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        *::-webkit-scrollbar { width: 14px; }
        *::-webkit-scrollbar-track {
          border: 1px solid ${darkThemeColors.surfaceContainerHighest};
          background-color: ${darkThemeColors.background};
        }
        *::-webkit-scrollbar-thumb {
          border: 2px solid ${darkThemeColors.background};
          background-color: ${lighten(
            darkThemeColors.surfaceContainerHighest,
            0.1
          )};
          border-radius: 10px;
        }
        *::-webkit-scrollbar-thumb:hover { 
        background-color: ${themeLight.palette.background.default}; }
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
    MuiTooltip: {
      defaultProps: {
        slotProps: {
          popper: {
            modifiers: [{ name: "offset", options: { offset: [0, 8] } }],
          },
        },
      },
    },
  },
});

themeLight = responsiveFontSizes(themeLight);
themeDark = responsiveFontSizes(themeDark);
