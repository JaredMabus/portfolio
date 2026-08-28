import React from "react";
import { Box, useTheme } from "@mui/material";
import { alpha } from "@mui/material/styles";

export default function BackgroundGrid() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const waveStroke = isDark
    ? "rgba(255, 255, 255, 0.04)"
    : "rgba(0, 0, 0, 0.04)";

  const accentStroke = alpha(theme.palette.primary.main, isDark ? 0.22 : 0.2);

  const organicFill1 = alpha(theme.palette.primary.main, isDark ? 0.04 : 0.05);
  const nestedFill1 = alpha(theme.palette.primary.main, isDark ? 0.065 : 0.05);
  const nestedStroke1 = alpha(theme.palette.primary.main, isDark ? 0.25 : 0.1);

  const organicFill2 = alpha(theme.palette.primary.main, isDark ? 0.02 : 0.05);
  const nestedFill2 = alpha(theme.palette.primary.main, isDark ? 0.045 : 0.05);
  const nestedStroke2 = alpha(theme.palette.primary.main, isDark ? 0.18 : 0.1);

  const anchorBg = isDark ? "#181818" : "#FFFFFF";

  return (
    <Box
      aria-hidden="true"
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 0,
        overflow: "hidden",
      }}
    >
      {/* 1. Primary Organic Fluid Shape with Nested Outline Layer */}
      <Box
        sx={{
          position: "absolute",
          top: { xs: "-5%", md: "-10%" },
          right: { xs: "-25%", sm: "-10%", md: "-5%" },
          width: { xs: "90vw", sm: "65vw", md: "50vw" },
          maxWidth: "750px",
          height: "auto",
          opacity: 0.7,
          filter: { xs: "blur(35px)", md: "blur(50px)" },
        }}
      >
        <svg
          viewBox="0 0 440 285"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: "100%", height: "auto" }}
        >
          {/* Outer Organic Base Fill */}
          <path
            d="M438.536 72.4968C438.009 154.13 329.034 186.449 332.716 241.775C336.399 297.101 -159.522 275.339 54.5955 216.403C268.713 157.467 200.793 18.347 200.793 18.347C200.793 18.347 439.063 -9.13695 438.536 72.4968Z"
            fill={organicFill1}
          />
          {/* Nested Inner Organic Contour with Outline Effect */}
          <g transform="translate(220, 142.5) scale(0.82) translate(-220, -142.5)">
            <path
              d="M438.536 72.4968C438.009 154.13 329.034 186.449 332.716 241.775C336.399 297.101 -159.522 275.339 54.5955 216.403C268.713 157.467 200.793 18.347 200.793 18.347C200.793 18.347 439.063 -9.13695 438.536 72.4968Z"
              fill={nestedFill1}
              stroke={nestedStroke1}
              strokeWidth="2.5"
            />
          </g>
        </svg>
      </Box>

      {/* 2. Mirrored Secondary Organic Fluid Accent with Nested Outline Layer */}
      <Box
        sx={{
          position: "absolute",
          bottom: { xs: "-10%", md: "-15%" },
          left: { xs: "-30%", sm: "-15%", md: "-8%" },
          width: { xs: "100vw", sm: "70vw", md: "55vw" },
          maxWidth: "800px",
          height: "auto",
          transform: "rotate(180deg)",
          opacity: 0.5,
          filter: { xs: "blur(40px)", md: "blur(55px)" },
        }}
      >
        <svg
          viewBox="0 0 440 285"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: "100%", height: "auto" }}
        >
          {/* Outer Organic Base Fill */}
          <path
            d="M438.536 72.4968C438.009 154.13 329.034 186.449 332.716 241.775C336.399 297.101 -159.522 275.339 54.5955 216.403C268.713 157.467 200.793 18.347 200.793 18.347C200.793 18.347 439.063 -9.13695 438.536 72.4968Z"
            fill={organicFill2}
          />
          {/* Nested Inner Organic Contour with Outline Effect */}
          <g transform="translate(220, 142.5) scale(0.82) translate(-220, -142.5)">
            <path
              d="M438.536 72.4968C438.009 154.13 329.034 186.449 332.716 241.775C336.399 297.101 -159.522 275.339 54.5955 216.403C268.713 157.467 200.793 18.347 200.793 18.347C200.793 18.347 439.063 -9.13695 438.536 72.4968Z"
              fill={nestedFill2}
              stroke={nestedStroke2}
              strokeWidth="2.5"
            />
          </g>
        </svg>
      </Box>

      {/* 3. Design & Vector Drafting Layout Guides with Bezier Splines, Tangents & Compass Arcs */}
      <Box
        sx={{
          position: "absolute",
          top: { xs: "64px", sm: "72px" },
          left: 0,
          right: 0,
          bottom: 0,
          maskImage:
            "linear-gradient(to bottom, black 0%, black 15%, rgba(0,0,0,0.35) 45%, transparent 75%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 0%, black 15%, rgba(0,0,0,0.35) 45%, transparent 75%)",
        }}
      >
        <svg
          viewBox="0 0 1440 828"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMin slice"
          style={{ width: "100%", height: "100%" }}
        >
          <g transform="translate(0, 20)">
            {/* Drafting Compass Construction Arcs */}
            <circle cx="1160" cy="160" r="140" fill="none" stroke={waveStroke} strokeWidth="1" strokeDasharray="4 8" />
            <circle cx="1160" cy="160" r="220" fill="none" stroke={waveStroke} strokeWidth="0.8" strokeDasharray="2 10" />
            <circle cx="280" cy="220" r="110" fill="none" stroke={waveStroke} strokeWidth="1" strokeDasharray="3 7" />

            {/* Precision Crosshair Markers */}
            <g transform="translate(180, 75)">
              <line x1="-7" y1="0" x2="7" y2="0" stroke={waveStroke} strokeWidth="1.2" />
              <line x1="0" y1="-7" x2="0" y2="7" stroke={waveStroke} strokeWidth="1.2" />
            </g>
            <g transform="translate(860, 115)">
              <line x1="-7" y1="0" x2="7" y2="0" stroke={accentStroke} strokeWidth="1.2" opacity="0.8" />
              <line x1="0" y1="-7" x2="0" y2="7" stroke={accentStroke} strokeWidth="1.2" opacity="0.8" />
            </g>
            <g transform="translate(1260, 80)">
              <line x1="-7" y1="0" x2="7" y2="0" stroke={waveStroke} strokeWidth="1.2" />
              <line x1="0" y1="-7" x2="0" y2="7" stroke={waveStroke} strokeWidth="1.2" />
            </g>

            {/* 1. Primary Bezier Spline with Vector Anchor Nodes & Tangent Handles */}
            <path
              d="M -50 70 C 240 10, 520 160, 820 55 C 1120 -30, 1340 110, 1550 65"
              stroke={accentStroke}
              strokeWidth="1.4"
            />
            {/* Tangent Handle at Inflection Point (520, 160) */}
            <line x1="475" y1="175" x2="565" y2="145" stroke={accentStroke} strokeWidth="0.9" strokeDasharray="2 2" opacity="0.7" />
            <circle cx="475" cy="175" r="2.5" fill={accentStroke} />
            <circle cx="565" cy="145" r="2.5" fill={accentStroke} />

            {/* Vector Anchor Points (Figma / Pen tool style square anchors) */}
            {[
              { x: 240, y: 10 },
              { x: 520, y: 160 },
              { x: 820, y: 55 },
              { x: 1120, y: -30 },
              { x: 1340, y: 110 },
            ].map((pt, i) => (
              <rect
                key={`anchor-${i}`}
                x={pt.x - 3}
                y={pt.y - 3}
                width={6}
                height={6}
                rx={1}
                fill={anchorBg}
                stroke={accentStroke}
                strokeWidth={1.4}
              />
            ))}

            {/* 2. Secondary Flowing Harmonic Vector Arc */}
            <path
              d="M -50 145 C 220 75, 600 235, 960 125 C 1240 45, 1420 185, 1550 135"
              stroke={waveStroke}
              strokeWidth="1.2"
            />
            {/* Anchor Squares on Secondary Arc */}
            {[
              { x: 220, y: 75 },
              { x: 600, y: 235 },
              { x: 960, y: 125 },
              { x: 1420, y: 185 },
            ].map((pt, i) => (
              <rect
                key={`sec-anchor-${i}`}
                x={pt.x - 2.5}
                y={pt.y - 2.5}
                width={5}
                height={5}
                rx={1}
                fill={anchorBg}
                stroke={waveStroke}
                strokeWidth={1.2}
              />
            ))}

            {/* 3. Horizontal Alignment Baseline Guide */}
            <path
              d="M -50 190 L 1550 190"
              stroke={waveStroke}
              strokeWidth="1"
              strokeDasharray="4 8"
            />

            {/* 4. Sweeping Interpolation Spline */}
            <path
              d="M -50 230 C 280 160, 660 310, 1000 210 C 1260 140, 1420 260, 1550 220"
              stroke={waveStroke}
              strokeWidth="1.2"
            />

            {/* 5. Delicate Accent Contour Wave */}
            <path
              d="M -50 290 C 260 215, 620 370, 940 275 C 1220 195, 1400 325, 1550 285"
              stroke={accentStroke}
              strokeWidth="1.2"
              strokeDasharray="6 6"
            />

            {/* 6. Baseline Foundation Guide */}
            <path
              d="M -50 350 L 1550 350"
              stroke={waveStroke}
              strokeWidth="1"
              strokeDasharray="6 12"
            />
          </g>
        </svg>
      </Box>
    </Box>
  );
}
