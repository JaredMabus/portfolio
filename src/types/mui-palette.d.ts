// src/types/mui-palette.d.ts
import type {} from "@mui/material/styles"; // ensure module is resolvable

declare module "@mui/material/styles" {
  /**
   * Runtime side (what you READ via theme.palette.<key>)
   * All augmented roles behave like PaletteColor (main, light, dark, contrastText)
   * so they play nicely with palette.augmentColor(...)
   */
  interface Palette {
    // Chromatic accents
    tertiary: PaletteColor;
    neutral: PaletteColor;

    // Chromatic containers (+ their "on*" roles)
    primaryContainer: PaletteColor;
    onPrimaryContainer: PaletteColor;
    secondaryContainer: PaletteColor;
    onSecondaryContainer: PaletteColor;
    tertiaryContainer: PaletteColor;
    onTertiaryContainer: PaletteColor;
    errorContainer: PaletteColor;
    onErrorContainer: PaletteColor;

    // Fixed brand set
    primaryFixed: PaletteColor;
    onPrimaryFixed: PaletteColor;
    primaryFixedDim: PaletteColor;
    onPrimaryFixedVariant: PaletteColor;
    secondaryFixed: PaletteColor;
    onSecondaryFixed: PaletteColor;
    secondaryFixedDim: PaletteColor;
    onSecondaryFixedVariant: PaletteColor;
    tertiaryFixed: PaletteColor;
    onTertiaryFixed: PaletteColor;
    tertiaryFixedDim: PaletteColor;
    onTertiaryFixedVariant: PaletteColor;

    // Neutral roles
    onBackground: PaletteColor;
    surface: PaletteColor;
    onSurface: PaletteColor;
    surfaceVariant: PaletteColor;
    onSurfaceVariant: PaletteColor;
    outline: PaletteColor;
    border: PaletteColor;
    inverseOnSurface: PaletteColor;
    inverseSurface: PaletteColor;

    // Surface containers
    surfaceDim: PaletteColor;
    surfaceBright: PaletteColor;
    surfaceContainerLowest: PaletteColor;
    surfaceContainerLow: PaletteColor;
    surfaceContainerGlass: PaletteColor;
    surfaceContainer: PaletteColor;
    surfaceContainerHigh: PaletteColor;
    surfaceContainerHighest: PaletteColor;
  }

  /**
   * Write side (what you PASS to createTheme({ palette: { ... } }))
   */
  interface PaletteOptions {
    // Chromatic accents
    tertiary?: PaletteColorOptions;
    neutral?: PaletteColorOptions;

    // Chromatic containers (+ their "on*" roles)
    primaryContainer?: PaletteColorOptions;
    onPrimaryContainer?: PaletteColorOptions;
    secondaryContainer?: PaletteColorOptions;
    onSecondaryContainer?: PaletteColorOptions;
    tertiaryContainer?: PaletteColorOptions;
    onTertiaryContainer?: PaletteColorOptions;
    errorContainer?: PaletteColorOptions;
    onErrorContainer?: PaletteColorOptions;

    // Fixed brand set
    primaryFixed?: PaletteColorOptions;
    onPrimaryFixed?: PaletteColorOptions;
    primaryFixedDim?: PaletteColorOptions;
    onPrimaryFixedVariant?: PaletteColorOptions;
    secondaryFixed?: PaletteColorOptions;
    onSecondaryFixed?: PaletteColorOptions;
    secondaryFixedDim?: PaletteColorOptions;
    onSecondaryFixedVariant?: PaletteColorOptions;
    tertiaryFixed?: PaletteColorOptions;
    onTertiaryFixed?: PaletteColorOptions;
    tertiaryFixedDim?: PaletteColorOptions;
    onTertiaryFixedVariant?: PaletteColorOptions;

    // Neutral roles
    onBackground?: PaletteColorOptions;
    surface?: PaletteColorOptions;
    onSurface?: PaletteColorOptions;
    surfaceVariant?: PaletteColorOptions;
    onSurfaceVariant?: PaletteColorOptions;
    outline?: PaletteColorOptions;
    border?: PaletteColorOptions;
    inverseOnSurface?: PaletteColorOptions;
    inverseSurface?: PaletteColorOptions;

    // Surface containers
    surfaceDim?: PaletteColorOptions;
    surfaceBright?: PaletteColorOptions;
    surfaceContainerLowest?: PaletteColorOptions;
    surfaceContainerLow?: PaletteColorOptions;
    surfaceContainerGlass?: PaletteColorOptions;
    surfaceContainer?: PaletteColorOptions;
    surfaceContainerHigh?: PaletteColorOptions;
    surfaceContainerHighest?: PaletteColorOptions;
  }

  /**
   * Add high/low tonal helpers to each PaletteColor.
   * (MUI already has main/light/dark/contrastText.)
   */
  interface PaletteColor {
    high: string;
    low: string;
    state: {
      hover: string;
      selected: string;
      focus: string;
      focusVisible: string;
      outlinedBorder: string;
      dragged: string;
      disabled: string;
      disabledBg: string;
    };
  }

  // Write-side options that accept high/low
  interface SimplePaletteColorOptions {
    high?: string;
    low?: string;
    state?: {
      hover?: string;
      selected?: string;
      focus?: string;
      focusVisible?: string;
      outlinedBorder?: string;
      dragged?: string;
      disabled?: string;
      disabledBg?: string;
    };
  }
  interface PaletteColorOptions {
    high?: string;
    low?: string;
    state?: {
      hover?: string;
      selected?: string;
      focus?: string;
      focusVisible?: string;
      outlinedBorder?: string;
      dragged?: string;
      disabled?: string;
      disabledBg?: string;
    };
  }
}

/**
 * Button: add our extra variant & colors so props are typed.
 */
declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    filled: true;
  }
  interface ButtonPropsColorOverrides {
    tertiary: true;
    neutral: true;
  }
}

declare module "@mui/material/IconButton" {
  interface IconButtonOwnProps {
    variant?: "outlined";
  }

  interface IconButtonPropsColorOverrides {
    neutral: true;
  }
}

declare module "@mui/material/Chip" {
  interface ChipPropsColorOverrides {
    neutral: true;
  }
}
