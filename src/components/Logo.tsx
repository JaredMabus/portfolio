import React from "react";
import { Box, BoxProps } from "@mui/material";
import { useTheme } from "@mui/material/styles";

interface LogoProps extends BoxProps {
  size?: number;
}

export default function Logo({ size = 32, sx, ...props }: LogoProps) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: size,
        height: size,
        minWidth: size,
        minHeight: size,
        borderRadius: `${Math.max(6, Math.round(size * 0.25))}px`,
        backgroundColor: theme.palette.primary.main,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        userSelect: "none",
        boxShadow: `0 2px 8px ${theme.palette.primary.state.focus}`,
        transition: theme.transitions.create(
          ["background-color", "box-shadow", "transform"],
          {
            duration: theme.transitions.duration.standard,
            easing: theme.transitions.easing.easeInOut,
          }
        ),
        "&:hover": {
          backgroundColor: theme.palette.primary.high,
          boxShadow: `0 4px 12px ${theme.palette.primary.state.focusVisible}`,
          transform: "scale(1.05)",
        },
        ...sx,
      }}
      {...props}
    >
      <svg
        width={Math.round(size * 0.6)}
        height={Math.round(size * 0.6)}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13.5 3.5V12.8C13.5 14.5 12.8 15.7 11.6 16.4C10.4 17.1 8.7 17.1 7.2 16.6V13.8C8.1 14.1 8.9 14.2 9.5 14.1C10.3 14.0 10.7 13.5 10.7 12.6V3.5H13.5Z"
          fill={theme.palette.primary.contrastText || "#FFFFFF"}
        />
      </svg>
    </Box>
  );
}
