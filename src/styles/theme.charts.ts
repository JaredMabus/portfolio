import { generateBklitChartPalette } from "@/components/bklit/theme";
import { darkThemeColors, lightThemeColors } from "./theme.colors";
import { themeColorSeed } from "./theme.tokens";

const dynamicChartPalette = generateBklitChartPalette(
  lightThemeColors.surfaceContainer.main,
  darkThemeColors.surfaceContainer.main,
  themeColorSeed.primary
);
export const bklitTokens = {
  light: {
    chart1: dynamicChartPalette.light.series[0],
    chart2: dynamicChartPalette.light.series[1],
    chart3: dynamicChartPalette.light.series[2],
    chart4: dynamicChartPalette.light.series[3],
    chart5: dynamicChartPalette.light.series[4],
    scale01: dynamicChartPalette.light.scale[0],
    scale02: dynamicChartPalette.light.scale[1],
    scale03: dynamicChartPalette.light.scale[2],
    scale04: dynamicChartPalette.light.scale[3],
    scale05: dynamicChartPalette.light.scale[4],
    linePrimary: dynamicChartPalette.light.linePrimary,
    lineSecondary: dynamicChartPalette.light.lineSecondary,
    grid: dynamicChartPalette.light.grid,
    background: "transparent",
    tooltipBg: dynamicChartPalette.light.tooltipBg,
    tooltipText: "#ffffff",
  },
  dark: {
    chart1: dynamicChartPalette.dark.series[0],
    chart2: dynamicChartPalette.dark.series[1],
    chart3: dynamicChartPalette.dark.series[2],
    chart4: dynamicChartPalette.dark.series[3],
    chart5: dynamicChartPalette.dark.series[4],
    scale01: dynamicChartPalette.dark.scale[0],
    scale02: dynamicChartPalette.dark.scale[1],
    scale03: dynamicChartPalette.dark.scale[2],
    scale04: dynamicChartPalette.dark.scale[3],
    scale05: dynamicChartPalette.dark.scale[4],
    linePrimary: dynamicChartPalette.dark.linePrimary,
    lineSecondary: dynamicChartPalette.dark.lineSecondary,
    grid: dynamicChartPalette.dark.grid,
    background: "transparent",
    tooltipBg: dynamicChartPalette.dark.tooltipBg,
    tooltipText: "#ffffff",
  },
};
