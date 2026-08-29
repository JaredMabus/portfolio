import { useTheme } from "@mui/material";

// Universal color parser to RGB
function parseColorToRgb(colorStr: string): { r: number; g: number; b: number } {
  if (!colorStr) return { r: 31, g: 31, b: 31 };
  const str = String(colorStr).trim();

  // 1. Check for rgba(r, g, b, a) or rgb(r, g, b)
  const rgbMatch = str.match(/rgba?\s*\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)/i);
  if (rgbMatch) {
    return {
      r: Math.max(0, Math.min(255, Math.round(parseFloat(rgbMatch[1])))),
      g: Math.max(0, Math.min(255, Math.round(parseFloat(rgbMatch[2])))),
      b: Math.max(0, Math.min(255, Math.round(parseFloat(rgbMatch[3])))),
    };
  }

  // 2. Check for Hex format (#RRGGBBAA, #RRGGBB, #RGB)
  let hex = str.replace("#", "").trim();
  if (hex.length === 8) hex = hex.substring(0, 6);
  if (hex.length === 4) hex = hex.substring(0, 3);
  if (hex.length === 3) hex = hex.split("").map((x) => x + x).join("");
  if (hex.length === 6) {
    const num = parseInt(hex, 16);
    if (!isNaN(num)) {
      return {
        r: (num >> 16) & 255,
        g: (num >> 8) & 255,
        b: num & 255,
      };
    }
  }

  // Fallback default
  return { r: 31, g: 31, b: 31 };
}

// Convert parsed RGB to HSL and normalized Hex
function colorToHsl(colorStr: string): { h: number; s: number; l: number; hex: string } {
  const { r: r255, g: g255, b: b255 } = parseColorToRgb(colorStr);
  const r = r255 / 255;
  const g = g255 / 255;
  const b = b255 / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  const hDeg = Math.round(h * 360);
  const sPct = Math.round(s * 100);
  const lPct = Math.round(l * 100);
  const hex = `#${r255.toString(16).padStart(2, "0")}${g255.toString(16).padStart(2, "0")}${b255.toString(16).padStart(2, "0")}`.toUpperCase();

  return { h: hDeg, s: sPct, l: lPct, hex };
}

function hslToHex(h: number, s: number, l: number): string {
  const normH = ((h % 360) + 360) % 360;
  const normS = Math.max(0, Math.min(100, s)) / 100;
  const normL = Math.max(0, Math.min(100, l)) / 100;
  const a = normS * Math.min(normL, 1 - normL);
  const f = (n: number) => {
    const k = (n + normH / 30) % 12;
    const color = normL - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
}

export interface BklitModePalette {
  series: string[];
  scale: string[];
  linePrimary: string;
  lineSecondary: string;
  grid: string;
  tooltipBg: string;
}

export interface BklitPaletteSet {
  vars: Record<string, string>;
  light: BklitModePalette;
  dark: BklitModePalette;
}

export function generateBklitChartPalette(
  lightSeed = "#FFFFFF",
  darkSeed = "#1F1F1F",
  primarySeed = "#6ABA94"
): BklitPaletteSet {
  const lightNeutral = colorToHsl(lightSeed);
  const darkNeutral = colorToHsl(darkSeed);
  const { hex: primaryHex } = colorToHsl(primarySeed);

  // Light Mode: 5 Categorical Neutrals seeded from light surfaceContainer
  const lightSeries = [
    hslToHex(lightNeutral.h, Math.min(12, lightNeutral.s), 20), // --chart-1: Deep Charcoal
    hslToHex(lightNeutral.h, Math.min(12, lightNeutral.s), 36), // --chart-2: Mid-Dark Slate
    hslToHex(lightNeutral.h, Math.min(12, lightNeutral.s), 52), // --chart-3: Midtone Slate
    hslToHex(lightNeutral.h, Math.min(12, lightNeutral.s), 70), // --chart-4: Soft Light Neutral
    hslToHex(lightNeutral.h, Math.min(12, lightNeutral.s), 86), // --chart-5: Light Surface Neutral
  ];

  // Light Mode: 5 Sequential Neutral Scales (faint surface to solid deep peak)
  const lightScale = [
    hslToHex(lightNeutral.h, Math.min(12, lightNeutral.s), 94), // --chart-scale-01: Faint Surface Tint
    hslToHex(lightNeutral.h, Math.min(12, lightNeutral.s), 80), // --chart-scale-02: Low Density Neutral
    hslToHex(lightNeutral.h, Math.min(12, lightNeutral.s), 60), // --chart-scale-03: Medium Density Neutral
    hslToHex(lightNeutral.h, Math.min(12, lightNeutral.s), 38), // --chart-scale-04: High Density Neutral
    hslToHex(lightNeutral.h, Math.min(12, lightNeutral.s), 18), // --chart-scale-05: Solid Charcoal Peak
  ];

  // Dark Mode: 5 Categorical Neutrals seeded from dark surfaceContainer
  const darkSeries = [
    hslToHex(darkNeutral.h, Math.min(12, darkNeutral.s), 96),  // --chart-1: Radiant Off-White
    hslToHex(darkNeutral.h, Math.min(12, darkNeutral.s), 76),  // --chart-2: Light Slate
    hslToHex(darkNeutral.h, Math.min(12, darkNeutral.s), 56),  // --chart-3: Midtone Slate
    hslToHex(darkNeutral.h, Math.min(12, darkNeutral.s), 38),  // --chart-4: Dark Surface Neutral
    hslToHex(darkNeutral.h, Math.min(12, darkNeutral.s), 22),  // --chart-5: Deep Container Neutral
  ];

  // Dark Mode: 5 Sequential Neutral Scales (dark base to radiant peak)
  const darkScale = [
    hslToHex(darkNeutral.h, Math.min(12, darkNeutral.s), 16),  // --chart-scale-01: Darkest Base
    hslToHex(darkNeutral.h, Math.min(12, darkNeutral.s), 28),  // --chart-scale-02: Low Surface Neutral
    hslToHex(darkNeutral.h, Math.min(12, darkNeutral.s), 48),  // --chart-scale-03: Medium Density Neutral
    hslToHex(darkNeutral.h, Math.min(12, darkNeutral.s), 72),  // --chart-scale-04: High Density Neutral
    hslToHex(darkNeutral.h, Math.min(12, darkNeutral.s), 96),  // --chart-scale-05: Radiant White Peak
  ];

  return {
    vars: {
      chart1: `var(--chart-1, ${lightSeries[0]})`,
      chart2: `var(--chart-2, ${lightSeries[1]})`,
      chart3: `var(--chart-3, ${lightSeries[2]})`,
      chart4: `var(--chart-4, ${lightSeries[3]})`,
      chart5: `var(--chart-5, ${lightSeries[4]})`,
      scale01: `var(--chart-scale-01, ${lightScale[0]})`,
      scale02: `var(--chart-scale-02, ${lightScale[1]})`,
      scale03: `var(--chart-scale-03, ${lightScale[2]})`,
      scale04: `var(--chart-scale-04, ${lightScale[3]})`,
      scale05: `var(--chart-scale-05, ${lightScale[4]})`,
      linePrimary: `var(--chart-line-primary, ${primaryHex})`,
      lineSecondary: `var(--chart-line-secondary, ${lightSeries[2]})`,
      grid: "var(--chart-grid, rgba(255, 255, 255, 0.08))",
      background: "var(--chart-background, transparent)",
      tooltipBg: "var(--chart-tooltip-background, rgba(18, 28, 22, 0.95))",
      tooltipText: "var(--chart-tooltip-text, #ffffff)",
    },
    light: {
      series: lightSeries,
      scale: lightScale,
      linePrimary: primaryHex,
      lineSecondary: lightSeries[2],
      grid: "rgba(0, 0, 0, 0.07)",
      tooltipBg: "#FFFFFF",
    },
    dark: {
      series: darkSeries,
      scale: darkScale,
      linePrimary: primaryHex,
      lineSecondary: darkSeries[2],
      grid: "rgba(255, 255, 255, 0.08)",
      tooltipBg: "#1E1E1E",
    },
  };
}

export const bklitChartPalette = generateBklitChartPalette();

export function useBklitPalette() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const surfaceContainer =
    theme.palette.surfaceContainer?.main || (isDark ? "#1F1F1F" : "#FFFFFF");
  const primarySeed = theme.palette.primary?.main || "#6ABA94";
  
  const paletteSet = generateBklitChartPalette(
    isDark ? "#FFFFFF" : surfaceContainer,
    isDark ? surfaceContainer : "#1F1F1F",
    primarySeed
  );
  const current = isDark ? paletteSet.dark : paletteSet.light;

  return {
    ...current,
    paletteSet,
    isDark,
    surfaceContainer,
    primary: primarySeed,
    series: current.series,
    scale: current.scale,
  };
}

export function getSeriesColor(index: number, isDark = false, seed?: string): string {
  const pal = seed ? generateBklitChartPalette(seed, seed) : bklitChartPalette;
  const mode = isDark ? pal.dark : pal.light;
  return mode.series[index % mode.series.length];
}

export function getScaleColor(level: number, isDark = false, seed?: string): string {
  const pal = seed ? generateBklitChartPalette(seed, seed) : bklitChartPalette;
  const mode = isDark ? pal.dark : pal.light;
  const clamped = Math.max(0, Math.min(level, mode.scale.length - 1));
  return mode.scale[clamped];
}
