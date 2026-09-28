import { darken, lighten } from "@mui/material/styles";
import { bklitTokens } from "./theme.charts";
import { darkThemeColors, lightThemeColors } from "./theme.colors";
import type { ThemeMode } from "./theme.types";

export const GlobalStyle = {
  "*": { padding: 0, margin: 0, boxSizing: "border-box" },
  html: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
    WebkitFontSmoothing: "antialiased",
    WebkitTextSizeAdjust: "100%",
    MozOsxFontSmoothing: "grayscale",
    width: "100%",
    overflowX: "hidden",
    overscrollBehaviorX: "none",
  },
  body: {
    minHeight: "100dvh",
    width: "100%",
    overflowX: "hidden",
    overflowY: "auto",
    overscrollBehaviorX: "none",
    touchAction: "pan-y",
  },
  "#root": { height: "100%", width: "100%", overflowX: "hidden" },
  "input, textarea, select": {
    fontSize: "1rem",
  },
  "@media (max-width: 600px)": {
    ".MuiInputBase-root, input, textarea, select": {
      fontSize: "1rem",
    },
  },
  a: { textDecoration: "none !important" },
  code: {
    fontFamily:
      'source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace',
  },
};

/** Mode-aware document colors, chart variables, and scrollbars for CssBaseline. */
export function createGlobalCss(mode: ThemeMode) {
  const isLight = mode === "light";
  const colors = isLight ? lightThemeColors : darkThemeColors;
  const charts = bklitTokens[mode];
  return `
    :root, body {
      --chart-1: ${charts.chart1};
      --chart-2: ${charts.chart2};
      --chart-3: ${charts.chart3};
      --chart-4: ${charts.chart4};
      --chart-5: ${charts.chart5};
      --chart-scale-01: ${charts.scale01};
      --chart-scale-02: ${charts.scale02};
      --chart-scale-03: ${charts.scale03};
      --chart-scale-04: ${charts.scale04};
      --chart-scale-05: ${charts.scale05};
      --chart-line-primary: ${charts.linePrimary};
      --chart-line-secondary: ${charts.lineSecondary};
      --chart-grid: ${charts.grid};
      --chart-background: ${charts.background};
      --chart-tooltip-background: ${charts.tooltipBg};
      --chart-tooltip-text: ${charts.tooltipText};
    }
    body { color: ${colors.surface.on}; }
    .material-symbol { color: inherit; }
    *::-webkit-scrollbar { width: 12px; }
    *::-webkit-scrollbar-track {
      border: 1px solid ${colors.background};
      background-color: ${colors.background};
    }
    *::-webkit-scrollbar-thumb {
      border: 4px solid ${colors.background};
      background-color: ${isLight ? darken(colors.surfaceContainer.main, 0.25) : lighten(colors.surfaceContainer.main, 0.1)};
      border-radius: 8px;
    }
    *::-webkit-scrollbar-thumb:hover {
      background-color: ${isLight ? darken(colors.surfaceDim, 0.25) : lighten(colors.surfaceContainer.main, 0.25)};
    }
  `;
}
