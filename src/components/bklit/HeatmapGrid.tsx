import React, { useState, useRef } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { HeatmapCell } from "./types";
import { ChartTooltip } from "./ChartTooltip";
import { bklitChartPalette } from "./theme";

export interface HeatmapGridProps {
  data: HeatmapCell[];
  weeks?: number;
  height?: number | string;
}

export const HeatmapGrid: React.FC<HeatmapGridProps> = ({
  data,
  weeks = 26,
  height = "100%",
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const containerRef = useRef<HTMLDivElement>(null);

  const [hoveredCell, setHoveredCell] = useState<HeatmapCell | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const days = ["Mon", "Wed", "Fri"];
  const cellSize = 12;
  const cellGap = 4;

  // Scale colors: Level 0 (empty) through Level 4 (highest)
  const scaleColors = bklitChartPalette[isDark ? "dark" : "light"].scale;

  const getCellColor = (level: number) => {
    if (level === 0) {
      return isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.04)";
    }
    return scaleColors[level % scaleColors.length];
  };

  return (
    <Box
      ref={containerRef}
      sx={{
        width: "100%",
        height,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        overflowX: "auto",
        py: 1,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.5 }}>
        {/* Day of week labels */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: 7 * (cellSize + cellGap) - cellGap,
            pt: "4px",
          }}
        >
          {days.map((day, i) => (
            <Typography
              key={i}
              variant="caption"
              sx={{
                fontSize: "0.68rem",
                color: theme.palette.text.secondary,
                fontWeight: 600,
                lineHeight: 1,
              }}
            >
              {day}
            </Typography>
          ))}
        </Box>

        {/* Matrix Grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateRows: `repeat(7, ${cellSize}px)`,
            gridAutoFlow: "column",
            gridAutoColumns: `${cellSize}px`,
            gap: `${cellGap}px`,
          }}
        >
          {data.slice(0, weeks * 7).map((cell, index) => {
            const isHovered = hoveredCell?.date === cell.date;
            const bg = getCellColor(cell.level);

            return (
              <Box
                key={index}
                sx={{
                  width: cellSize,
                  height: cellSize,
                  borderRadius: "4px",
                  backgroundColor: bg,
                  border: isHovered
                    ? `1px solid ${theme.palette.primary.main}`
                    : `1px solid ${isDark ? "rgba(255, 255, 255, 0.03)" : "rgba(0, 0, 0, 0.03)"}`,
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                  transform: isHovered ? "scale(1.25)" : "scale(1)",
                  zIndex: isHovered ? 2 : 1,
                  boxShadow: isHovered
                    ? `0 0 8px ${theme.palette.primary.main}88`
                    : "none",
                }}
                onMouseEnter={(e) => {
                  setHoveredCell(cell);
                  const rect = containerRef.current?.getBoundingClientRect();
                  if (rect) {
                    setMousePos({
                      x: e.clientX - rect.left,
                      y: e.clientY - rect.top,
                    });
                  }
                }}
                onMouseLeave={() => setHoveredCell(null)}
              />
            );
          })}
        </Box>
      </Box>

      {/* Legend Scale */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mt: 2,
          alignSelf: "flex-end",
          px: 1,
        }}
      >
        <Typography
          variant="caption"
          sx={{ fontSize: "0.7rem", color: theme.palette.text.secondary }}
        >
          Less
        </Typography>
        {[0, 1, 2, 3, 4].map((lvl) => (
          <Box
            key={lvl}
            sx={{
              width: 12,
              height: 12,
              borderRadius: "4px",
              backgroundColor: getCellColor(lvl),
              border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)"}`,
            }}
          />
        ))}
        <Typography
          variant="caption"
          sx={{ fontSize: "0.7rem", color: theme.palette.text.secondary }}
        >
          More
        </Typography>
      </Box>

      <ChartTooltip
        visible={hoveredCell !== null}
        x={mousePos.x}
        y={mousePos.y}
        title={hoveredCell?.date}
        items={
          hoveredCell
            ? [
                {
                  name: "Events",
                  value: `${hoveredCell.count} commits / activities`,
                  color: getCellColor(hoveredCell.level || 1),
                },
              ]
            : []
        }
      />
    </Box>
  );
};

export default HeatmapGrid;
