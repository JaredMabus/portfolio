/** @vitest-environment jsdom */
import React from "react";
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, renderHook } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import { useBklitPalette } from "@/components/bklit/theme";
import { bklitChartPalette, bklitTokens, getSeriesColor, getScaleColor } from "./theme.charts";
import { themeDark, themeLight } from "./theme";

afterEach(cleanup);

describe("assembled themes", () => {
  it.each([themeLight, themeDark])("keeps CSS and chart consumers consistent in $palette.mode mode", (theme) => {
    const mode = theme.palette.mode;
    const { result } = renderHook(useBklitPalette, {
      wrapper: ({ children }) => <ThemeProvider theme={theme}>{children}</ThemeProvider>,
    });
    const css = theme.components?.MuiCssBaseline?.styleOverrides;
    expect(typeof css).toBe("string");
    expect(result.current.series).toBe(bklitChartPalette[mode].series);
    expect(result.current.scale).toBe(bklitChartPalette[mode].scale);
    for (let index = 0; index < 5; index++) {
      expect(css).toContain(`--chart-${index + 1}: ${result.current.series[index]};`);
      expect(css).toContain(`--chart-scale-0${index + 1}: ${result.current.scale[index]};`);
      expect(getSeriesColor(index, mode === "dark")).toBe(result.current.series[index]);
      expect(getScaleColor(index, mode === "dark")).toBe(result.current.scale[index]);
    }
    expect(css).toContain(`--chart-tooltip-background: ${result.current.tooltipBg};`);
    expect(bklitTokens[mode].linePrimary).toBe(result.current.linePrimary);
    expect(result.current.containerBg).toBe(mode === "light" ? "#FFFFFF" : "#1E1E1E");
    // Shared interaction rules and mode-specific card styling must both survive assembly.
    expect(theme.components?.MuiButton?.variants?.length).toBeGreaterThan(0);
    expect(theme.components?.MuiCard?.styleOverrides?.root).toMatchObject({
      backgroundColor: mode === "light" ? theme.palette.surface.main : theme.palette.surfaceContainer.main,
    });
  });

  it("updates chart colors when the provider switches modes", () => {
    let theme = themeLight;
    const { result, rerender } = renderHook(useBklitPalette, {
      wrapper: ({ children }) => <ThemeProvider theme={theme}>{children}</ThemeProvider>,
    });
    expect(result.current.isDark).toBe(false);
    theme = themeDark;
    rerender();
    expect(result.current.isDark).toBe(true);
    expect(result.current.series).toBe(bklitChartPalette.dark.series);
  });
});
