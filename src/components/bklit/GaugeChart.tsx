import React, { useRef, useState, useEffect } from "react";
import { Box, Typography, Chip, useTheme } from "@mui/material";
import { useBklitPalette } from "./theme";

export interface GaugeChartProps {
  value: number; // 0 to 100
  min?: number;
  max?: number;
  label?: string;
  sublabel?: string;
  height?: number | string;
  strokeWidth?: number;
  color?: string;
}

export const GaugeChart: React.FC<GaugeChartProps> = ({
  value,
  min = 0,
  max = 100,
  label = "Score",
  sublabel = "Optimal Performance",
  height = "100%",
  strokeWidth = 14,
  color,
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const { series, scale } = useBklitPalette();
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 280, height: 200 });

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

  const clamped = Math.max(min, Math.min(max, value));
  const fraction = (clamped - min) / (max - min || 1);

  const centerX = dimensions.width / 2;
  const centerY = dimensions.height * 0.75;
  const radius = Math.min(centerX - strokeWidth, centerY - strokeWidth) * 0.85;

  const startAngle = Math.PI;
  const endAngle = 2 * Math.PI;
  const currentAngle = startAngle + fraction * Math.PI;

  const activeColor = color || series[0];

  const createArc = (start: number, end: number) => {
    const x1 = centerX + radius * Math.cos(start);
    const y1 = centerY + radius * Math.sin(start);
    const x2 = centerX + radius * Math.cos(end);
    const y2 = centerY + radius * Math.sin(end);
    const largeArc = end - start > Math.PI ? 1 : 0;
    return `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`;
  };

  const bgArc = createArc(startAngle, endAngle);
  const fillArc = fraction > 0 ? createArc(startAngle, currentAngle) : "";

  return (
    <Box
      ref={containerRef}
      sx={{
        width: "100%",
        height,
        position: "relative",
        display: "flex",
        flexDirection: "column",
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
        <defs>
          <linearGradient id="gauge-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={isDark ? scale[2] : scale[1]} />
            <stop offset="100%" stopColor={activeColor} />
          </linearGradient>
        </defs>

        {/* Track background */}
        <path
          d={bgArc}
          fill="none"
          stroke="var(--chart-grid, rgba(255, 255, 255, 0.08))"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />

        {/* Value Arc */}
        {fillArc && (
          <path
            d={fillArc}
            fill="none"
            stroke="url(#gauge-grad)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            style={{
              transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
              filter: `drop-shadow(0 0 10px ${activeColor}44)`,
            }}
          />
        )}

        {/* Needle Marker Indicator */}
        {fraction > 0 && (
          <circle
            cx={centerX + radius * Math.cos(currentAngle)}
            cy={centerY + radius * Math.sin(currentAngle)}
            r={strokeWidth * 0.45}
            fill="#ffffff"
            stroke={activeColor}
            strokeWidth={3}
            style={{
              filter: `drop-shadow(0 0 6px ${activeColor}66)`,
              transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          />
        )}
      </svg>

      <Box
        sx={{
          position: "absolute",
          top: "46%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pointerEvents: "none",
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            color: theme.palette.text.primary,
            letterSpacing: "-0.03em",
            fontSize: { xs: "2.2rem", md: "2.75rem" },
            lineHeight: 1,
          }}
        >
          {clamped}
          <Typography
            component="span"
            variant="h6"
            sx={{
              fontWeight: 600,
              color: theme.palette.text.secondary,
              ml: 0.5,
              fontSize: "1.2rem",
            }}
          >
            %
          </Typography>
        </Typography>
        <Typography
          variant="caption"
          sx={{
            color: theme.palette.text.secondary,
            fontWeight: 600,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            fontSize: "0.72rem",
            mt: 0.5,
          }}
        >
          {label}
        </Typography>
      </Box>

      {sublabel && (
        <Chip
          size="small"
          label={sublabel}
          sx={{
            mt: -2,
            height: 24,
            fontSize: "0.7rem",
            fontWeight: 600,
            backgroundColor: theme.palette.surfaceContainerHigh.main,
            color: theme.palette.text.secondary,
            border: `1px solid ${theme.palette.border.state.outlinedBorder}`,
            borderRadius: "8px",
          }}
        />
      )}
    </Box>
  );
};

export default GaugeChart;
