export const bklitChartPalette = {
  // CSS Variable references for styling
  vars: {
    chart1: "var(--chart-1, #6ABA94)",
    chart2: "var(--chart-2, #58A580)",
    chart3: "var(--chart-3, #468F6C)",
    chart4: "var(--chart-4, #367758)",
    chart5: "var(--chart-5, #275F44)",
    scale01: "var(--chart-scale-01, #E6F7F0)",
    scale02: "var(--chart-scale-02, #BAE5D0)",
    scale03: "var(--chart-scale-03, #92D2B3)",
    scale04: "var(--chart-scale-04, #6ABA94)",
    scale05: "var(--chart-scale-05, #428C6A)",
    linePrimary: "var(--chart-line-primary, #6ABA94)",
    lineSecondary: "var(--chart-line-secondary, #92D2B3)",
    grid: "var(--chart-grid, rgba(255, 255, 255, 0.08))",
    background: "var(--chart-background, transparent)",
    tooltipBg: "var(--chart-tooltip-background, rgba(18, 28, 22, 0.95))",
    tooltipText: "var(--chart-tooltip-text, #ffffff)",
  },
  // Hex values for SVG attributes and canvas rendering
  light: {
    series: ["#2E6B50", "#428C6A", "#6ABA94", "#92D2B3", "#BAE5D0"],
    scale: ["#E6F7F0", "#BAE5D0", "#92D2B3", "#6ABA94", "#428C6A"],
    linePrimary: "#6ABA94",
    lineSecondary: "#92D2B3",
    grid: "rgba(0, 0, 0, 0.07)",
    tooltipBg: "rgba(18, 28, 22, 0.95)",
  },
  dark: {
    series: ["#6ABA94", "#58A580", "#468F6C", "#367758", "#275F44"],
    scale: ["#123324", "#1D4A35", "#367758", "#6ABA94", "#8EE0B9"],
    linePrimary: "#6ABA94",
    lineSecondary: "#428C6A",
    grid: "rgba(255, 255, 255, 0.08)",
    tooltipBg: "rgba(18, 28, 22, 0.95)",
  },
};

export function getSeriesColor(index: number, isDark = false): string {
  const mode = isDark ? bklitChartPalette.dark : bklitChartPalette.light;
  return mode.series[index % mode.series.length];
}

export function getScaleColor(level: number, isDark = false): string {
  const mode = isDark ? bklitChartPalette.dark : bklitChartPalette.light;
  const clamped = Math.max(0, Math.min(level, mode.scale.length - 1));
  return mode.scale[clamped];
}
