import { useTheme } from "@mui/material";
import { bklitChartPalette } from "@/styles/theme.charts";

// Preserve chart consumers' existing imports while styles owns the palette.
export {
  bklitChartPalette,
  generateBklitChartPalette,
  getSeriesColor,
  getScaleColor,
} from "@/styles/theme.charts";
export type { BklitModePalette, BklitPaletteSet } from "@/styles/theme.charts";

export function useBklitPalette() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  return {
    ...bklitChartPalette[theme.palette.mode],
    paletteSet: bklitChartPalette,
    isDark,
    surfaceContainer: theme.palette.surfaceContainer.main,
    primary: theme.palette.primary.main,
  };
}
