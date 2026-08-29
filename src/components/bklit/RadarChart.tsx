import React, { useState, useRef, useMemo, useEffect } from "react";
import { Box, useTheme } from "@mui/material";
import { RadarPoint, SeriesConfig } from "./types";
import { ChartTooltip } from "./ChartTooltip";
import { bklitChartPalette } from "./theme";

export interface RadarChartProps {
  data: RadarPoint[];
  series: SeriesConfig[];
  dimensionKey?: string;
  levels?: number;
  height?: number | string;
  maxValue?: number;
  highlightedDimensions?: string[];
}

export const RadarChart: React.FC<RadarChartProps> = ({
  data,
  series,
  dimensionKey = "dimension",
  levels = 4,
  height = "100%",
  maxValue: propMax,
  highlightedDimensions = [],
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 360, height: 300 });
  const [hoverMetric, setHoverMetric] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

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

  const totalAxes = data.length;
  const centerX = dimensions.width / 2;
  const centerY = dimensions.height / 2;
  const isNarrow = dimensions.width < 420;
  const radius = Math.min(centerX, centerY) * (isNarrow ? 0.54 : 0.68);
  const hasHighlights = highlightedDimensions.length > 0;

  // Max value
  const maxValue = useMemo(() => {
    if (propMax) return propMax;
    let max = 0;
    for (const d of data) {
      for (const s of series) {
        const val = d[s.dataKey];
        if (typeof val === "number" && val > max) max = val;
      }
    }
    return max || 100;
  }, [data, series, propMax]);

  const angleSlice = (2 * Math.PI) / totalAxes;

  // Generate web concentric polygon rings
  const levelPolygons = useMemo(() => {
    const polygons: string[] = [];
    for (let level = 1; level <= levels; level++) {
      const levelRadius = (radius / levels) * level;
      let points = "";
      for (let i = 0; i < totalAxes; i++) {
        const angle = i * angleSlice - Math.PI / 2;
        const x = centerX + levelRadius * Math.cos(angle);
        const y = centerY + levelRadius * Math.sin(angle);
        points += `${x},${y} `;
      }
      polygons.push(points.trim());
    }
    return polygons;
  }, [radius, levels, totalAxes, angleSlice, centerX, centerY]);

  // Series Polygons
  const seriesPolygons = useMemo(() => {
    return series.map((s, sIdx) => {
      let points = "";
      const pointCoords: { x: number; y: number; val: number; metric: string }[] = [];

      for (let i = 0; i < totalAxes; i++) {
        const d = data[i];
        const val = typeof d[s.dataKey] === "number" ? (d[s.dataKey] as number) : 0;
        const r = (val / maxValue) * radius;
        const angle = i * angleSlice - Math.PI / 2;
        const x = centerX + r * Math.cos(angle);
        const y = centerY + r * Math.sin(angle);
        points += `${x},${y} `;
        pointCoords.push({ x, y, val, metric: String(d[dimensionKey]) });
      }

      const color =
        s.color || bklitChartPalette[isDark ? "dark" : "light"].series[sIdx % 5];

      return {
        ...s,
        points: points.trim(),
        pointCoords,
        color,
      };
    });
  }, [series, totalAxes, data, maxValue, radius, angleSlice, centerX, centerY, dimensionKey, isDark]);

  const activePoint = useMemo(() => {
    if (!hoverMetric) return null;
    return data.find((d) => String(d[dimensionKey]) === hoverMetric);
  }, [data, hoverMetric, dimensionKey]);

  const tooltipItems = useMemo(() => {
    if (!activePoint) return [];
    return series.map((s, idx) => {
      const val = activePoint[s.dataKey];
      const color =
        s.color || bklitChartPalette[isDark ? "dark" : "light"].series[idx % 5];
      return {
        name: s.label || s.dataKey,
        value: typeof val === "number" ? `${val}%` : String(val ?? "-"),
        color,
      };
    });
  }, [activePoint, series, isDark]);

  return (
    <Box
      ref={containerRef}
      sx={{
        width: "100%",
        height,
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        userSelect: "none",
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        style={{ overflow: "visible" }}
      >
        {/* Concentric Grid Rings */}
        <g>
          {levelPolygons.map((points, i) => (
            <polygon
              key={i}
              points={points}
              fill="none"
              stroke="var(--chart-grid, rgba(255, 255, 255, 0.08))"
              strokeWidth={1}
              strokeDasharray={i === levels - 1 ? undefined : "3 3"}
              style={{
                opacity: hasHighlights ? 0.4 : 1,
                transition: "opacity 0.25s ease",
              }}
            />
          ))}
        </g>

        {/* Axis Spokes */}
        <g>
          {data.map((d, i) => {
            const angle = i * angleSlice - Math.PI / 2;
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);
            const labelX = centerX + (radius + 18) * Math.cos(angle);
            const labelY = centerY + (radius + 18) * Math.sin(angle);
            const metric = String(d[dimensionKey]);
            const isHovered = hoverMetric === metric;
            const isHighlighted = highlightedDimensions.includes(metric);

            return (
              <g key={i}>
                <line
                  x1={centerX}
                  y1={centerY}
                  x2={x}
                  y2={y}
                  stroke={
                    isHighlighted
                      ? theme.palette.primary.main
                      : "var(--chart-grid, rgba(255, 255, 255, 0.08))"
                  }
                  strokeWidth={isHighlighted ? 2.5 : 1}
                  style={{
                    opacity: hasHighlights ? (isHighlighted ? 1 : 0.25) : 1,
                    transition: "all 0.25s ease",
                  }}
                />
                <text
                  x={labelX}
                  y={labelY + 4}
                  textAnchor={
                    Math.abs(Math.cos(angle)) < 0.1
                      ? "middle"
                      : Math.cos(angle) > 0
                      ? "start"
                      : "end"
                  }
                  fill={
                    isHighlighted || isHovered
                      ? theme.palette.primary.main
                      : theme.palette.text.secondary
                  }
                  fontSize={isNarrow ? "9.5" : "11"}
                  fontWeight={isHighlighted || isHovered ? 800 : 500}
                  fontFamily="inherit"
                  cursor="pointer"
                  onMouseEnter={(e) => {
                    setHoverMetric(metric);
                    const rect = containerRef.current?.getBoundingClientRect();
                    if (rect) {
                      setMousePos({ x: labelX, y: labelY });
                    }
                  }}
                  onMouseLeave={() => setHoverMetric(null)}
                  style={{
                    opacity: hasHighlights ? (isHighlighted ? 1 : 0.35) : 1,
                    transition: "all 0.25s ease",
                  }}
                >
                  {metric}
                </text>
              </g>
            );
          })}
        </g>

        {/* Series Polygons */}
        <g>
          {seriesPolygons.map((s, idx) => (
            <g key={idx}>
              <polygon
                points={s.points}
                fill={s.color}
                fillOpacity={isDark ? 0.25 : 0.2}
                stroke={s.color}
                strokeWidth={2}
                strokeLinejoin="round"
                style={{
                  filter: `drop-shadow(0 0 10px ${s.color}44)`,
                  transition: "all 0.3s ease",
                }}
              />
              {s.pointCoords.map((pt, pIdx) => {
                const isHovered = hoverMetric === pt.metric;
                const isPtHighlighted = highlightedDimensions.includes(pt.metric);
                return (
                  <circle
                    key={pIdx}
                    cx={pt.x}
                    cy={pt.y}
                    r={isPtHighlighted ? 7.5 : isHovered ? 6 : 3.5}
                    fill={isPtHighlighted ? theme.palette.primary.main : s.color}
                    stroke={isPtHighlighted ? "#FFFFFF" : theme.palette.background.default}
                    strokeWidth={isPtHighlighted ? 2.5 : 1.5}
                    cursor="pointer"
                    onMouseEnter={() => {
                      setHoverMetric(pt.metric);
                      setMousePos({ x: pt.x, y: pt.y });
                    }}
                    onMouseLeave={() => setHoverMetric(null)}
                    style={{
                      opacity: hasHighlights ? (isPtHighlighted ? 1 : 0.3) : 1,
                      filter: isPtHighlighted ? `drop-shadow(0 0 8px ${theme.palette.primary.main})` : undefined,
                      transition: "all 0.25s ease",
                    }}
                  />
                );
              })}
            </g>
          ))}
        </g>
      </svg>

      <ChartTooltip
        visible={hoverMetric !== null}
        x={mousePos.x}
        y={mousePos.y}
        containerWidth={dimensions.width}
        title={hoverMetric ?? undefined}
        items={tooltipItems}
      />
    </Box>
  );
};

export default RadarChart;
