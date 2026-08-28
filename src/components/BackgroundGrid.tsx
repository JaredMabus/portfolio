import React from "react";
import { Box, useTheme } from "@mui/material";
import { alpha } from "@mui/material/styles";

export default function BackgroundGrid() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const waveStroke = isDark
    ? "rgba(255, 255, 255, 0.038)"
    : "rgba(0, 0, 0, 0.038)";

  const accentStroke = alpha(theme.palette.primary.main, isDark ? 0.15 : 0.15);

  const organicFill1 = alpha(theme.palette.primary.main, isDark ? 0.04 : 0.05);
  const nestedFill1 = alpha(theme.palette.primary.main, isDark ? 0.065 : 0.05);
  const nestedStroke1 = alpha(theme.palette.primary.main, isDark ? 0.25 : 0.1);

  const organicFill2 = alpha(theme.palette.primary.main, isDark ? 0.02 : 0.05);
  const nestedFill2 = alpha(theme.palette.primary.main, isDark ? 0.045 : 0.05);
  const nestedStroke2 = alpha(theme.palette.primary.main, isDark ? 0.18 : 0.1);

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

      {/* 3. Organic Flowing Contour Wave Lines with Smooth Content Fade-Out Gradient Mask */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          maskImage:
            "linear-gradient(to bottom, black 0%, black 12%, rgba(0,0,0,0.35) 45%, transparent 75%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 0%, black 12%, rgba(0,0,0,0.35) 45%, transparent 75%)",
        }}
      >
        <svg
          viewBox="0 0 1440 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          style={{ width: "100%", height: "100%" }}
        >
          <path
            d="M-100 50 C 250 -40, 650 160, 1050 30 C 1250 -30, 1450 110, 1600 50"
            stroke={accentStroke}
            strokeWidth="1.2"
          />
          <path
            d="M-100 135 C 280 40, 680 250, 1080 115 C 1280 45, 1470 195, 1600 135"
            stroke={waveStroke}
            strokeWidth="1.2"
          />
          <path
            d="M-100 225 C 230 130, 630 340, 1030 205 C 1230 135, 1430 285, 1600 225"
            stroke={waveStroke}
            strokeWidth="1.2"
          />
          <path
            d="M-100 315 C 310 215, 710 435, 1110 295 C 1310 225, 1490 375, 1600 315"
            stroke={accentStroke}
            strokeWidth="1.2"
            strokeDasharray="6 6"
          />
          <path
            d="M-100 410 C 260 310, 660 530, 1060 390 C 1260 320, 1450 470, 1600 410"
            stroke={waveStroke}
            strokeWidth="1.2"
          />
          <path
            d="M-100 530 C 340 430, 740 650, 1140 510 C 1330 440, 1510 590, 1600 530"
            stroke={waveStroke}
            strokeWidth="1.2"
          />
          <path
            d="M-100 620 C 290 520, 690 740, 1090 600 C 1290 530, 1470 680, 1600 620"
            stroke={waveStroke}
            strokeWidth="1.2"
          />
          <path
            d="M-100 710 C 370 610, 770 830, 1170 690 C 1350 620, 1530 770, 1600 710"
            stroke={waveStroke}
            strokeWidth="1.2"
          />
          <path
            d="M-100 800 C 320 700, 720 920, 1120 780 C 1310 710, 1490 860, 1600 800"
            stroke={waveStroke}
            strokeWidth="1.2"
          />
        </svg>
      </Box>
    </Box>
  );
}
