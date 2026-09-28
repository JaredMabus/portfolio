import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { baseTheme } from "./theme.base";
import { createComponents } from "./theme.components";
import { createThemePalette } from "./theme.palette";

function createAppTheme(mode: "light" | "dark") {
  return responsiveFontSizes(
    createTheme(baseTheme, {
      palette: createThemePalette(mode, baseTheme),
      components: createComponents(mode),
    }),
  );
}

export const themeLight = createAppTheme("light");
export const themeDark = createAppTheme("dark");

export { bklitTokens } from "./theme.charts";
export { fixedColors } from "./theme.colors";
export { GlobalStyle } from "./theme.global-styles";
export { neutral, neutralVariant, themeColorSeed } from "./theme.tokens";
export type {
  CssColor,
  FixedColorKeys,
  HexColor,
  HslColor,
  Neutral,
  NeutralVariant,
  RgbColor,
  SurfaceTint,
  SurfaceTintSource,
  ThemeColorSeed,
} from "./theme.types";
