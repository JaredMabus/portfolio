import React from "react";
import { Box, Card, Typography, Chip, useTheme, alpha } from "@mui/material";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import TrendingDownOutlinedIcon from "@mui/icons-material/TrendingDownOutlined";

export interface MetricCardProps {
  label?: string;
  title?: string;
  value: string | number;
  delta?: {
    value: string | number;
    trend: "up" | "down" | "neutral";
    label?: string;
  };
  sparklineData?: number[];
  color?: string;
  icon?: React.ReactNode;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  title,
  value,
  delta,
  sparklineData = [12, 18, 14, 22, 28, 24, 32, 38],
  color,
  icon,
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const displayTitle = title || label || "Metric";
  const sparklineColor =
    color || (isDark ? theme.palette.text.primary : theme.palette.neutral.n20);

  // Generate SVG sparkline path
  const minVal = Math.min(...sparklineData);
  const maxVal = Math.max(...sparklineData);
  const range = maxVal - minVal || 1;
  const w = 120;
  const h = 40;

  const points = sparklineData.map((v, i) => {
    const x = (i / (sparklineData.length - 1)) * w;
    const y = h - ((v - minVal) / range) * (h - 8) - 4;
    return { x, y };
  });

  let linePath = `M ${points[0].x},${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(i - 1, 0)];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[Math.min(i + 2, points.length - 1)];

    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;

    linePath += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p2.x},${p2.y}`;
  }

  const areaPath = `${linePath} L ${w},${h} L 0,${h} Z`;
  const gradId = `sparkline-grad-${displayTitle.replace(/\s+/g, "-").toLowerCase()}`;

  // Semantic trend styling based on theme.palette.success & theme.palette.error
  const getTrendStyle = (trend: "up" | "down" | "neutral") => {
    if (trend === "up") {
      const successColor = theme.palette.success.main;
      return {
        bg: alpha(successColor, isDark ? 0.16 : 0.12),
        border: alpha(successColor, 0.28),
        color: successColor,
      };
    }
    if (trend === "down") {
      const errorColor = theme.palette.error.main;
      return {
        bg: alpha(errorColor, isDark ? 0.16 : 0.12),
        border: alpha(errorColor, 0.28),
        color: errorColor,
      };
    }
    return {
      bg: theme.palette.surfaceContainerHigh.main,
      border: theme.palette.border.state.outlinedBorder,
      color: theme.palette.text.secondary,
    };
  };

  const trendStyle = delta ? getTrendStyle(delta.trend) : null;

  return (
    <Card
      elevation={0}
      sx={{
        p: 2.5,
        borderRadius: "18px",
        backgroundColor: theme.palette.mode === "dark" ? "#1E1E1E" : "#FFFFFF",
        border: `1px solid ${theme.palette.border.state.outlinedBorder}`,
        boxShadow:
          theme.palette.mode === "light"
            ? "0 2px 10px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.02)"
            : "0 4px 16px rgba(0, 0, 0, 0.3)",
        position: "relative",
        zIndex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: 1.5,
        transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
          borderColor: theme.palette.outline.main,
          transform: "translateY(-2px)",
          boxShadow:
            theme.palette.mode === "light"
              ? "0 12px 28px -8px rgba(0, 0, 0, 0.08), 0 4px 12px rgba(0, 0, 0, 0.03)"
              : "0 14px 32px -8px rgba(0, 0, 0, 0.45)",
        },
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <Box>
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
            {displayTitle}
          </Typography>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              color: theme.palette.text.primary,
              letterSpacing: "-0.02em",
              mt: 0.5,
              fontSize: { xs: "1.4rem", md: "1.65rem" },
            }}
          >
            {value}
          </Typography>
        </Box>
        {icon && (
          <Box
            sx={{
              p: 1,
              borderRadius: "10px",
              backgroundColor: theme.palette.surfaceContainerHigh.main,
              color: theme.palette.text.secondary,
              border: `1px solid ${theme.palette.border.state.outlinedBorder}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {icon}
          </Box>
        )}
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          mt: 0.5,
        }}
      >
        {delta && trendStyle && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Chip
              size="small"
              icon={
                delta.trend === "up" ? (
                  <TrendingUpOutlinedIcon sx={{ fontSize: "16px !important" }} />
                ) : (
                  <TrendingDownOutlinedIcon sx={{ fontSize: "16px !important" }} />
                )
              }
              label={delta.value}
              sx={{
                height: 24,
                fontSize: "0.72rem",
                fontWeight: 700,
                backgroundColor: trendStyle.bg,
                border: `1px solid ${trendStyle.border}`,
                color: trendStyle.color,
                borderRadius: "8px",
                "& .MuiChip-icon": {
                  color: trendStyle.color,
                },
              }}
            />
            {delta.label && (
              <Typography
                variant="caption"
                sx={{
                  color: theme.palette.text.secondary,
                  fontSize: "0.7rem",
                }}
              >
                {delta.label}
              </Typography>
            )}
          </Box>
        )}

        {/* Sparkline mini SVG */}
        <Box sx={{ width: 100, height: 32 }}>
          <svg width="100%" height="100%" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
            <defs>
              <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={sparklineColor} stopOpacity={0.25} />
                <stop offset="100%" stopColor={sparklineColor} stopOpacity={0} />
              </linearGradient>
            </defs>
            <path d={areaPath} fill={`url(#${gradId})`} />
            <path
              d={linePath}
              fill="none"
              stroke={sparklineColor}
              strokeWidth={2}
              strokeLinecap="round"
            />
          </svg>
        </Box>
      </Box>
    </Card>
  );
};

export default MetricCard;
