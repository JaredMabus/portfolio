import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { TooltipItem } from "./types";

interface ChartTooltipProps {
  visible: boolean;
  x: number;
  y: number;
  title?: string;
  items: TooltipItem[];
}

export const ChartTooltip: React.FC<ChartTooltipProps> = ({
  visible,
  x,
  y,
  title,
  items,
}) => {
  const theme = useTheme();

  if (!visible || items.length === 0) return null;

  return (
    <Box
      sx={{
        position: "absolute",
        left: x + 16,
        top: Math.max(12, y - 40),
        pointerEvents: "none",
        zIndex: 10,
        backgroundColor: "var(--chart-tooltip-background, rgba(18, 28, 22, 0.95))",
        color: "var(--chart-tooltip-text, #ffffff)",
        backdropFilter: "blur(12px)",
        borderRadius: "12px",
        padding: "12px 16px",
        boxShadow: "0 12px 24px -4px rgba(0, 0, 0, 0.4), 0 4px 8px -2px rgba(0, 0, 0, 0.2)",
        border: `1px solid ${theme.palette.border.state.outlinedBorder}`,
        minWidth: 140,
        maxWidth: 240,
        transition: "transform 0.08s ease-out, opacity 0.15s ease-in-out",
        transform: "translate3d(0, 0, 0)",
      }}
    >
      {title && (
        <Typography
          variant="caption"
          sx={{
            display: "block",
            color: "rgba(255, 255, 255, 0.7)",
            fontWeight: 600,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            mb: 0.75,
            fontSize: "0.72rem",
            borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
            pb: 0.5,
          }}
        >
          {title}
        </Typography>
      )}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
        {items.map((item, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  backgroundColor: item.color,
                  boxShadow: `0 0 6px ${item.color}`,
                }}
              />
              <Typography
                variant="body2"
                sx={{
                  color: "rgba(255, 255, 255, 0.85)",
                  fontSize: "0.8rem",
                  fontWeight: 500,
                }}
              >
                {item.name}
              </Typography>
            </Box>
            <Typography
              variant="body2"
              sx={{
                color: "#ffffff",
                fontSize: "0.85rem",
                fontWeight: 700,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {typeof item.value === "number" ? item.value.toLocaleString() : item.value}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ChartTooltip;
