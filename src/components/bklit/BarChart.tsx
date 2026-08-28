import React, { useState, useRef, useMemo, useEffect } from "react";
import { Box, useTheme } from "@mui/material";
import { CategoricalPoint, SeriesConfig, ChartMargin } from "./types";
import { ChartTooltip } from "./ChartTooltip";
import { bklitChartPalette } from "./theme";

export interface BarChartProps {
  data: CategoricalPoint[];
  series: SeriesConfig[];
  categoryKey?: string;
  stacked?: boolean;
  orientation?: "vertical" | "horizontal";
  barRadius?: number;
  margin?: Partial<ChartMargin>;
  showGrid?: boolean;
  height?: number | string;
  valueFormatter?: (val: number) => string;
}

const DEFAULT_MARGIN: ChartMargin = { top: 20, right: 20, bottom: 30, left: 45 };

export const BarChart: React.FC<BarChartProps> = ({
  data,
  series,
  categoryKey = "name",
  stacked = false,
  orientation = "vertical",
  barRadius = 6,
  margin: propMargin,
  showGrid = true,
  height = "100%",
  valueFormatter = (v) => v.toLocaleString(),
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 600, height: 300 });

  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const margin = { ...DEFAULT_MARGIN, ...propMargin };
  const isHorizontal = orientation === "horizontal";

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (width > 0 && height > 0) {
          setDimensions({ width, height });
        }
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const innerWidth = Math.max(10, dimensions.width - margin.left - margin.right);
  const innerHeight = Math.max(10, dimensions.height - margin.top - margin.bottom);

  // Compute maximum value
  const maxVal = useMemo(() => {
    if (stacked) {
      let max = 0;
      for (const d of data) {
        let sum = 0;
        for (const s of series) {
          const val = d[s.dataKey];
          if (typeof val === "number") sum += val;
        }
        if (sum > max) max = sum;
      }
      return (max || 100) * 1.1;
    }

    let max = 0;
    for (const d of data) {
      for (const s of series) {
        const val = d[s.dataKey];
        if (typeof val === "number" && val > max) max = val;
      }
    }
    return (max || 100) * 1.1;
  }, [data, series, stacked]);

  const groupCount = data.length;
  const seriesCount = series.length;

  const bandWidth = isHorizontal
    ? innerHeight / (groupCount || 1)
    : innerWidth / (groupCount || 1);

  const groupPadding = bandWidth * 0.25;
  const availableWidth = bandWidth - groupPadding;

  const barWidth = stacked
    ? availableWidth
    : Math.max(4, (availableWidth - (seriesCount - 1) * 3) / seriesCount);

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left - margin.left;
    const mouseY = e.clientY - rect.top - margin.top;

    if (mouseX < 0 || mouseX > innerWidth || mouseY < 0 || mouseY > innerHeight) {
      setHoverIndex(null);
      return;
    }

    const pos = isHorizontal ? mouseY : mouseX;
    const index = Math.max(0, Math.min(groupCount - 1, Math.floor(pos / bandWidth)));
    setHoverIndex(index);
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseLeave = () => {
    setHoverIndex(null);
  };

  const activeDataPoint = hoverIndex !== null ? data[hoverIndex] : null;

  const tooltipItems = useMemo(() => {
    if (!activeDataPoint) return [];
    return series.map((s, idx) => {
      const val = activeDataPoint[s.dataKey];
      const color = s.color || bklitChartPalette[isDark ? "dark" : "light"].series[idx % 5];
      return {
        name: s.label || s.dataKey,
        value: typeof val === "number" ? valueFormatter(val) : String(val ?? "-"),
        color,
      };
    });
  }, [activeDataPoint, series, isDark, valueFormatter]);

  const gridTicks = [0, 0.25, 0.5, 0.75, 1].map((pct) => {
    const val = pct * maxVal;
    const pos = isHorizontal ? pct * innerWidth : innerHeight - pct * innerHeight;
    return { val, pos };
  });

  return (
    <Box
      ref={containerRef}
      sx={{
        width: "100%",
        height,
        position: "relative",
        userSelect: "none",
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        style={{ overflow: "visible" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          {/* Grid lines */}
          {showGrid &&
            gridTicks.map((tick, i) => (
              <g key={i}>
                {isHorizontal ? (
                  <>
                    <line
                      x1={tick.pos}
                      y1={0}
                      x2={tick.pos}
                      y2={innerHeight}
                      stroke="var(--chart-grid, rgba(255, 255, 255, 0.08))"
                      strokeDasharray="4 4"
                    />
                    <text
                      x={tick.pos}
                      y={innerHeight + 20}
                      textAnchor="middle"
                      fill={theme.palette.text.secondary}
                      fontSize="11"
                      fontFamily="inherit"
                      fontWeight="500"
                    >
                      {valueFormatter(Math.round(tick.val))}
                    </text>
                  </>
                ) : (
                  <>
                    <line
                      x1={0}
                      y1={tick.pos}
                      x2={innerWidth}
                      y2={tick.pos}
                      stroke="var(--chart-grid, rgba(255, 255, 255, 0.08))"
                      strokeDasharray="4 4"
                    />
                    <text
                      x={-10}
                      y={tick.pos + 4}
                      textAnchor="end"
                      fill={theme.palette.text.secondary}
                      fontSize="11"
                      fontFamily="inherit"
                      fontWeight="500"
                    >
                      {valueFormatter(Math.round(tick.val))}
                    </text>
                  </>
                )}
              </g>
            ))}

          {/* Render Bars */}
          {data.map((d, groupIdx) => {
            const isHovered = hoverIndex === groupIdx;
            const isDimmed = hoverIndex !== null && !isHovered;
            const groupPos = groupIdx * bandWidth + groupPadding / 2;

            if (stacked) {
              let cumulativeVal = 0;
              return (
                <g
                  key={groupIdx}
                  opacity={isDimmed ? 0.35 : 1}
                  style={{ transition: "opacity 0.2s ease" }}
                >
                  {series.map((s, sIdx) => {
                    const val = d[s.dataKey];
                    if (typeof val !== "number" || val <= 0) return null;

                    const color =
                      s.color ||
                      bklitChartPalette[isDark ? "dark" : "light"].series[sIdx % 5];
                    const isLast = sIdx === series.length - 1;

                    if (isHorizontal) {
                      const xStart = (cumulativeVal / maxVal) * innerWidth;
                      const barLen = (val / maxVal) * innerWidth;
                      cumulativeVal += val;

                      return (
                        <rect
                          key={s.dataKey}
                          x={xStart}
                          y={groupPos}
                          width={barLen}
                          height={barWidth}
                          fill={color}
                          rx={isLast ? barRadius : 0}
                          ry={isLast ? barRadius : 0}
                          style={{
                            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                            filter: isHovered ? `drop-shadow(0 0 8px ${color}66)` : "none",
                          }}
                        />
                      );
                    }

                    const barHeight = (val / maxVal) * innerHeight;
                    const yStart = innerHeight - ((cumulativeVal + val) / maxVal) * innerHeight;
                    cumulativeVal += val;

                    return (
                      <rect
                        key={s.dataKey}
                        x={groupPos}
                        y={yStart}
                        width={barWidth}
                        height={barHeight}
                        fill={color}
                        rx={isLast ? barRadius : 0}
                        ry={isLast ? barRadius : 0}
                        style={{
                          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                          filter: isHovered ? `drop-shadow(0 0 8px ${color}66)` : "none",
                        }}
                      />
                    );
                  })}
                </g>
              );
            }

            // Grouped bars
            return (
              <g
                key={groupIdx}
                opacity={isDimmed ? 0.35 : 1}
                style={{ transition: "opacity 0.2s ease" }}
              >
                {series.map((s, sIdx) => {
                  const val = d[s.dataKey];
                  if (typeof val !== "number") return null;

                  const color =
                    s.color ||
                    bklitChartPalette[isDark ? "dark" : "light"].series[sIdx % 5];

                  if (isHorizontal) {
                    const yPos = groupPos + sIdx * (barWidth + 3);
                    const barLen = (val / maxVal) * innerWidth;

                    return (
                      <rect
                        key={s.dataKey}
                        x={0}
                        y={yPos}
                        width={barLen}
                        height={barWidth}
                        fill={color}
                        rx={barRadius}
                        ry={barRadius}
                        style={{
                          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                          filter: isHovered ? `drop-shadow(0 0 8px ${color}66)` : "none",
                        }}
                      />
                    );
                  }

                  const xPos = groupPos + sIdx * (barWidth + 3);
                  const barH = (val / maxVal) * innerHeight;
                  const yPos = innerHeight - barH;

                  return (
                    <rect
                      key={s.dataKey}
                      x={xPos}
                      y={yPos}
                      width={barWidth}
                      height={barH}
                      fill={color}
                      rx={barRadius}
                      ry={barRadius}
                      style={{
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        filter: isHovered ? `drop-shadow(0 0 8px ${color}66)` : "none",
                      }}
                    />
                  );
                })}
              </g>
            );
          })}

          {/* Category Axis Labels */}
          {data.map((d, i) => {
            const label = String(d[categoryKey] ?? "");
            if (isHorizontal) {
              const yPos = i * bandWidth + bandWidth / 2;
              return (
                <text
                  key={i}
                  x={-10}
                  y={yPos + 4}
                  textAnchor="end"
                  fill={theme.palette.text.secondary}
                  fontSize="11"
                  fontFamily="inherit"
                  fontWeight="500"
                >
                  {label}
                </text>
              );
            }

            const xPos = i * bandWidth + bandWidth / 2;
            return (
              <text
                key={i}
                x={xPos}
                y={innerHeight + 20}
                textAnchor="middle"
                fill={theme.palette.text.secondary}
                fontSize="11"
                fontFamily="inherit"
                fontWeight="500"
              >
                {label}
              </text>
            );
          })}
        </g>
      </svg>

      <ChartTooltip
        visible={hoverIndex !== null}
        x={mousePos.x}
        y={mousePos.y}
        title={activeDataPoint ? String(activeDataPoint[categoryKey] ?? "") : undefined}
        items={tooltipItems}
      />
    </Box>
  );
};

export default BarChart;
