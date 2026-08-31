import { alpha, darken, lighten, type Theme } from "@mui/material/styles";
import { createStateLayer, darkThemeColors, lightThemeColors } from "./theme.colors";
import { colorStateLayerOpacity, surfaceStateLayerOpacity } from "./theme.tokens";
import type { ThemeMode } from "./theme.types";

export function createThemePalette(mode: ThemeMode, theme: Theme) {
  const isLight = mode === "light";
  const themeColors = isLight ? lightThemeColors : darkThemeColors;

  return {
    mode,
    primary: {
      main: themeColors.primary.main,
      light: lighten(themeColors.primary.main, 0.2),
      dark: darken(themeColors.primary.main, 0.15),
      contrastText: themeColors.primary.on,
      high: themeColors.primary.high,
      low: themeColors.primary.low,
      state: themeColors.primary.state,
    },
    secondary: {
      main: themeColors.secondary.main,
      light: lighten(themeColors.secondary.main, 0.2),
      dark: darken(themeColors.secondary.main, 0.15),
      contrastText: themeColors.secondary.on,
      high: themeColors.secondary.high,
      low: themeColors.secondary.low,
      state: themeColors.secondary.state,
    },
    tertiary: {
      main: themeColors.tertiary,
      light: lighten(themeColors.tertiary, 0.2),
      dark: darken(themeColors.tertiary, 0.15),
      contrastText: themeColors.onTertiary,
      high: isLight
        ? darken(themeColors.tertiary, 0.12)
        : lighten(themeColors.tertiary, 0.12),
      low: isLight
        ? lighten(themeColors.tertiary, 0.12)
        : darken(themeColors.tertiary, 0.12),
      state: createStateLayer(themeColors.tertiary, colorStateLayerOpacity),
    },
    neutral: {
      main: themeColors.surfaceContainer.main,
      light: isLight
        ? themeColors.surfaceContainerLow.main
        : themeColors.surfaceContainerHigh.main,
      dark: isLight
        ? themeColors.surfaceContainerHigh.main
        : themeColors.surfaceContainerLow.main,
      contrastText: themeColors.surface.on,
      high: themeColors.surfaceContainerHigh.main,
      low: themeColors.surfaceContainerLow.main,
      state: themeColors.surfaceContainer.state,
    },
    error: {
      main: themeColors.error.main,
      light: lighten(themeColors.error.main, 0.2),
      dark: darken(themeColors.error.main, 0.15),
      contrastText: themeColors.error.on,
      high: themeColors.error.high,
      low: themeColors.error.low,
      state: themeColors.error.state,
    },
    warning: {
      main: theme.palette.warning.main,
      light: theme.palette.warning.light,
      dark: theme.palette.warning.dark,
      contrastText: theme.palette.warning.contrastText,
      high: isLight
        ? darken(theme.palette.warning.main, 0.12)
        : lighten(theme.palette.warning.main, 0.12),
      low: isLight
        ? lighten(theme.palette.warning.main, 0.12)
        : darken(theme.palette.warning.main, 0.12),
      state: {
        hover: alpha(theme.palette.warning.main, 0.04),
        selected: alpha(theme.palette.warning.main, 0.08),
        focus: alpha(theme.palette.warning.main, 0.12),
        focusVisible: alpha(theme.palette.warning.main, 0.3),
        outlinedBorder: alpha(theme.palette.warning.main, 0.5),
        dragged: alpha(theme.palette.warning.main, 0.16),
        disabled: alpha(theme.palette.warning.main, 0.38),
        disabledBg: alpha(theme.palette.warning.main, 0.12),
      },
    },
    info: {
      main: theme.palette.info.main,
      light: theme.palette.info.light,
      dark: theme.palette.info.dark,
      contrastText: theme.palette.info.contrastText,
      high: isLight
        ? darken(theme.palette.info.main, 0.12)
        : lighten(theme.palette.info.main, 0.12),
      low: isLight
        ? lighten(theme.palette.info.main, 0.12)
        : darken(theme.palette.info.main, 0.12),
      state: {
        hover: alpha(theme.palette.info.main, 0.04),
        selected: alpha(theme.palette.info.main, 0.08),
        focus: alpha(theme.palette.info.main, 0.12),
        focusVisible: alpha(theme.palette.info.main, 0.3),
        outlinedBorder: alpha(theme.palette.info.main, 0.5),
        dragged: alpha(theme.palette.info.main, 0.16),
        disabled: alpha(theme.palette.info.main, 0.38),
        disabledBg: alpha(theme.palette.info.main, 0.12),
      },
    },
    success: {
      main: theme.palette.success.main,
      light: theme.palette.success.light,
      dark: theme.palette.success.dark,
      contrastText: theme.palette.success.contrastText,
      high: isLight
        ? darken(theme.palette.success.main, 0.12)
        : lighten(theme.palette.success.main, 0.12),
      low: isLight
        ? lighten(theme.palette.success.main, 0.12)
        : darken(theme.palette.success.main, 0.12),
      state: {
        hover: alpha(theme.palette.success.main, 0.04),
        selected: alpha(theme.palette.success.main, 0.08),
        focus: alpha(theme.palette.success.main, 0.12),
        focusVisible: alpha(theme.palette.success.main, 0.3),
        outlinedBorder: alpha(theme.palette.success.main, 0.5),
        dragged: alpha(theme.palette.success.main, 0.16),
        disabled: alpha(theme.palette.success.main, 0.38),
        disabledBg: alpha(theme.palette.success.main, 0.12),
      },
    },
    primaryContainer: theme.palette.augmentColor({
      color: {
        main: themeColors.primaryContainer,
        contrastText: themeColors.onPrimaryContainer,
        high: isLight
          ? darken(themeColors.primaryContainer, 0.1)
          : lighten(themeColors.primaryContainer, 0.1),
        low: isLight
          ? lighten(themeColors.primaryContainer, 0.1)
          : darken(themeColors.primaryContainer, 0.1),
        state: createStateLayer(themeColors.onPrimaryContainer, surfaceStateLayerOpacity),
      },
    }),
    onPrimaryContainer: theme.palette.augmentColor({
      color: {
        main: themeColors.onPrimaryContainer,
        high: isLight
          ? darken(themeColors.onPrimaryContainer, 0.1)
          : lighten(themeColors.onPrimaryContainer, 0.2),
        low: isLight
          ? lighten(themeColors.onPrimaryContainer, 0.1)
          : darken(themeColors.onPrimaryContainer, 0.25),
        state: createStateLayer(themeColors.onPrimaryContainer, surfaceStateLayerOpacity),
      },
    }),
    secondaryContainer: theme.palette.augmentColor({
      color: {
        main: themeColors.secondaryContainer,
        contrastText: themeColors.onSecondaryContainer,
        high: isLight
          ? darken(themeColors.secondaryContainer, 0.1)
          : lighten(themeColors.secondaryContainer, 0.1),
        low: isLight
          ? lighten(themeColors.secondaryContainer, 0.1)
          : darken(themeColors.secondaryContainer, 0.1),
        state: createStateLayer(themeColors.onSecondaryContainer, surfaceStateLayerOpacity),
      },
    }),
    onSecondaryContainer: theme.palette.augmentColor({
      color: {
        main: themeColors.onSecondaryContainer,
        high: isLight
          ? darken(themeColors.onSecondaryContainer, 0.1)
          : lighten(themeColors.onSecondaryContainer, 0.2),
        low: isLight
          ? lighten(themeColors.onSecondaryContainer, 0.1)
          : darken(themeColors.onSecondaryContainer, 0.25),
        state: createStateLayer(themeColors.onSecondaryContainer, surfaceStateLayerOpacity),
      },
    }),
    tertiaryContainer: theme.palette.augmentColor({
      color: {
        main: themeColors.tertiaryContainer,
        contrastText: themeColors.onTertiaryContainer,
        high: isLight
          ? darken(themeColors.tertiaryContainer, 0.1)
          : lighten(themeColors.tertiaryContainer, 0.1),
        low: isLight
          ? lighten(themeColors.tertiaryContainer, 0.1)
          : darken(themeColors.tertiaryContainer, 0.1),
        state: createStateLayer(themeColors.onTertiaryContainer, surfaceStateLayerOpacity),
      },
    }),
    onTertiaryContainer: theme.palette.augmentColor({
      color: {
        main: themeColors.onTertiaryContainer,
        high: isLight
          ? darken(themeColors.onTertiaryContainer, 0.1)
          : lighten(themeColors.onTertiaryContainer, 0.2),
        low: isLight
          ? lighten(themeColors.onTertiaryContainer, 0.1)
          : darken(themeColors.onTertiaryContainer, 0.25),
        state: createStateLayer(themeColors.onTertiaryContainer, surfaceStateLayerOpacity),
      },
    }),
    errorContainer: theme.palette.augmentColor({
      color: {
        main: themeColors.errorContainer,
        high: isLight
          ? darken(themeColors.errorContainer, 0.2)
          : lighten(themeColors.errorContainer, 0.1),
        low: isLight
          ? lighten(themeColors.errorContainer, 0.1)
          : darken(themeColors.errorContainer, 0.1),
        contrastText: themeColors.onErrorContainer,
        state: createStateLayer(themeColors.onErrorContainer, surfaceStateLayerOpacity),
      },
    }),
    onErrorContainer: theme.palette.augmentColor({
      color: {
        main: themeColors.onErrorContainer,
        high: isLight
          ? darken(themeColors.onErrorContainer, 0.2)
          : lighten(themeColors.onErrorContainer, 0.2),
        low: isLight
          ? lighten(themeColors.onErrorContainer, 0.1)
          : darken(themeColors.onErrorContainer, 0.25),
        state: createStateLayer(themeColors.onErrorContainer, surfaceStateLayerOpacity),
      },
    }),
    outline: theme.palette.augmentColor({
      color: {
        main: themeColors.outline,
        light: isLight
          ? darken(themeColors.outline, 0.1)
          : lighten(themeColors.outline, 0.1),
        dark: isLight
          ? lighten(themeColors.outline, 0.5)
          : darken(themeColors.outline, 0.1),
        high: isLight
          ? darken(themeColors.outline, 0.2)
          : lighten(themeColors.outline, 0.1),
        low: isLight
          ? lighten(themeColors.outline, 0.1)
          : darken(themeColors.outline, 0.2),
        state: createStateLayer(themeColors.outline, colorStateLayerOpacity),
      },
    }),
    border: theme.palette.augmentColor({
      color: {
        main: themeColors.border,
        light: isLight
          ? lighten(themeColors.border, 0.8)
          : darken(themeColors.border, 0.5),
        dark: isLight
          ? darken(themeColors.border, 0.15)
          : lighten(themeColors.border, 0.5),
        high: isLight
          ? darken(themeColors.border, 0.5)
          : lighten(themeColors.border, 0.4),
        low: isLight
          ? lighten(themeColors.border, 0.4)
          : darken(themeColors.border, 0.2),
        state: createStateLayer(themeColors.border, colorStateLayerOpacity),
      },
    }),
    background: {
      default: themeColors.background,
      paper: themeColors.surface.main,
    },
    onBackground: theme.palette.augmentColor({
      color: {
        main: themeColors.onBackground,
        high: isLight
          ? darken(themeColors.onBackground, 0.2)
          : lighten(themeColors.onBackground, 0.2),
        low: isLight
          ? lighten(themeColors.onBackground, 0.4)
          : darken(themeColors.onBackground, 0.25),
        state: createStateLayer(themeColors.onBackground, surfaceStateLayerOpacity),
      },
    }),
    text: {
      primary: themeColors.onBackground,
      secondary: isLight
        ? lighten(themeColors.onBackground, 0.2)
        : darken(themeColors.onBackground, 0.15),
      disabled: alpha(themeColors.onBackground, 0.4),
    },
    surface: theme.palette.augmentColor({
      color: {
        main: themeColors.surface.main,
        light: isLight
          ? lighten(themeColors.surface.main, 0.05)
          : lighten(themeColors.surface.main, 0.2),
        dark: darken(themeColors.surface.main, 0.05),
        contrastText: themeColors.surface.on,
        high: themeColors.surface.high,
        low: themeColors.surface.low,
        state: themeColors.surface.state,
      },
    }),
    onSurface: theme.palette.augmentColor({
      color: {
        main: themeColors.surface.on,
        high: isLight
          ? darken(themeColors.surface.on, 0.1)
          : lighten(themeColors.surface.on, 0.2),
        low: isLight
          ? lighten(themeColors.surface.on, 0.1)
          : darken(themeColors.surface.on, 0.25),
        state: createStateLayer(themeColors.surface.on, surfaceStateLayerOpacity),
      },
    }),
    surfaceVariant: theme.palette.augmentColor({
      color: {
        main: themeColors.surfaceVariant,
        contrastText: themeColors.onSurfaceVariant,
        high: isLight
          ? darken(themeColors.surfaceVariant, 0.06)
          : lighten(themeColors.surfaceVariant, 0.08),
        low: isLight
          ? lighten(themeColors.surfaceVariant, 0.06)
          : darken(themeColors.surfaceVariant, 0.08),
        state: createStateLayer(themeColors.onSurfaceVariant, surfaceStateLayerOpacity),
      },
    }),
    onSurfaceVariant: theme.palette.augmentColor({
      color: {
        main: themeColors.onSurfaceVariant,
        high: isLight
          ? darken(themeColors.onSurfaceVariant, 0.2)
          : lighten(themeColors.onSurfaceVariant, 0.2),
        low: isLight
          ? lighten(themeColors.onSurfaceVariant, 0.35)
          : darken(themeColors.onSurfaceVariant, 0.25),
        state: createStateLayer(themeColors.onSurfaceVariant, surfaceStateLayerOpacity),
      },
    }),
    surfaceDim: theme.palette.augmentColor({
      color: {
        main: themeColors.surfaceDim,
        high: isLight
          ? darken(themeColors.surfaceDim, 0.06)
          : lighten(themeColors.surfaceDim, 0.08),
        low: isLight
          ? lighten(themeColors.surfaceDim, 0.06)
          : darken(themeColors.surfaceDim, 0.08),
        state: createStateLayer(themeColors.surface.on, surfaceStateLayerOpacity),
      },
    }),
    surfaceBright: theme.palette.augmentColor({
      color: {
        main: themeColors.surfaceBright,
        high: isLight
          ? darken(themeColors.surfaceBright, 0.06)
          : lighten(themeColors.surfaceBright, 0.08),
        low: isLight
          ? lighten(themeColors.surfaceBright, 0.06)
          : darken(themeColors.surfaceBright, 0.08),
        state: createStateLayer(themeColors.surface.on, surfaceStateLayerOpacity),
      },
    }),
    inverseOnSurface: theme.palette.augmentColor({
      color: {
        main: themeColors.inverseOnSurface,
        high: isLight
          ? darken(themeColors.inverseOnSurface, 0.2)
          : lighten(themeColors.inverseOnSurface, 0.2),
        low: isLight
          ? lighten(themeColors.inverseOnSurface, 0.35)
          : darken(themeColors.inverseOnSurface, 0.25),
        state: createStateLayer(themeColors.inverseOnSurface, surfaceStateLayerOpacity),
      },
    }),
    inverseSurface: theme.palette.augmentColor({
      color: {
        main: themeColors.inverseSurface,
        high: isLight
          ? darken(themeColors.inverseSurface, 0.06)
          : lighten(themeColors.inverseSurface, 0.08),
        low: isLight
          ? lighten(themeColors.inverseSurface, 0.06)
          : darken(themeColors.inverseSurface, 0.08),
        state: createStateLayer(themeColors.inverseOnSurface, surfaceStateLayerOpacity),
      },
    }),
    surfaceContainerLowest: theme.palette.augmentColor({
      color: {
        main: themeColors.surfaceContainerLowest.main,
        high: themeColors.surfaceContainerLowest.high,
        low: themeColors.surfaceContainerLowest.low,
        contrastText: themeColors.surfaceContainerLowest.on,
        state: themeColors.surfaceContainerLowest.state,
      },
    }),
    surfaceContainerLow: theme.palette.augmentColor({
      color: {
        main: themeColors.surfaceContainerLow.main,
        high: themeColors.surfaceContainerLow.high,
        low: themeColors.surfaceContainerLow.low,
        contrastText: themeColors.surfaceContainerLow.on,
        state: themeColors.surfaceContainerLow.state,
      },
    }),
    surfaceContainerGlass: theme.palette.augmentColor({
      color: {
        main: themeColors.surfaceContainerGlass.main,
        light: themeColors.surfaceContainerGlass.high,
        dark: themeColors.surfaceContainerGlass.low,
        high: themeColors.surfaceContainerGlass.high,
        low: themeColors.surfaceContainerGlass.low,
        contrastText: themeColors.surfaceContainerGlass.on,
        state: themeColors.surfaceContainerGlass.state,
      },
    }),
    surfaceContainer: theme.palette.augmentColor({
      color: {
        main: themeColors.surfaceContainer.main,
        high: themeColors.surfaceContainer.high,
        low: themeColors.surfaceContainer.low,
        contrastText: themeColors.surfaceContainer.on,
        state: themeColors.surfaceContainer.state,
      },
    }),
    surfaceContainerHigh: theme.palette.augmentColor({
      color: {
        main: themeColors.surfaceContainerHigh.main,
        high: themeColors.surfaceContainerHigh.high,
        low: themeColors.surfaceContainerHigh.low,
        contrastText: themeColors.surfaceContainerHigh.on,
        state: themeColors.surfaceContainerHigh.state,
      },
    }),
    surfaceContainerHighest: theme.palette.augmentColor({
      color: {
        main: themeColors.surfaceContainerHighest.main,
        high: themeColors.surfaceContainerHighest.high,
        low: themeColors.surfaceContainerHighest.low,
        contrastText: themeColors.surfaceContainerHighest.on,
        state: themeColors.surfaceContainerHighest.state,
      },
    }),
    primaryFixed: theme.palette.augmentColor({
      color: {
        main: themeColors.primaryFixed,
        contrastText: themeColors.onPrimaryFixed,
        high: isLight
          ? darken(themeColors.primaryFixed, 0.1)
          : lighten(themeColors.primaryFixed, 0.1),
        low: isLight
          ? lighten(themeColors.primaryFixed, 0.1)
          : darken(themeColors.primaryFixed, 0.1),
        state: createStateLayer(themeColors.primaryFixed, colorStateLayerOpacity),
      },
    }),
    onPrimaryFixed: theme.palette.augmentColor({
      color: {
        main: themeColors.onPrimaryFixed,
        high: isLight
          ? darken(themeColors.onPrimaryFixed, 0.2)
          : lighten(themeColors.onPrimaryFixed, 0.2),
        low: isLight
          ? lighten(themeColors.onPrimaryFixed, 0.35)
          : darken(themeColors.onPrimaryFixed, 0.25),
        state: createStateLayer(themeColors.onPrimaryFixed, colorStateLayerOpacity),
      },
    }),
    primaryFixedDim: theme.palette.augmentColor({
      color: {
        main: themeColors.primaryFixedDim,
        high: isLight
          ? darken(themeColors.primaryFixedDim, 0.1)
          : lighten(themeColors.primaryFixedDim, 0.1),
        low: isLight
          ? lighten(themeColors.primaryFixedDim, 0.1)
          : darken(themeColors.primaryFixedDim, 0.1),
        state: createStateLayer(themeColors.primaryFixedDim, colorStateLayerOpacity),
      },
    }),
    onPrimaryFixedVariant: theme.palette.augmentColor({
      color: {
        main: themeColors.onPrimaryFixedVariant,
        high: isLight
          ? darken(themeColors.onPrimaryFixedVariant, 0.2)
          : lighten(themeColors.onPrimaryFixedVariant, 0.2),
        low: isLight
          ? lighten(themeColors.onPrimaryFixedVariant, 0.35)
          : darken(themeColors.onPrimaryFixedVariant, 0.25),
        state: createStateLayer(themeColors.onPrimaryFixedVariant, colorStateLayerOpacity),
      },
    }),
    secondaryFixed: theme.palette.augmentColor({
      color: {
        main: themeColors.secondaryFixed,
        contrastText: themeColors.onSecondaryFixed,
        high: isLight
          ? darken(themeColors.secondaryFixed, 0.1)
          : lighten(themeColors.secondaryFixed, 0.1),
        low: isLight
          ? lighten(themeColors.secondaryFixed, 0.1)
          : darken(themeColors.secondaryFixed, 0.1),
        state: createStateLayer(themeColors.secondaryFixed, colorStateLayerOpacity),
      },
    }),
    onSecondaryFixed: theme.palette.augmentColor({
      color: {
        main: themeColors.onSecondaryFixed,
        high: isLight
          ? darken(themeColors.onSecondaryFixed, 0.2)
          : lighten(themeColors.onSecondaryFixed, 0.2),
        low: isLight
          ? lighten(themeColors.onSecondaryFixed, 0.35)
          : darken(themeColors.onSecondaryFixed, 0.25),
        state: createStateLayer(themeColors.onSecondaryFixed, colorStateLayerOpacity),
      },
    }),
    secondaryFixedDim: theme.palette.augmentColor({
      color: {
        main: themeColors.secondaryFixedDim,
        high: isLight
          ? darken(themeColors.secondaryFixedDim, 0.1)
          : lighten(themeColors.secondaryFixedDim, 0.1),
        low: isLight
          ? lighten(themeColors.secondaryFixedDim, 0.1)
          : darken(themeColors.secondaryFixedDim, 0.1),
        state: createStateLayer(themeColors.secondaryFixedDim, colorStateLayerOpacity),
      },
    }),
    onSecondaryFixedVariant: theme.palette.augmentColor({
      color: {
        main: themeColors.onSecondaryFixedVariant,
        high: isLight
          ? darken(themeColors.onSecondaryFixedVariant, 0.2)
          : lighten(themeColors.onSecondaryFixedVariant, 0.2),
        low: isLight
          ? lighten(themeColors.onSecondaryFixedVariant, 0.35)
          : darken(themeColors.onSecondaryFixedVariant, 0.25),
        state: createStateLayer(themeColors.onSecondaryFixedVariant, colorStateLayerOpacity),
      },
    }),
    tertiaryFixed: theme.palette.augmentColor({
      color: {
        main: themeColors.tertiaryFixed,
        contrastText: themeColors.onTertiaryFixed,
        high: isLight
          ? darken(themeColors.tertiaryFixed, 0.1)
          : lighten(themeColors.tertiaryFixed, 0.1),
        low: isLight
          ? lighten(themeColors.tertiaryFixed, 0.1)
          : darken(themeColors.tertiaryFixed, 0.1),
        state: createStateLayer(themeColors.tertiaryFixed, colorStateLayerOpacity),
      },
    }),
    onTertiaryFixed: theme.palette.augmentColor({
      color: {
        main: themeColors.onTertiaryFixed,
        high: isLight
          ? darken(themeColors.onTertiaryFixed, 0.2)
          : lighten(themeColors.onTertiaryFixed, 0.2),
        low: isLight
          ? lighten(themeColors.onTertiaryFixed, 0.35)
          : darken(themeColors.onTertiaryFixed, 0.25),
        state: createStateLayer(themeColors.onTertiaryFixed, colorStateLayerOpacity),
      },
    }),
    tertiaryFixedDim: theme.palette.augmentColor({
      color: {
        main: themeColors.tertiaryFixedDim,
        high: isLight
          ? darken(themeColors.tertiaryFixedDim, 0.1)
          : lighten(themeColors.tertiaryFixedDim, 0.1),
        low: isLight
          ? lighten(themeColors.tertiaryFixedDim, 0.1)
          : darken(themeColors.tertiaryFixedDim, 0.1),
        state: createStateLayer(themeColors.tertiaryFixedDim, colorStateLayerOpacity),
      },
    }),
    onTertiaryFixedVariant: theme.palette.augmentColor({
      color: {
        main: themeColors.onTertiaryFixedVariant,
        high: isLight
          ? darken(themeColors.onTertiaryFixedVariant, 0.2)
          : lighten(themeColors.onTertiaryFixedVariant, 0.2),
        low: isLight
          ? lighten(themeColors.onTertiaryFixedVariant, 0.35)
          : darken(themeColors.onTertiaryFixedVariant, 0.25),
        state: createStateLayer(themeColors.onTertiaryFixedVariant, colorStateLayerOpacity),
      },
    }),
  };
}
