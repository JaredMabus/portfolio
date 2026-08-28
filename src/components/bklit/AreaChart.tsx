import React, { useState, useRef, useMemo, useEffect } from "react";
import { Box, useTheme } from "@mui/material";
import { TimeSeriesPoint, SeriesConfig, ChartMargin } from "./types";
import { ChartTooltip } from "./ChartTooltip";
import { bklitChartPalette } from "./theme";

export interface AreaChartProps {
  data: TimeSeriesPoint[];
  series: SeriesConfig[];
  xKey?: string;
  margin?: Partial<ChartMargin>;
  showGrid?: boolean;
  showDots?: boolean;
  curve?: "smooth" | "linear";
  height?: number | string;
  valueFormatter?: (val: number) => string;
}

const DEFAULT_MARGIN: ChartMargin = { top: 20, right: 20, bottom: 30, left: 45 };

export const AreaChart: React.FC<AreaChartProps> = ({
  data,
  series,
  xKey = "date",
  margin: propMargin,
  showGrid = true,
  showDots = true,
  curve = "smooth",
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

  // Compute extents
  const { minVal, maxVal } = useMemo(() => {
    let min = Infinity;
    let max = -Infinity;
    for (const d of data) {
      for (const s of series) {
        const val = d[s.dataKey];
        if (typeof val === "number") {
          if (val < min) min = val;
          if (val > max) max = val;
        }
      }
    }
    if (min === Infinity) return { minVal: 0, maxVal: 100 };
    return {
      minVal: min >= 0 ? 0 : min * 1.05,
      maxVal: max <= 0 ? 100 : max * 1.1,
    };
  }, [data, series]);

  const getY = (val: number) => {
    const range = maxVal - minVal || 1;
    return innerHeight - ((val - minVal) / range) * innerHeight;
  };

  const getX = (index: number) => {
    if (data.length <= 1) return 0;
    return (index / (data.length - 1)) * innerWidth;
  };

  // Generate smooth cubic bezier SVG paths
  const generatePath = (dataKey: string, isArea = false) => {
    if (data.length === 0) return "";
    const points = data
      .map((d, i) => {
        const val = d[dataKey];
        if (typeof val !== "number") return null;
        return { x: getX(i), y: getY(val) };
      })
      .filter(Boolean) as { x: number; y: number }[];

    if (points.length < 2) return "";

    let path = `M ${points[0].x},${points[0].y}`;

    if (curve === "linear") {
      for (let i = 1; i < points.length; i++) {
        path += ` L ${points[i].x},${points[i].y}`;
      }
    } else {
      // Catmull-Rom or cubic spline
      for (let i = 0; i < points.length - 1; i++) {
        const p0 = points[Math.max(i - 1, 0)];
        const p1 = points[i];
        const p2 = points[i + 1];
        const p3 = points[Math.min(i + 2, points.length - 1)];

        const cp1x = p1.x + (p2.x - p0.x) / 6;
        const cp1y = p1.y + (p2.y - p0.y) / 6;
        const cp2x = p2.x - (p3.x - p1.x) / 6;
        const cp2y = p2.y - (p3.y - p1.y) / 6;

        path += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p2.x},${p2.y}`;
      }
    }

    if (isArea) {
      const firstX = points[0].x;
      const lastX = points[points.length - 1].x;
      const baselineY = innerHeight;
      path += ` L ${lastX},${baselineY} L ${firstX},${baselineY} Z`;
    }

    return path;
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left - margin.left;
    const mouseY = e.clientY - rect.top - margin.top;

    if (mouseX < 0 || mouseX > innerWidth || data.length === 0) {
      setHoverIndex(null);
      return;
    }

    const step = innerWidth / (data.length - 1 || 1);
    const index = Math.max(0, Math.min(data.length - 1, Math.round(mouseX / step)));
    setHoverIndex(index);
    setMousePos({ x: getX(index) + margin.left, y: mouseY + margin.top });
  };

  const handleMouseLeave = () => {
    setHoverIndex(null);
  };

  const yTicks = [0, 0.25, 0.5, 0.75, 1].map((pct) => {
    const val = minVal + pct * (maxVal - minVal);
    const y = innerHeight - pct * innerHeight;
    return { val, y };
  });

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
        <defs>
          {series.map((s, idx) => {
            const gradId = `area-grad-${s.dataKey}-${idx}`;
            const color = s.color || bklitChartPalette[isDark ? "dark" : "light"].series[idx % 5];
            return (
              <linearGradient key={gradId} id={gradId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={isDark ? 0.45 : 0.35} />
                <stop offset="65%" stopColor={color} stopOpacity={isDark ? 0.15 : 0.08} />
                <stop offset="100%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            );
          })}
        </defs>

        <g transform={`translate(${margin.left}, ${margin.top})`}>
          {/* Horizontal Grid lines */}
          {showGrid &&
            yTicks.map((tick, i) => (
              <g key={i}>
                <line
                  x1={0}
                  y1={tick.y}
                  x2={innerWidth}
                  y2={tick.y}
                  stroke="var(--chart-grid, rgba(255, 255, 255, 0.08))"
                  strokeDasharray="4 4"
                />
                <text
                  x={-10}
                  y={tick.y + 4}
                  textAnchor="end"
                  fill={theme.palette.text.secondary}
                  fontSize="11"
                  fontFamily="inherit"
                  fontWeight="500"
                >
                  {valueFormatter(Math.round(tick.val))}
                </text>
              </g>
            ))}

          {/* Area Fills */}
          {series.map((s, idx) => {
            const gradId = `url(#area-grad-${s.dataKey}-${idx})`;
            const areaPath = generatePath(s.dataKey, true);
            return (
              <path
                key={`area-${s.dataKey}`}
                d={areaPath}
                fill={gradId}
              />
            );
          })}

          {/* Stroke Lines */}
          {series.map((s, idx) => {
            const color = s.color || bklitChartPalette[isDark ? "dark" : "light"].series[idx % 5];
            const linePath = generatePath(s.dataKey, false);
            return (
              <path
                key={`line-${s.dataKey}`}
                d={linePath}
                fill="none"
                stroke={color}
                strokeWidth={s.strokeWidth || 2.5}
                strokeDasharray={s.dashed ? "5 5" : undefined}
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  filter: `drop-shadow(0 2px 8px ${color}33)`,
                }}
              />
            );
          })}

          {/* X Axis Labels */}
          {data.map((d, i) => {
            if (data.length > 12 && i % Math.ceil(data.length / 8) !== 0 && i !== data.length - 1) {
              return null;
            }
            const label = String(d[xKey] ?? "");
            return (
              <text
                key={i}
                x={getX(i)}
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

          {/* Hover Crosshair & Indicators */}
          {hoverIndex !== null && (
            <g>
              <line
                x1={getX(hoverIndex)}
                y1={0}
                x2={getX(hoverIndex)}
                y2={innerHeight}
                stroke={theme.palette.primary.main}
                strokeWidth={1.5}
                strokeDasharray="3 3"
                opacity={0.7}
              />
              {series.map((s, idx) => {
                const val = activeDataPoint?.[s.dataKey];
                if (typeof val !== "number") return null;
                const color =
                  s.color || bklitChartPalette[isDark ? "dark" : "light"].series[idx % 5];
                const cx = getX(hoverIndex);
                const cy = getY(val);
                return (
                  <g key={s.dataKey}>
                    <circle
                      cx={cx}
                      cy={cy}
                      r={6}
                      fill={color}
                      stroke={theme.palette.background.default}
                      strokeWidth={2.5}
                    />
                    <circle
                      cx={cx}
                      cy={cy}
                      r={10}
                      fill={color}
                      opacity={0.25}
                    />
                  </g>
                );
              })}
            </g>
          )}
        </g>
      </svg>

      <ChartTooltip
        visible={hoverIndex !== null}
        x={mousePos.x}
        y={mousePos.y}
        title={activeDataPoint ? String(activeDataPoint[xKey] ?? "") : undefined}
        items={tooltipItems}
      />
    </Box>
  );
};

export default AreaChart;
