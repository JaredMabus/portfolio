import React from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CodeOutlinedIcon from "@mui/icons-material/CodeOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import DesignServicesOutlinedIcon from "@mui/icons-material/DesignServicesOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import { useTheme, alpha } from "@mui/material/styles";

import useDocumentTitle from "@/utils/useDocumentTitle";
import MainLayout from "@/components/layouts/MainLayout";
import ProfileAvatar from "@/components/ProfileAvatar";
import { RadarChart } from "@/components/bklit";

const PILLARS = [
  {
    icon: CodeOutlinedIcon,
    title: "Full-Stack Engineering",
    description:
      "Developing resilient client-server architectures with React, TypeScript, Node/Express, and modern REST APIs designed for scale.",
    tags: ["React 18", "TypeScript", "Node.js", "Express", "REST APIs"],
    dimensions: ["Frontend Arch", "Backend APIs"],
  },
  {
    icon: BarChartOutlinedIcon,
    title: "Data & Visual Analytics",
    description:
      "Transforming complex, multidimensional datasets into interactive dashboards, custom chart components, and actionable intelligence.",
    tags: ["Data Viz", "SQL", "Python", "ETL Pipelines", "BI Solutions"],
    dimensions: ["Data & SQL", "Data Viz"],
  },
  {
    icon: DesignServicesOutlinedIcon,
    title: "UI/UX & Design Systems",
    description:
      "Crafting cohesive Material 3 design tokens, fluid micro-interactions, responsive layouts, and accessible component libraries.",
    tags: ["Material 3", "Responsive UI", "Micro-animations", "Figma"],
    dimensions: ["Design Systems", "UI Motion"],
  },
];

const SPECIALTY_RADAR_DATA = [
  { dimension: "Frontend Arch", score: 88, benchmark: 78 },
  { dimension: "Backend APIs", score: 84, benchmark: 75 },
  { dimension: "Data & SQL", score: 86, benchmark: 72 },
  { dimension: "Data Viz", score: 89, benchmark: 70 },
  { dimension: "Design Systems", score: 92, benchmark: 76 },
  { dimension: "UI Motion", score: 80, benchmark: 74 },
];

const HIGHLIGHTS = [
  { label: "3+ Years Experience", icon: AutoAwesomeOutlinedIcon },
  { label: "Full-Stack Web Dev Bootcamp", icon: SchoolOutlinedIcon },
  // { label: "React 18 & TypeScript 5", icon: CodeOutlinedIcon },
];

export default function Home() {
  const theme = useTheme();
  useDocumentTitle("About Me");
  const [hoveredSpecialty, setHoveredSpecialty] = React.useState<number | null>(null);

  return (
    <MainLayout animatePage={true} showBackground={true}>
      <Box
        component="section"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: { xs: 5, md: 8 },
          pb: 8,
          pt: { xs: 2, md: 4 },
          width: "100%",
        }}
      >
        {/* Hero Section */}
        <Stack
          component="section"
          aria-label="Introduction"
          sx={{
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            width: "100%",
            gap: { xs: 4, sm: 5, md: 6 },
            mt: { xs: 1, sm: 2 },
            mb: { xs: 2, sm: 3 },
          }}
        >
          {/* Left Text & Call-To-Action Container */}
          <Stack
            sx={{
              flexDirection: "column",
              justifyContent: "start",
              alignItems: "flex-start",
              textAlign: "left",
              position: "relative",
              width: "fit-content",
              "&::before": {
                content: '""',
                position: "absolute",
                inset: "-32px -40px",
                background: `radial-gradient(ellipse at 45% 50%, ${theme.palette.background.default} 0%, ${theme.palette.background.default} 52%, ${alpha(theme.palette.background.default, 0.85)} 70%, ${alpha(theme.palette.background.default, 0.35)} 86%, transparent 100%)`,
                filter: "blur(14px)",
                zIndex: 0,
                pointerEvents: "none",
                borderRadius: "36px",
              },
              "& > *": {
                position: "relative",
                zIndex: 1,
              },
            }}
          >
            <Typography
              variant="h1"
              sx={{
                fontWeight: 700,
                letterSpacing: "-0.03em",
                fontSize: { xs: "2.6rem", sm: "3.2rem", md: "3.5rem" },
                lineHeight: 1.15,
              }}
            >
              Hi, I'm Jared
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                color: theme.palette.text.secondary,
                fontWeight: 500,
                fontSize: { xs: "1rem", sm: "1.05rem" },
                mt: 0.5,
                mb: 2,
                pl: { xs: 0.5, sm: 0.75 },
              }}
            >
              Full Stack Developer
            </Typography>
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              sx={{
                pt: 1,
              }}
            >
              <Button
                component={Link}
                to="/projects"
                variant="contained"
                endIcon={
                  <ArrowForwardIosIcon
                    sx={{
                      fontSize: "15px !important",
                      transition: "transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                  />
                }
                sx={{
                  color: theme.palette.surface.main,
                  backgroundColor: theme.palette.primary.main,
                  fontWeight: 700,
                  fontSize: { xs: "1rem", sm: "1.05rem" },
                  py: 1.5,
                  px: 4,
                  borderRadius: "32px",
                  textTransform: "none",
                  letterSpacing: "-0.01em",
                  width: "fit-content",
                  boxShadow: `0 4px 16px ${theme.palette.primary.state.focus}`,
                  transition: theme.transitions.create(
                    ["background-color", "box-shadow", "transform"],
                    {
                      duration: theme.transitions.duration.standard,
                      easing: theme.transitions.easing.easeInOut,
                    }
                  ),
                  "& .MuiSvgIcon-root": {
                    color: "inherit",
                  },
                  "&:hover": {
                    backgroundColor: theme.palette.primary.high,
                    boxShadow: `0 8px 24px ${theme.palette.primary.state.focusVisible}`,
                    transform: "translateY(-2px)",
                    "& .MuiButton-endIcon .MuiSvgIcon-root": {
                      transform: "translateX(4px)",
                    },
                  },
                  "&:active": {
                    transform: "translateY(0px)",
                    boxShadow: `0 2px 8px ${theme.palette.primary.state.focus}`,
                  },
                  "&:focus-visible": {
                    outline: `2px solid ${theme.palette.primary.state.focusVisible}`,
                  },
                }}
              >
                Explore Projects
              </Button>
            </Stack>
          </Stack>

          {/* Right Profile Artwork Container */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              maxWidth: { xs: "280px", sm: "340px", md: "440px" },
              flexShrink: 0,
            }}
          >
            <ProfileAvatar />
          </Box>
        </Stack>

        {/* Enhanced Modern About Me Section */}
        <Stack
          component="section"
          aria-label="About Me"
          sx={{
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            gap: 2,
            position: "relative",
          }}
          >
          {/* Section Heading Outside Card */}
          <Stack
            alignItems="flex-start"
            spacing={1}
            sx={{
              width: "100%",
              maxWidth: "920px",
              position: "relative",
              "&::before": {
                content: '""',
                position: "absolute",
                inset: "-16px -24px",
                background: `radial-gradient(ellipse at 20% 50%, ${theme.palette.background.default} 0%, ${theme.palette.background.default} 55%, ${alpha(theme.palette.background.default, 0.85)} 75%, ${alpha(theme.palette.background.default, 0.35)} 90%, transparent 100%)`,
                filter: "blur(12px)",
                zIndex: 0,
                pointerEvents: "none",
                borderRadius: "20px",
              },
              "& > *": {
                position: "relative",
                zIndex: 1,
              },
            }}
          >
            <Box
              component="span"
              sx={{
                display: "inline-flex",
                alignItems: "center",
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.08em",
                color: theme.palette.primary.main,
                backgroundColor: alpha(theme.palette.primary.main, 0.12),
                border: `1px solid ${alpha(theme.palette.primary.main, 0.25)}`,
                borderRadius: "20px",
                px: 1.5,
                py: 0.5,
              }}
            >
              BACKGROUND
            </Box>
          </Stack>

          <Box
            sx={{
              width: "100%",
              maxWidth: "920px",
              display: "flex",
              justifyContent: "flex-start",
              position: "relative",
              "&::before": {
                content: '""',
                position: "absolute",
                inset: "-16px -24px",
                background: `radial-gradient(ellipse at 20% 50%, ${theme.palette.background.default} 0%, ${theme.palette.background.default} 55%, ${alpha(
                  theme.palette.background.default,
                  0.85
                )} 75%, ${alpha(theme.palette.background.default, 0.35)} 90%, transparent 100%)`,
                filter: "blur(12px)",
                zIndex: 0,
                pointerEvents: "none",
                borderRadius: "20px",
              },
              "& > *": {
                position: "relative",
                zIndex: 1,
              },
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                letterSpacing: "-0.025em",
              }}
            >
              About me
            </Typography>
          </Box>

          {/* Highlights Badge Strip */}
          <Stack
            direction="row"
            flexWrap="wrap"
            gap={1.5}
            sx={{
              width: "100%",
              maxWidth: "920px",
              position: "relative",
              "& > *": {
                zIndex: 1,
                position: "relative",
              },
            }}
          >
            {HIGHLIGHTS.map((item, index) => {
              const IconComp = item.icon;
              return (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    px: 2,
                    py: 0.75,
                    borderRadius: "24px",
                    backgroundColor: theme.palette.surfaceContainerHigh.main,
                    border: `1px solid ${theme.palette.outline.state.outlinedBorder}`,
                    boxShadow: `0 2px 8px ${alpha(theme.palette.common.black, 0.04)}`,
                    transition: "all 0.25s ease",
                    "&:hover": {
                      borderColor: theme.palette.primary.main,
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  <IconComp sx={{ fontSize: 18, color: theme.palette.primary.main }} />
                  <Typography
                    variant="caption"
                    sx={{
                      fontWeight: 600,
                      fontSize: "0.825rem",
                      color: theme.palette.text.primary,
                    }}
                  >
                    {item.label}
                  </Typography>
                </Box>
              );
            })}
          </Stack>

          {/* Narrative Story Card */}
          <Box
            sx={{
              width: "100%",
              maxWidth: "920px",
              p: { xs: 3, sm: 4, md: 4.5 },
              borderRadius: "24px",
              backgroundColor: theme.palette.surfaceContainerLow.main,
              border: `1px solid ${theme.palette.outline.state.outlinedBorder}`,
              boxShadow: `0 4px 20px ${alpha(theme.palette.common.black, 0.04)}`,
              position: "relative",
              overflow: "hidden",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "3px",
                background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${alpha(
                  theme.palette.primary.main,
                  0.2
                )})`,
              },
            }}
          >
            <Stack spacing={2.5}>
              {/* Story Paragraphs */}
              <Typography
                variant="body1"
                sx={{
                  lineHeight: 1.8,
                  fontSize: { xs: "1rem", sm: "1.08rem" },
                  color: theme.palette.text.secondary,
                  "& strong": {
                    color: theme.palette.text.primary,
                    fontWeight: 700,
                  },
                }}
              >
                I'm a <strong>full-stack developer and data analyst</strong> who enjoys turning data and ideas into meaningful applications. My passion began in college, during countless caffeine-fueled research projects, where I discovered how code could manage, analyze, and tell stories with data.
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  lineHeight: 1.8,
                  fontSize: { xs: "1rem", sm: "1.08rem" },
                  color: theme.palette.text.secondary,
                  "& strong": {
                    color: theme.palette.text.primary,
                    fontWeight: 700,
                  },
                }}
              >
                Over time, my passion for <strong>data analytics and web development</strong> merged into a single craft. I enjoy the creative freedom of frontend design, blending visual storytelling with interface design, while maintaining well-structured data models and robust API endpoints.
              </Typography>
            </Stack>
          </Box>

          {/* Specialties Section Title */}
          <Box
            sx={{
              width: "100%",
              maxWidth: "920px",
              mt: { xs: 1.5, md: 2.5 },
              display: "flex",
              justifyContent: "flex-start",
              position: "relative",
              "&::before": {
                content: '""',
                position: "absolute",
                inset: "-16px -24px",
                background: `radial-gradient(ellipse at 20% 50%, ${theme.palette.background.default} 0%, ${theme.palette.background.default} 55%, ${alpha(theme.palette.background.default, 0.85)} 75%, ${alpha(theme.palette.background.default, 0.35)} 90%, transparent 100%)`,
                filter: "blur(12px)",
                zIndex: 0,
                pointerEvents: "none",
                borderRadius: "20px",
              },
              "& > *": {
                position: "relative",
                zIndex: 1,
              },
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                letterSpacing: "-0.025em",
              }}
            >
              Specialties
            </Typography>
          </Box>

          {/* 3 Core Focus Pillars Grid */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
              gap: 3,
              width: "100%",
              maxWidth: "920px",
              mt: 0.5,
            }}
          >
            {PILLARS.map((pillar, index) => {
              const IconComp = pillar.icon;
              const isCardActive = hoveredSpecialty === index;
              return (
                <Box
                  key={index}
                  onMouseEnter={() => setHoveredSpecialty(index)}
                  onMouseLeave={() => setHoveredSpecialty(null)}
                  onClick={() => setHoveredSpecialty((prev) => (prev === index ? null : index))}
                  sx={{
                    height: "100%",
                    p: 3,
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: "20px",
                    backgroundColor: theme.palette.surfaceContainerLow.main,
                    border: `1px solid ${
                      isCardActive
                        ? theme.palette.primary.main
                        : theme.palette.outline.state.outlinedBorder
                    }`,
                    boxShadow: isCardActive
                      ? `0 12px 28px ${alpha(theme.palette.primary.main, 0.16)}`
                      : "none",
                    transform: isCardActive ? "translateY(-4px)" : "none",
                    cursor: "pointer",
                    transition: theme.transitions.create(
                      ["transform", "box-shadow", "border-color"],
                      {
                        duration: theme.transitions.duration.standard,
                        easing: theme.transitions.easing.easeInOut,
                      }
                    ),
                    "&:hover": {
                      transform: "translateY(-4px)",
                      borderColor: theme.palette.primary.main,
                      boxShadow: `0 12px 28px ${alpha(theme.palette.primary.main, 0.16)}`,
                    },
                  }}
                >
                  {/* Icon Header */}
                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: alpha(theme.palette.primary.main, isCardActive ? 0.2 : 0.12),
                      color: theme.palette.primary.main,
                      mb: 2,
                      transition: "background-color 0.2s ease",
                    }}
                  >
                    <IconComp sx={{ fontSize: 24 }} />
                  </Box>

                  {/* Title & Description */}
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      fontSize: "1.15rem",
                      letterSpacing: "-0.01em",
                      mb: 1,
                      color: isCardActive ? theme.palette.primary.main : theme.palette.text.primary,
                      transition: "color 0.2s ease",
                    }}
                  >
                    {pillar.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: theme.palette.text.secondary,
                      lineHeight: 1.6,
                      fontSize: "0.9rem",
                      mb: 2.5,
                      flexGrow: 1,
                    }}
                  >
                    {pillar.description}
                  </Typography>

                  {/* Tech Skill Tags */}
                  <Stack direction="row" flexWrap="wrap" gap={0.75}>
                    {pillar.tags.map((tag, tIdx) => (
                      <Box
                        key={tIdx}
                        component="span"
                        sx={{
                          fontSize: "0.75rem",
                          fontWeight: 600,
                          borderRadius: "8px",
                          backgroundColor: theme.palette.surfaceContainerHigh.main,
                          color: theme.palette.text.secondary,
                          px: 1,
                          py: 0.35,
                          display: "inline-flex",
                          alignItems: "center",
                        }}
                      >
                        {tag}
                      </Box>
                    ))}
                  </Stack>
                </Box>
              );
            })}
          </Box>

          {/* Specialty Radar Chart Card */}
          <Box
            sx={{
              width: "100%",
              maxWidth: "920px",
              p: { xs: 2.5, sm: 3.5, md: 4 },
              borderRadius: "24px",
              backgroundColor: theme.palette.surfaceContainerLow.main,
              border: `1px solid ${theme.palette.outline.state.outlinedBorder}`,
              boxShadow: `0 4px 20px ${alpha(theme.palette.common.black, 0.04)}`,
              position: "relative",
              overflow: "hidden",
              mt: 1,
            }}
          >
            {/* Header & Legend */}
            <Stack
              direction={{ xs: "column", sm: "row" }}
              alignItems={{ xs: "flex-start", sm: "center" }}
              justifyContent="space-between"
              gap={1.5}
              sx={{ mb: 2 }}
            >
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    fontSize: { xs: "1.1rem", md: "1.2rem" },
                    letterSpacing: "-0.01em",
                  }}
                >
                  Skill Distribution Radar
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: theme.palette.text.secondary,
                    fontSize: "0.85rem",
                  }}
                >
                  Proficiency across Full-Stack, Data Analytics, and UI/UX disciplines vs senior benchmark
                </Typography>
              </Box>

              {/* Legend Strip */}
              <Stack direction="row" alignItems="center" gap={2} sx={{ flexShrink: 0 }}>
                <Stack direction="row" alignItems="center" gap={0.75}>
                  <Box
                    sx={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      backgroundColor: theme.palette.primary.main,
                    }}
                  />
                  <Typography variant="caption" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                    My Proficiency
                  </Typography>
                </Stack>
                <Stack direction="row" alignItems="center" gap={0.75}>
                  <Box
                    sx={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      backgroundColor: theme.palette.mode === "dark" ? "#605D62" : "#AEAAAF",
                    }}
                  />
                  <Typography variant="caption" sx={{ fontWeight: 500, color: theme.palette.text.secondary }}>
                    Senior Benchmark
                  </Typography>
                </Stack>
              </Stack>
            </Stack>

            {/* Radar Chart Component */}
            <Box sx={{ width: "100%", height: { xs: 290, sm: 330, md: 350 }, position: "relative" }}>
              <RadarChart
                data={SPECIALTY_RADAR_DATA}
                series={[
                  {
                    dataKey: "score",
                    label: "My Proficiency",
                    color: theme.palette.primary.main,
                  },
                  {
                    dataKey: "benchmark",
                    label: "Senior Benchmark",
                    color: theme.palette.mode === "dark" ? "#605D62" : "#AEAAAF",
                  },
                ]}
                dimensionKey="dimension"
                levels={4}
                height="100%"
                highlightedDimensions={
                  hoveredSpecialty !== null ? PILLARS[hoveredSpecialty].dimensions : []
                }
              />
            </Box>
          </Box>
        </Stack>
      </Box>
    </MainLayout>
  );
}
