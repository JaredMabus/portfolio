import React, { useRef, useState, useEffect } from "react";
import { Box, Typography, Chip, useTheme } from "@mui/material";

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

  const activeColor = color || theme.palette.primary.main;

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
            <stop offset="0%" stopColor="#428C6A" />
            <stop offset="50%" stopColor="#6ABA94" />
            <stop offset="100%" stopColor="#92D2B3" />
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
              filter: `drop-shadow(0 0 10px ${activeColor}66)`,
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
              filter: `drop-shadow(0 0 6px ${activeColor})`,
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
          transform: "translate(-50%, -20%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            color: theme.palette.text.primary,
            fontSize: { xs: "2rem", md: "2.4rem" },
            lineHeight: 1,
            letterSpacing: "-0.03em",
          }}
        >
          {clamped}%
        </Typography>
        <Typography
          variant="caption"
          sx={{
            color: theme.palette.text.secondary,
            fontWeight: 600,
            mt: 0.5,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            fontSize: "0.72rem",
          }}
        >
          {label}
        </Typography>
        <Chip
          size="small"
          label={sublabel}
          sx={{
            mt: 1,
            height: 20,
            fontSize: "0.68rem",
            fontWeight: 700,
            backgroundColor: theme.palette.primaryContainer.main,
            color: theme.palette.primaryContainer.contrastText,
            borderRadius: "6px",
          }}
        />
      </Box>
    </Box>
  );
};

export default GaugeChart;
