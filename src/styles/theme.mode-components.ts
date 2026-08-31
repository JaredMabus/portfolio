import { alpha, darken, lighten, type Theme } from "@mui/material/styles";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";
import { bklitTokens } from "./theme.charts";
import { darkThemeColors, lightThemeColors } from "./theme.colors";
import type { ThemeMode } from "./theme.types";

function createLightComponents() {
  return {
    MuiCssBaseline: {
      styleOverrides: `
        :root, body {
          --chart-1: ${bklitTokens.light.chart1};
          --chart-2: ${bklitTokens.light.chart2};
          --chart-3: ${bklitTokens.light.chart3};
          --chart-4: ${bklitTokens.light.chart4};
          --chart-5: ${bklitTokens.light.chart5};
          --chart-scale-01: ${bklitTokens.light.scale01};
          --chart-scale-02: ${bklitTokens.light.scale02};
          --chart-scale-03: ${bklitTokens.light.scale03};
          --chart-scale-04: ${bklitTokens.light.scale04};
          --chart-scale-05: ${bklitTokens.light.scale05};
          --chart-line-primary: ${bklitTokens.light.linePrimary};
          --chart-line-secondary: ${bklitTokens.light.lineSecondary};
          --chart-grid: ${bklitTokens.light.grid};
          --chart-background: ${bklitTokens.light.background};
          --chart-tooltip-background: ${bklitTokens.light.tooltipBg};
          --chart-tooltip-text: ${bklitTokens.light.tooltipText};
        }
        body { color: ${lightThemeColors.surface.on}; }
        .material-symbol { color: inherit; }
        *::-webkit-scrollbar { width: 12px; }
        *::-webkit-scrollbar-track {
          border: 1px solid ${lightThemeColors.background};
          background-color: ${lightThemeColors.background};
        }
        *::-webkit-scrollbar-thumb {
          border: 4px solid ${lightThemeColors.background};
          background-color: ${darken(lightThemeColors.surfaceContainer.main, 0.25)};
          border-radius: 8px;
        }
        *::-webkit-scrollbar-thumb:hover { 
        background-color: ${darken(lightThemeColors.surfaceDim, 0.25)}; }
      `,
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& label": {
            color: lightThemeColors.surface.on,
          },
          "& label.Mui-focused": {
            color: lightThemeColors.surface.on,
          },
          "& .MuiInput-underline:after": {
            borderBottomColor: lightThemeColors.surface.on,
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: lightThemeColors.outline,
        },
        root: {
          [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
            borderColor: alpha(lightThemeColors.outline, 0.8),
          },
          [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
            borderColor: alpha(lightThemeColors.outline, 1),
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: lightThemeColors.surface.main,
          color: lightThemeColors.surface.on,
          borderColor: lightThemeColors.border,
        },
      },
    },
  };
}

function createDarkComponents() {
  return {
    MuiCssBaseline: {
      styleOverrides: `
        :root, body {
          --chart-1: ${bklitTokens.dark.chart1};
          --chart-2: ${bklitTokens.dark.chart2};
          --chart-3: ${bklitTokens.dark.chart3};
          --chart-4: ${bklitTokens.dark.chart4};
          --chart-5: ${bklitTokens.dark.chart5};
          --chart-scale-01: ${bklitTokens.dark.scale01};
          --chart-scale-02: ${bklitTokens.dark.scale02};
          --chart-scale-03: ${bklitTokens.dark.scale03};
          --chart-scale-04: ${bklitTokens.dark.scale04};
          --chart-scale-05: ${bklitTokens.dark.scale05};
          --chart-line-primary: ${bklitTokens.dark.linePrimary};
          --chart-line-secondary: ${bklitTokens.dark.lineSecondary};
          --chart-grid: ${bklitTokens.dark.grid};
          --chart-background: ${bklitTokens.dark.background};
          --chart-tooltip-background: ${bklitTokens.dark.tooltipBg};
          --chart-tooltip-text: ${bklitTokens.dark.tooltipText};
        }
        body { color: ${darkThemeColors.surface.on}; }
        .material-symbol { color: inherit; }
        *::-webkit-scrollbar { width: 12px; }
        *::-webkit-scrollbar-track {
          border: 1px solid ${darkThemeColors.background};
          background-color: ${darkThemeColors.background};
        }
        *::-webkit-scrollbar-thumb {
          border: 4px solid ${darkThemeColors.background};
          background-color: ${lighten(darkThemeColors.surfaceContainer.main, 0.1)};
          border-radius: 8px;
        }
        *::-webkit-scrollbar-thumb:hover { 
        background-color: ${lighten(darkThemeColors.surfaceContainer.main, 0.25)}; }
      `,
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: ({ theme }: { theme: Theme }) => ({
          color: theme.palette.text.secondary,
        }),
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: darkThemeColors.surfaceContainer.main,
          color: darkThemeColors.surface.on,
          borderColor: darkThemeColors.outline,
        },
      },
    },
  };
}

export function createModeComponents(mode: ThemeMode) {
  return mode === "light"
    ? createLightComponents()
    : createDarkComponents();
}
