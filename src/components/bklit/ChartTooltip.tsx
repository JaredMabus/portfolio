import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { TooltipItem } from "./types";

export interface ChartTooltipProps {
  visible: boolean;
  x: number;
  y: number;
  title?: string;
  items: TooltipItem[];
  containerWidth?: number;
}

export const ChartTooltip: React.FC<ChartTooltipProps> = ({
  visible,
  x,
  y,
  title,
  items,
  containerWidth,
}) => {
  const theme = useTheme();

  if (!visible || items.length === 0) return null;

  return (
    <Box
      sx={{
        position: "absolute",
        left: x + 16,
        top: Math.max(8, y - 40),
        pointerEvents: "none",
        zIndex: 999,
        backgroundColor: theme.palette.mode === "dark" ? "#1E1E1E" : "#FFFFFF",
        color: theme.palette.text.primary,
        borderRadius: "12px",
        padding: "12px 16px",
        boxShadow:
          theme.palette.mode === "dark"
            ? "0 14px 32px rgba(0, 0, 0, 0.6), 0 4px 10px rgba(0, 0, 0, 0.3)"
            : "0 12px 28px -4px rgba(0, 0, 0, 0.14), 0 4px 10px rgba(0, 0, 0, 0.06)",
        border: `1px solid ${theme.palette.border.state.outlinedBorder}`,
        minWidth: 150,
        maxWidth: 260,
        transition: "transform 0.08s ease-out, opacity 0.15s ease-in-out",
        transform: "translate3d(0, 0, 0)",
      }}
    >
      {title && (
        <Typography
          variant="caption"
          sx={{
            display: "block",
            color: theme.palette.text.primary,
            fontWeight: 700,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            mb: 0.75,
            fontSize: "0.74rem",
            borderBottom: `1px solid ${theme.palette.outline.state.outlinedBorder}`,
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
                  flexShrink: 0,
                }}
              />
              <Typography
                variant="body2"
                sx={{
                  color: theme.palette.text.secondary,
                  fontSize: "0.8rem",
                  fontWeight: 500,
                  whiteSpace: "nowrap",
                }}
              >
                {item.name}
              </Typography>
            </Box>
            <Typography
              variant="body2"
              sx={{
                color: theme.palette.text.primary,
                fontSize: "0.85rem",
                fontWeight: 700,
                fontVariantNumeric: "tabular-nums",
                whiteSpace: "nowrap",
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
