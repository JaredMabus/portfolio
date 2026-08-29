import React, { useState } from "react";
import { BoxProps } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useSpring, animated } from "@react-spring/web";

interface LogoProps extends BoxProps {
  size?: number;
}

export default function Logo({ size = 32, sx, ...props }: LogoProps) {
  const theme = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  // Crisp, tactile spring physics (critically damped, zero jelly oscillation)
  const bgSpring = useSpring({
    transform: isPressed
      ? "translateY(0px) scale(0.98)"
      : isHovered
      ? "translateY(-2px) scale(1.04)"
      : "translateY(0px) scale(1)",
    boxShadow: isPressed
      ? `0 1px 3px ${theme.palette.primary.state.focus}`
      : isHovered
      ? `0 4px 14px ${theme.palette.primary.state.focusVisible}`
      : `0 2px 6px ${theme.palette.primary.state.focus}`,
    backgroundColor: isPressed
      ? theme.palette.primary.high
      : isHovered
      ? theme.palette.primary.high
      : theme.palette.primary.main,
    config: isPressed
      ? { tension: 500, friction: 32 }
      : { tension: 360, friction: 26 },
  });

  return (
    <div
      style={{
        position: "relative",
        width: size,
        height: size,
        minWidth: size,
        minHeight: size,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        userSelect: "none",
        cursor: "pointer",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsPressed(false);
      }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
    >
      {/* 1. Animated Spring Squircle Container */}
      <animated.div
        style={{
          ...bgSpring,
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          borderRadius: `${Math.max(6, Math.round(size * 0.25))}px`,
          pointerEvents: "none",
        }}
      />

      {/* 2. Completely Anchored, Stationary "J" Icon */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        <svg
          width={Math.round(size * 0.6)}
          height={Math.round(size * 0.6)}
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ display: "block" }}
        >
          <path
            d="M13.5 3.5V12.8C13.5 14.5 12.8 15.7 11.6 16.4C10.4 17.1 8.7 17.1 7.2 16.6V13.8C8.1 14.1 8.9 14.2 9.5 14.1C10.3 14.0 10.7 13.5 10.7 12.6V3.5H13.5Z"
            fill={
              theme.palette.mode === "light"
                ? theme.palette.background.default
                : theme.palette.primary.contrastText || "#FFFFFF"
            }
          />
        </svg>
      </div>
    </div>
  );
}
