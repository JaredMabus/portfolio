// src/types/mui-palette.d.ts
import type {} from "@mui/material/styles"; // ensures module is resolvable

declare module "@mui/material/styles" {
  // What you read at runtime: theme.palette.<key>.main
  interface Palette {
    // Standard + your custom chromatic containers
    tertiary: PaletteColor;
    primaryContainer: Palette["primary"];
    onPrimaryContainer: Palette["primary"];
    secondaryContainer: Palette["primary"];
    onSecondaryContainer: Palette["primary"];
    tertiaryContainer: Palette["primary"];
    onTertiaryContainer: Palette["primary"];
    errorContainer: Palette["primary"];
    onErrorContainer: Palette["primary"];

    // Fixed brand set
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

    // Neutrals & roles
    onBackground: Palette["primary"];
    surface: Palette["primary"];
    onSurface: Palette["primary"];
    surfaceVariant: Palette["primary"];
    onSurfaceVariant: Palette["primary"];
    outline: Palette["primary"];
    border: Palette["primary"];
    inverseOnSurface: Palette["primary"];
    inverseSurface: Palette["primary"];

    // Surface containers
    surfaceDim: Palette["primary"];
    surfaceBright: Palette["primary"];
    surfaceContainerLowest: Palette["primary"];
    surfaceContainerLow: Palette["primary"];
    surfaceContainer: Palette["primary"];
    surfaceContainerHigh: Palette["primary"];
    surfaceContainerHighest: Palette["primary"];
  }

  // What you pass into createTheme({ palette: { ... } })
  interface PaletteOptions {
    // Standard + your custom chromatic containers
    tertiary?: PaletteOptions["primary"];

    primaryContainer?: PaletteOptions["primary"];
    onPrimaryContainer?: PaletteOptions["primary"];
    secondaryContainer?: PaletteOptions["primary"];
    onSecondaryContainer?: PaletteOptions["primary"];
    tertiaryContainer?: PaletteOptions["primary"];
    onTertiaryContainer?: PaletteOptions["primary"];
    errorContainer?: PaletteOptions["primary"];
    onErrorContainer?: PaletteOptions["primary"];

    // Fixed brand set
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

    // Neutrals & roles
    onBackground?: PaletteOptions["primary"];
    surface?: PaletteOptions["primary"];
    onSurface?: PaletteOptions["primary"];
    surfaceVariant?: PaletteOptions["primary"];
    onSurfaceVariant?: PaletteOptions["primary"];
    outline?: PaletteOptions["primary"];
    border?: PaletteOptions["primary"];
    inverseOnSurface?: PaletteOptions["primary"];
    inverseSurface?: PaletteOptions["primary"];

    // Surface containers
    surfaceDim?: PaletteOptions["primary"];
    surfaceBright?: PaletteOptions["primary"];
    surfaceContainerLowest?: PaletteOptions["primary"];
    surfaceContainerLow?: PaletteOptions["primary"];
    surfaceContainer?: PaletteOptions["primary"];
    surfaceContainerHigh?: PaletteOptions["primary"];
    surfaceContainerHighest?: PaletteOptions["primary"];
  }

  interface PaletteColor {
    high: string;
    low: string;
  }

  // Write side (what createTheme accepts)
  interface SimplePaletteColorOptions {
    high?: string;
    low?: string;
  }
  interface PaletteColorOptions {
    high?: string;
    low?: string;
  }
}
