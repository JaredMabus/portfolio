/**
 * Builds light and dark semantic color schemes from the authored theme tokens.
 */
import { alpha, darken, getContrastRatio, lighten } from "@mui/material/styles";
import { common } from "@mui/material/colors";
import {
  brightenPreserveHue,
  clamp01,
  mixColors,
  readableOnColor,
} from "./color.utils";
import {
  colorStateLayerOpacity,
  neutral,
  surfaceStateLayerOpacity,
  surfaceTintWeights,
  surfaceToneReferences,
  themeColorModeOverrides,
  themeColorSeed,
} from "./theme.tokens";
import type {
  ColorRole,
  FixedColorKeys,
  StateLayer,
  SurfaceRole,
  ThemeColorScheme,
  ThemeMode,
} from "./theme.types";

type SurfaceToneKey = keyof (typeof surfaceToneReferences)["light"];

/** Creates interaction-state colors by applying configured opacities. */
export function createStateLayer(
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


/** Resolves a seed color to its mode-specific main value. */
function modeColorMain(seed: string, mode: ThemeMode) {
  // Preserves 100% of the seed's original Hue and Saturation
  return mode === "light" ? seed : brightenPreserveHue(seed, 0.16);
}

/** Creates a complete semantic color role from a resolved main color. */
function createColorRole(main: string, mode: ThemeMode): ColorRole {
  return {
    main,
    high: mode === "light" ? darken(main, 0.12) : lighten(main, 0.12),
    low: mode === "light" ? lighten(main, 0.12) : darken(main, 0.12),
    on: readableOnColor(main),
    state: createStateLayer(main, colorStateLayerOpacity),
  };
}

/** Creates a semantic color role directly from an authored seed. */
function createRoleFromSeed(seed: string, mode: ThemeMode): ColorRole {
  return createColorRole(modeColorMain(seed, mode), mode);
}

/** Creates a mode-specific container role with a readable foreground. */
function createContainerRole(seed: string, mode: ThemeMode): ColorRole {
  const main =
    mode === "light"
      ? mixColors(common.white, seed, 0.18)
      : mixColors(neutral.n0, seed, 0.42);
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

/** Creates mode-independent fixed roles for the three brand color families. */
function createFixedColorRoles(
  primarySeed: string,
  secondarySeed: string,
  tertiarySeed: string,
): Record<FixedColorKeys, string> {
  /** Creates one fixed color family from its authored seed. */
  const createFixed = (seed: string) => ({
    fixed: mixColors(common.white, seed, 0.16),
    fixedDim: mixColors(common.white, seed, 0.28),
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

/** Resolves the configured source color used to tint surfaces. */
function surfaceTintColor() {
  if (themeColorSeed.surfaceTint.source === "none") {
    return null;
  }

  return themeColorSeed.surfaceTint.source === "neutral"
    ? themeColorSeed.surfaceTint.neutralColor
    : themeColorSeed.primary;
}

/** Resolves one surface tone and applies the configured tint when enabled. */
function tintSurfaceValue(mode: ThemeMode, key: SurfaceToneKey) {
  const tint = surfaceTintColor();
  const amount = clamp01(themeColorSeed.surfaceTint.amount);
  const baseValue = surfaceToneReferences[mode][key];

  if (!tint || amount === 0) {
    return baseValue;
  }

  return mixColors(baseValue, tint, surfaceTintWeights[mode][key] * amount);
}

/** Creates a semantic surface role from resolved tonal values. */
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

/** Creates a translucent surface-container role for glass treatments. */
function createGlassSurfaceRole(
  mode: ThemeMode,
  lowSurface: string,
  mainSurface: string,
  highSurface: string,
  onSurface: string,
): SurfaceRole {
  const opacity =
    mode === "light"
      ? { low: 0.82, main: 0.90, high: 0.96 }
      : { low: 0.78, main: 0.88, high: 0.94 };

  return createSurfaceRole(
    alpha(mainSurface, opacity.main),
    alpha(highSurface, opacity.high),
    alpha(lowSurface, opacity.low),
    onSurface,
  );
}

/** Builds the complete semantic color scheme for one appearance mode. */
function createThemeColorScheme(mode: ThemeMode): ThemeColorScheme {
  const primary = createRoleFromSeed(themeColorSeed.primary, mode);
  const secondary = createColorRole(
    themeColorModeOverrides[mode].secondary,
    mode,
  );
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

export const lightThemeColors = createThemeColorScheme("light");
export const darkThemeColors = createThemeColorScheme("dark");
