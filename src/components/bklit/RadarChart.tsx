import React, { useState, useRef, useMemo, useEffect } from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { animated, useSpring } from "@react-spring/web";
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
  highlightColors?: Record<string, string>;
  highlightedSeriesKey?: string;
  hideZeroValues?: boolean;
  size?: "default" | "large";
}

export const RadarChart: React.FC<RadarChartProps> = ({
  data,
  series,
  dimensionKey = "dimension",
  levels = 4,
  height = "100%",
  maxValue: propMax,
  highlightedDimensions = [],
  highlightColors = {},
  highlightedSeriesKey,
  hideZeroValues = false,
  size = "default",
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
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
  const isLarge = size === "large";
  const radius =
    Math.min(centerX, centerY) *
    (isNarrow ? (isLarge ? 0.62 : 0.54) : isLarge ? 0.76 : 0.68);
  const labelOffset = isLarge ? 24 : 18;
  const labelFontSize = isNarrow
    ? isLarge
      ? "11.5"
      : "9.5"
    : isLarge
    ? "13.5"
    : "11";
  const hasHighlights = highlightedDimensions.length > 0;
  const springConfig = { tension: 210, friction: 24, mass: 1 };
  const springFrom = prefersReducedMotion ? 1 : 0;
  const springImmediate = prefersReducedMotion;
  const gridSpring = useSpring({
    from: { progress: springFrom },
    to: { progress: 1 },
    immediate: springImmediate,
    config: springConfig,
  });
  const axisSpring = useSpring({
    from: { progress: springFrom },
    to: { progress: 1 },
    delay: prefersReducedMotion ? 0 : 90,
    immediate: springImmediate,
    config: springConfig,
  });
  const labelSpring = useSpring({
    from: { progress: springFrom },
    to: { progress: 1 },
    delay: prefersReducedMotion ? 0 : 180,
    immediate: springImmediate,
    config: springConfig,
  });
  const areaSpring = useSpring({
    from: { progress: springFrom },
    to: { progress: 1 },
    delay: prefersReducedMotion ? 0 : 270,
    immediate: springImmediate,
    config: springConfig,
  });

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
    return series.flatMap((s, idx) => {
      const val = activePoint[s.dataKey];
      if (hideZeroValues && val === 0) return [];
      const color =
        s.color || bklitChartPalette[isDark ? "dark" : "light"].series[idx % 5];
      return [{
        name: s.label || s.dataKey,
        value: typeof val === "number" ? `${val}%` : String(val ?? "-"),
        color,
      }];
    });
  }, [activePoint, series, isDark, hideZeroValues]);

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
        <animated.g
          opacity={gridSpring.progress}
          transform={gridSpring.progress.to(
            (progress) =>
              `translate(${centerX} ${centerY}) scale(${progress}) translate(${-centerX} ${-centerY})`
          )}
        >
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
        </animated.g>

        {/* Axis Spokes */}
        <g>
          {data.map((d, i) => {
            const angle = i * angleSlice - Math.PI / 2;
            const labelX = centerX + (radius + labelOffset) * Math.cos(angle);
            const labelY = centerY + (radius + labelOffset) * Math.sin(angle);
            const metric = String(d[dimensionKey]);
            const isHovered = hoverMetric === metric;
            const isHighlighted = highlightedDimensions.includes(metric);
            const highlightColor =
              highlightColors[metric] || theme.palette.primary.main;
            const plottedRadius = series.reduce((outermostRadius, currentSeries) => {
              const value = d[currentSeries.dataKey];
              if (typeof value !== "number") return outermostRadius;
              return Math.max(outermostRadius, (value / maxValue) * radius);
            }, 0);
            const markerClearance = isLarge ? 11 : 10;
            const spokeRadius = isHighlighted
              ? Math.max(0, plottedRadius - markerClearance)
              : radius;
            const spokeX = centerX + spokeRadius * Math.cos(angle);
            const spokeY = centerY + spokeRadius * Math.sin(angle);

            return (
              <g key={i}>
                <animated.line
                  x1={centerX}
                  y1={centerY}
                  x2={axisSpring.progress.to(
                    (progress) => centerX + (spokeX - centerX) * progress
                  )}
                  y2={axisSpring.progress.to(
                    (progress) => centerY + (spokeY - centerY) * progress
                  )}
                  stroke={
                    isHighlighted
                      ? highlightColor
                      : "var(--chart-grid, rgba(255, 255, 255, 0.08))"
                  }
                  strokeWidth={isHighlighted ? 2.5 : 1}
                  style={{
                    opacity: hasHighlights ? (isHighlighted ? 1 : 0.25) : 1,
                    transition: "all 0.25s ease",
                  }}
                />
                <animated.text
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
                      ? highlightColor
                      : theme.palette.text.secondary
                  }
                  fontSize={labelFontSize}
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
                    opacity: labelSpring.progress.to(
                      (progress) =>
                        progress * (hasHighlights ? (isHighlighted ? 1 : 0.35) : 1)
                    ),
                    transition: "all 0.25s ease",
                  }}
                >
                  {metric}
                </animated.text>
              </g>
            );
          })}
        </g>

        {/* Series Polygons */}
        <g>
          {seriesPolygons.map((s, idx) => (
            <g key={idx}>
              <animated.polygon
                points={areaSpring.progress.to((progress) =>
                  s.pointCoords
                    .map(
                      (point) =>
                        `${centerX + (point.x - centerX) * progress},${
                          centerY + (point.y - centerY) * progress
                        }`
                    )
                    .join(" ")
                )}
                fill={
                  highlightedSeriesKey && highlightedSeriesKey !== s.dataKey
                    ? theme.palette.outline.main
                    : s.color
                }
                fillOpacity={areaSpring.progress.to(
                  (progress) =>
                    progress *
                    (highlightedSeriesKey && highlightedSeriesKey !== s.dataKey
                      ? 0.06
                      : isDark
                      ? 0.25
                      : 0.2)
                )}
                stroke={
                  highlightedSeriesKey && highlightedSeriesKey !== s.dataKey
                    ? theme.palette.outline.main
                    : s.color
                }
                strokeWidth={2}
                strokeOpacity={areaSpring.progress.to(
                  (progress) =>
                    progress *
                    (highlightedSeriesKey && highlightedSeriesKey !== s.dataKey ? 0.35 : 1)
                )}
                strokeLinejoin="round"
                style={{
                  filter:
                    highlightedSeriesKey && highlightedSeriesKey !== s.dataKey
                    ? "none"
                    : `drop-shadow(0 0 10px ${s.color}44)`,
                  transition: "all 0.3s ease",
                }}
              />
              {s.pointCoords.map((pt, pIdx) => {
                if (hideZeroValues && pt.val === 0) return null;
                const isHovered = hoverMetric === pt.metric;
                const isPtHighlighted = highlightedDimensions.includes(pt.metric);
                const isSeriesMuted = Boolean(
                  highlightedSeriesKey && highlightedSeriesKey !== s.dataKey
                );
                const pointHighlightColor =
                  highlightColors[pt.metric] || theme.palette.primary.main;
                const pointRadius = isPtHighlighted
                  ? isLarge
                    ? 8.5
                    : 7.5
                  : isHovered
                  ? isLarge
                    ? 7
                    : 6
                  : isLarge
                  ? 4.5
                  : 3.5;
                return (
                  <animated.circle
                    key={pIdx}
                    cx={areaSpring.progress.to(
                      (progress) => centerX + (pt.x - centerX) * progress
                    )}
                    cy={areaSpring.progress.to(
                      (progress) => centerY + (pt.y - centerY) * progress
                    )}
                    r={areaSpring.progress.to((progress) => pointRadius * progress)}
                    fill={
                      isPtHighlighted
                        ? pointHighlightColor
                        : isSeriesMuted
                        ? theme.palette.outline.main
                        : s.color
                    }
                    stroke={isPtHighlighted ? "#FFFFFF" : theme.palette.background.default}
                    strokeWidth={isPtHighlighted ? 2.5 : 1.5}
                    cursor="pointer"
                    onMouseEnter={() => {
                      setHoverMetric(pt.metric);
                      setMousePos({ x: pt.x, y: pt.y });
                    }}
                    onMouseLeave={() => setHoverMetric(null)}
                    style={{
                      opacity: areaSpring.progress.to(
                        (progress) =>
                          progress *
                          (isSeriesMuted ? 0.25 : hasHighlights ? (isPtHighlighted ? 1 : 0.3) : 1)
                      ),
                      filter: isPtHighlighted
                        ? `drop-shadow(0 0 8px ${pointHighlightColor})`
                        : undefined,
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
