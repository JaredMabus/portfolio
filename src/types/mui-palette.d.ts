// src/types/mui-palette.d.ts
import type {} from "@mui/material/styles";

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

declare module "@mui/material/styles" {
  interface PaletteColor {
    high: string;
    low: string;
    state: StateLayer;
  }

  interface SimplePaletteColorOptions {
    high?: string;
    low?: string;
    state?: Partial<StateLayer>;
  }

  interface PaletteColorOptions {
    high?: string;
    low?: string;
    state?: Partial<StateLayer>;
  }

  interface Palette {
    tertiary: PaletteColor;
    neutral: PaletteColor;

    // Custom chromatic containers
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
    surface: PaletteColor;
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
    surfaceContainerLowest: PaletteColor;
    surfaceContainerLow: PaletteColor;
    surfaceContainerGlass: PaletteColor;
    surfaceContainer: PaletteColor;
    surfaceContainerHigh: PaletteColor;
    surfaceContainerHighest: PaletteColor;
  }

  interface PaletteOptions {
    tertiary?: PaletteOptions["primary"];
    neutral?: PaletteOptions["primary"];

    primaryContainer?: PaletteOptions["primary"];
    onPrimaryContainer?: PaletteOptions["primary"];
    secondaryContainer?: PaletteOptions["primary"];
    onSecondaryContainer?: PaletteOptions["primary"];
    tertiaryContainer?: PaletteOptions["primary"];
    onTertiaryContainer?: PaletteOptions["primary"];
    errorContainer?: PaletteOptions["primary"];
    onErrorContainer?: PaletteOptions["primary"];

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

    onBackground?: PaletteOptions["primary"];
    surface?: PaletteOptions["primary"];
    onSurface?: PaletteOptions["primary"];
    surfaceVariant?: PaletteOptions["primary"];
    onSurfaceVariant?: PaletteOptions["primary"];
    outline?: PaletteOptions["primary"];
    border?: PaletteOptions["primary"];
    inverseOnSurface?: PaletteOptions["primary"];
    inverseSurface?: PaletteOptions["primary"];

    surfaceDim?: PaletteOptions["primary"];
    surfaceBright?: PaletteOptions["primary"];
    surfaceContainerLowest?: PaletteOptions["primary"];
    surfaceContainerLow?: PaletteOptions["primary"];
    surfaceContainerGlass?: PaletteOptions["primary"];
    surfaceContainer?: PaletteOptions["primary"];
    surfaceContainerHigh?: PaletteOptions["primary"];
    surfaceContainerHighest?: PaletteOptions["primary"];
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    neutral: true;
    tertiary: true;
  }
}

declare module "@mui/material/IconButton" {
  interface IconButtonPropsColorOverrides {
    neutral: true;
    tertiary: true;
  }
  interface IconButtonOwnProps {
    variant?: "outlined" | "filled" | "standard";
  }
}

declare module "@mui/material/Chip" {
  interface ChipPropsColorOverrides {
    neutral: true;
    tertiary: true;
  }
}
