import { useState } from "react";

import { useBklitPalette } from "@/components/bklit";

export default function useDataDashboard() {
  const { isDark, paletteSet, series } = useBklitPalette();
  const [trafficFilter, setTrafficFilter] = useState("7D");
  const [activeChartType, setActiveChartType] = useState<"area" | "line">(
    "area"
  );

  const paletteTokens = paletteSet.light.series.map((lightHex, index) => ({
    token: `--chart-${index + 1}`,
    lightHex,
    darkHex: paletteSet.dark.series[index],
    desc: [
      "High contrast foreground neutral",
      "Secondary surfaceContainer tone",
      "Midtone surfaceContainer shade",
      "Soft surfaceContainer neutral",
      "Base surfaceContainer seed",
    ][index],
  }));

  const scaleTokens = paletteSet.light.scale.map((lightHex, index) => ({
    token: `--chart-scale-0${index + 1}`,
    lightHex,
    darkHex: paletteSet.dark.scale[index],
    level: [
      "Faint Neutral Surface Intensity",
      "Low Neutral Intensity",
      "Medium Neutral Intensity",
      "High Neutral Intensity",
      "Peak Neutral Highlight",
    ][index],
  }));

  return {
    activeChartType,
    isDark,
    paletteTokens,
    scaleTokens,
    series,
    setActiveChartType,
    setTrafficFilter,
    trafficFilter,
  };
}
