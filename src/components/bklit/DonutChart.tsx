import React, { useState, useRef, useMemo, useEffect } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { DonutPoint } from "./types";
import { ChartTooltip } from "./ChartTooltip";
import { bklitChartPalette } from "./theme";

export interface DonutChartProps {
  data: DonutPoint[];
  innerRadius?: number; // 0 for pie, 0.65 for donut ring
  padAngle?: number;
  centerLabel?: string;
  centerValue?: string | number;
  height?: number | string;
  valueFormatter?: (val: number) => string;
}

export const DonutChart: React.FC<DonutChartProps> = ({
  data,
  innerRadius = 0.65,
  padAngle = 0.03,
  centerLabel = "Total",
  centerValue,
  height = "100%",
  valueFormatter = (v) => v.toLocaleString(),
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 340, height: 300 });

  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
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

  const totalValue = useMemo(() => {
    return data.reduce((sum, item) => sum + item.value, 0);
  }, [data]);

  const centerX = dimensions.width / 2;
  const centerY = dimensions.height / 2;
  const outerR = Math.min(centerX, centerY) * 0.85;
  const innerR = outerR * innerRadius;

  // Compute arc slices
  const slices = useMemo(() => {
    let currentAngle = -Math.PI / 2;
    return data.map((item, index) => {
      const fraction = totalValue > 0 ? item.value / totalValue : 0;
      const angleDelta = fraction * 2 * Math.PI;
      const startAngle = currentAngle + padAngle / 2;
      const endAngle = currentAngle + angleDelta - padAngle / 2;
      currentAngle += angleDelta;

      const color =
        item.color || bklitChartPalette[isDark ? "dark" : "light"].series[index % 5];

      return {
        ...item,
        index,
        percentage: (fraction * 100).toFixed(1),
        startAngle,
        endAngle,
        color,
      };
    });
  }, [data, totalValue, padAngle, isDark]);

  // SVG Arc generator
  const createArcPath = (
    startAngle: number,
    endAngle: number,
    rIn: number,
    rOut: number,
  ) => {
    const x1 = centerX + rOut * Math.cos(startAngle);
    const y1 = centerY + rOut * Math.sin(startAngle);
    const x2 = centerX + rOut * Math.cos(endAngle);
    const y2 = centerY + rOut * Math.sin(endAngle);

    const x3 = centerX + rIn * Math.cos(endAngle);
    const y3 = centerY + rIn * Math.sin(endAngle);
    const x4 = centerX + rIn * Math.cos(startAngle);
    const y4 = centerY + rIn * Math.sin(startAngle);

    const largeArc = endAngle - startAngle > Math.PI ? 1 : 0;

    if (rIn === 0) {
      return `M ${centerX},${centerY} L ${x1},${y1} A ${rOut},${rOut} 0 ${largeArc},1 ${x2},${y2} Z`;
    }

    return `M ${x1},${y1} A ${rOut},${rOut} 0 ${largeArc},1 ${x2},${y2} L ${x3},${y3} A ${rIn},${rIn} 0 ${largeArc},0 ${x4},${y4} Z`;
  };

  const activeSlice = hoverIndex !== null ? slices[hoverIndex] : null;

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
        <g>
          {slices.map((slice) => {
            const isHovered = hoverIndex === slice.index;
            const isDimmed = hoverIndex !== null && !isHovered;
            const rOut = isHovered ? outerR + 6 : outerR;
            const rIn = isHovered ? innerR - 2 : innerR;
            const path = createArcPath(slice.startAngle, slice.endAngle, rIn, rOut);

            return (
              <path
                key={slice.name}
                d={path}
                fill={slice.color}
                opacity={isDimmed ? 0.35 : 1}
                cursor="pointer"
                style={{
                  transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                  filter: isHovered
                    ? `drop-shadow(0 0 12px ${slice.color}88)`
                    : "none",
                }}
                onMouseEnter={(e) => {
                  setHoverIndex(slice.index);
                  const rect = e.currentTarget.getBoundingClientRect();
                  setMousePos({
                    x: centerX + (outerR * 0.5) * Math.cos((slice.startAngle + slice.endAngle) / 2),
                    y: centerY + (outerR * 0.5) * Math.sin((slice.startAngle + slice.endAngle) / 2),
                  });
                }}
                onMouseMove={(e) => {
                  const rect = containerRef.current?.getBoundingClientRect();
                  if (rect) {
                    setMousePos({
                      x: e.clientX - rect.left,
                      y: e.clientY - rect.top,
                    });
                  }
                }}
                onMouseLeave={() => setHoverIndex(null)}
              />
            );
          })}
        </g>
      </svg>

      {/* Center Label in Donut Hole */}
      {innerRadius > 0 && (
        <Box
          sx={{
            position: "absolute",
            textAlign: "center",
            pointerEvents: "none",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="caption"
            sx={{
              color: theme.palette.text.secondary,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              fontSize: "0.72rem",
            }}
          >
            {activeSlice ? activeSlice.name : centerLabel}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 800,
              color: theme.palette.text.primary,
              letterSpacing: "-0.02em",
              fontSize: { xs: "1.1rem", md: "1.3rem" },
            }}
          >
            {activeSlice
              ? `${activeSlice.percentage}%`
              : centerValue !== undefined
              ? centerValue
              : valueFormatter(totalValue)}
          </Typography>
        </Box>
      )}

      <ChartTooltip
        visible={hoverIndex !== null}
        x={mousePos.x}
        y={mousePos.y}
        containerWidth={dimensions.width}
        title={activeSlice?.name}
        items={
          activeSlice
            ? [
                {
                  name: "Value",
                  value: valueFormatter(activeSlice.value),
                  color: activeSlice.color,
                },
                {
                  name: "Share",
                  value: `${activeSlice.percentage}%`,
                  color: activeSlice.color,
                },
              ]
            : []
        }
      />
    </Box>
  );
};

export default DonutChart;
