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

export type ThemeMode = "light" | "dark";

/** A hexadecimal color value used by the authored theme tokens. */
export type HexColor = `#${string}`;

/** An opaque rgb() color value used by the authored theme tokens. */
export type RgbColor = `rgb(${string})`;

/** An opaque hsl() color value used by the authored theme tokens. */
export type HslColor = `hsl(${string})`;

/** A supported opaque CSS color representation. */
export type CssColor = HexColor | RgbColor | HslColor;

/** Neutral tonal steps used for surfaces, backgrounds, and text. */
export type Neutral = Record<
  | "n0"
  | "n5"
  | "n10"
  | "n15"
  | "n20"
  | "n25"
  | "n30"
  | "n35"
  | "n40"
  | "n45"
  | "n50"
  | "n55"
  | "n60"
  | "n65"
  | "n70"
  | "n75"
  | "n80"
  | "n85"
  | "n90"
  | "n95"
  | "n96"
  | "n97"
  | "n98"
  | "n99"
  | "n100",
  CssColor
>;

/** Neutral-variant tonal steps used for structural color roles. */
export type NeutralVariant = Record<
  | "nv10"
  | "nv20"
  | "nv30"
  | "nv40"
  | "nv50"
  | "nv60"
  | "nv70"
  | "nv80"
  | "nv90",
  CssColor
>;

/**
 * Selects the surface-ramp tint: "primary" = primary hue, "neutral" = n50,
 * or "none" no tint.
 */
export type SurfaceTintSource = "primary" | "neutral" | "none";

/** Configuration for optionally tinting the neutral surface ramp. 
 * 
 * source: "primary" = primary hue, "neutral" = n50, or "none" = no tint.
 * amount: Multiplier over the M3-style surface tint ramp. Use 0 to turn tint off.
 * neutralColor: The neutral color to use for tinting. (Only used when source is "neutral")
*/
export type SurfaceTint = {
  source: SurfaceTintSource;
  amount: number;
  neutralColor: CssColor;
};

/** Authored color seeds used to generate the semantic theme schemes. */
export type ThemeColorSeed = {
  primary: CssColor;
  secondary: CssColor;
  tertiary: CssColor;
  error: CssColor;
  surfaceTint: SurfaceTint;
};

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
