import React from "react";
import { Box, Card, Typography, Button, Chip, useTheme } from "@mui/material";

export interface ChartContainerProps {
  title?: string;
  subtitle?: string;
  badge?: string;
  filterOptions?: string[];
  activeFilter?: string;
  onFilterChange?: (filter: string) => void;
  children: React.ReactNode;
  legendItems?: { label: string; color: string }[];
  height?: number | string;
}

export const ChartContainer: React.FC<ChartContainerProps> = ({
  title,
  subtitle,
  badge,
  filterOptions,
  activeFilter,
  onFilterChange,
  children,
  legendItems,
  height = 360,
}) => {
  const theme = useTheme();

  return (
    <Card
      elevation={0}
      sx={{
        width: "100%",
        borderRadius: "20px",
        backgroundColor: theme.palette.mode === "dark" ? "#1E1E1E" : "#FFFFFF",
        border: `1px solid ${theme.palette.border.state.outlinedBorder}`,
        boxShadow:
          theme.palette.mode === "light"
            ? "0 4px 20px -4px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.03)"
            : "0 16px 36px -12px rgba(0, 0, 0, 0.35)",
        p: { xs: 2.5, md: 3 },
        position: "relative",
        zIndex: 1,
        overflow: "visible",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
          borderColor: theme.palette.primary.state.outlinedBorder,
          boxShadow:
            theme.palette.mode === "light"
              ? "0 14px 36px -10px rgba(106, 186, 148, 0.12)"
              : "0 18px 42px -10px rgba(0, 0, 0, 0.45)",
        },
      }}
    >
      {(title || filterOptions || badge) && (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 1.5,
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              {title && (
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    fontSize: { xs: "1.1rem", md: "1.25rem" },
                    color: theme.palette.text.primary,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {title}
                </Typography>
              )}
              {badge && (
                <Chip
                  size="small"
                  label={badge}
                  sx={{
                    height: 24,
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    backgroundColor: theme.palette.primaryContainer.main,
                    color: theme.palette.primaryContainer.contrastText,
                    borderRadius: "8px",
                  }}
                />
              )}
            </Box>
            {subtitle && (
              <Typography
                variant="body2"
                sx={{
                  color: theme.palette.text.secondary,
                  fontSize: "0.85rem",
                }}
              >
                {subtitle}
              </Typography>
            )}
          </Box>

          {filterOptions && filterOptions.length > 0 && (
            <Box
              sx={{
                display: "inline-flex",
                p: "4px",
                borderRadius: "12px",
                backgroundColor: theme.palette.surfaceContainerHigh.main,
                border: `1px solid ${theme.palette.border.state.outlinedBorder}`,
              }}
            >
              {filterOptions.map((opt) => {
                const isActive = activeFilter === opt;
                return (
                  <Button
                    key={opt}
                    size="small"
                    onClick={() => onFilterChange?.(opt)}
                    sx={{
                      minWidth: 44,
                      height: 28,
                      px: 1.5,
                      fontSize: "0.75rem",
                      fontWeight: isActive ? 700 : 500,
                      borderRadius: "8px",
                      color: isActive
                        ? theme.palette.primary.contrastText
                        : theme.palette.text.secondary,
                      backgroundColor: isActive
                        ? theme.palette.primary.main
                        : "transparent",
                      boxShadow: isActive
                        ? `0 2px 8px ${theme.palette.primary.state.focusVisible}`
                        : "none",
                      "&:hover": {
                        backgroundColor: isActive
                          ? theme.palette.primary.main
                          : theme.palette.surfaceContainer.state.hover,
                        color: isActive
                          ? theme.palette.primary.contrastText
                          : theme.palette.text.primary,
                      },
                    }}
                  >
                    {opt}
                  </Button>
                );
              })}
            </Box>
          )}
        </Box>
      )}

      {legendItems && legendItems.length > 0 && (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, alignItems: "center" }}>
          {legendItems.map((item, idx) => (
            <Box key={idx} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Box
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  backgroundColor: item.color,
                  boxShadow: `0 0 6px ${item.color}`,
                }}
              />
              <Typography
                variant="caption"
                sx={{
                  color: theme.palette.text.secondary,
                  fontWeight: 600,
                  fontSize: "0.75rem",
                }}
              >
                {item.label}
              </Typography>
            </Box>
          ))}
        </Box>
      )}

      <Box
        sx={{
          width: "100%",
          height,
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {children}
      </Box>
    </Card>
  );
};

export default ChartContainer;
