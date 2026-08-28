import React from "react";
import { Box, useTheme } from "@mui/material";
import { alpha } from "@mui/material/styles";

export default function BackgroundGrid() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const waveStroke = isDark
    ? "rgba(255, 255, 255, 0.055)"
    : "rgba(0, 0, 0, 0.06)";

  const accentStroke = alpha(theme.palette.primary.main, isDark ? 0.35 : 0.25);

  const organicFill1 = alpha(theme.palette.primary.main, isDark ? 0.06 : 0.07);
  const organicFill2 = alpha(theme.palette.primary.main, isDark ? 0.035 : 0.04);

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
      {/* 1. Primary Organic Fluid Shape (Matching Profile Picture vector curvature) */}
      <Box
        sx={{
          position: "absolute",
          top: { xs: "-5%", md: "-10%" },
          right: { xs: "-25%", sm: "-10%", md: "-5%" },
          width: { xs: "90vw", sm: "65vw", md: "50vw" },
          maxWidth: "750px",
          height: "auto",
          opacity: 0.85,
          filter: { xs: "blur(25px)", md: "blur(35px)" },
        }}
      >
        <svg
          viewBox="0 0 440 285"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: "100%", height: "auto" }}
        >
          <path
            d="M438.536 72.4968C438.009 154.13 329.034 186.449 332.716 241.775C336.399 297.101 -159.522 275.339 54.5955 216.403C268.713 157.467 200.793 18.347 200.793 18.347C200.793 18.347 439.063 -9.13695 438.536 72.4968Z"
            fill={organicFill1}
          />
        </svg>
      </Box>

      {/* 2. Mirrored Secondary Organic Fluid Accent in Bottom-Left */}
      <Box
        sx={{
          position: "absolute",
          bottom: { xs: "-10%", md: "-15%" },
          left: { xs: "-30%", sm: "-15%", md: "-8%" },
          width: { xs: "100vw", sm: "70vw", md: "55vw" },
          maxWidth: "800px",
          height: "auto",
          transform: "rotate(180deg)",
          opacity: 0.7,
          filter: { xs: "blur(35px)", md: "blur(45px)" },
        }}
      >
        <svg
          viewBox="0 0 440 285"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: "100%", height: "auto" }}
        >
          <path
            d="M438.536 72.4968C438.009 154.13 329.034 186.449 332.716 241.775C336.399 297.101 -159.522 275.339 54.5955 216.403C268.713 157.467 200.793 18.347 200.793 18.347C200.793 18.347 439.063 -9.13695 438.536 72.4968Z"
            fill={organicFill2}
          />
        </svg>
      </Box>

      {/* 3. Organic Flowing Contour Wave Lines with Radial Vignette Mask */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          maskImage:
            "radial-gradient(ellipse 90% 75% at 50% 25%, black 30%, transparent 85%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 90% 75% at 50% 25%, black 30%, transparent 85%)",
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
            d="M-100 80 C 250 -20, 650 200, 1050 60 C 1250 -10, 1450 140, 1600 80"
            stroke={waveStroke}
            strokeWidth="1.2"
          />
          <path
            d="M-100 170 C 280 70, 680 290, 1080 150 C 1280 80, 1470 230, 1600 170"
            stroke={accentStroke}
            strokeWidth="1.2"
          />
          <path
            d="M-100 260 C 230 160, 630 380, 1030 240 C 1230 170, 1430 320, 1600 260"
            stroke={waveStroke}
            strokeWidth="1.2"
          />
          <path
            d="M-100 350 C 310 250, 710 470, 1110 330 C 1310 260, 1490 410, 1600 350"
            stroke={waveStroke}
            strokeWidth="1.2"
          />
          <path
            d="M-100 440 C 260 340, 660 560, 1060 420 C 1260 350, 1450 500, 1600 440"
            stroke={accentStroke}
            strokeWidth="1.2"
            strokeDasharray="6 6"
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
