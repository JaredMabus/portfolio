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

import specialtyKpiData from "./specialtyKpiData.json";

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

const SPECIALTY_RADAR_DATA = specialtyKpiData.radar.data;
const SPECIALTY_SERIES_KEYS = specialtyKpiData.domains.map(
  (domain) => domain.key
);

const HIGHLIGHTS = [
  { label: "3+ Years Experience", icon: AutoAwesomeOutlinedIcon },
  { label: "Full-Stack Web Dev Bootcamp", icon: SchoolOutlinedIcon },
  // { label: "React 18 & TypeScript 5", icon: CodeOutlinedIcon },
];

export default function Home() {
  const theme = useTheme();
  useDocumentTitle("About Me");
  const [hoveredSpecialty, setHoveredSpecialty] = React.useState<number | null>(null);
  const [selectedSpecialty, setSelectedSpecialty] = React.useState<number | null>(null);
  const [pressedSpecialty, setPressedSpecialty] = React.useState<number | null>(null);
  const activeSpecialty = selectedSpecialty ?? hoveredSpecialty;
  const activateSpecialty = (index: number) => {
    const shouldClear = selectedSpecialty === index;

    setHoveredSpecialty(null);
    setSelectedSpecialty(shouldClear ? null : index);
    setPressedSpecialty(index);
  };
  const clearSpecialty = () => {
    setHoveredSpecialty(null);
    setSelectedSpecialty(null);
    setPressedSpecialty(null);
  };
  const specialtyColors = [
    theme.palette.primary.main,
    theme.palette.secondary.main,
    theme.palette.tertiary.main,
  ];
  const selectedDomain =
    selectedSpecialty !== null
      ? specialtyKpiData.domains[selectedSpecialty]
      : null;
  const selectedDomainColor =
    selectedSpecialty !== null
      ? specialtyColors[selectedSpecialty]
      : theme.palette.text.primary;
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
            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                letterSpacing: "-0.025em",
              }}
            >
              About me
            </Typography>
          </Stack>

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
              const isCardActive = activeSpecialty === index;
              const isCardSelected = selectedSpecialty === index;
              const specialtyColor = specialtyColors[index];
              return (
                <Box
                  key={index}
                  onMouseEnter={() => {
                    if (selectedSpecialty === null) {
                      setHoveredSpecialty(index);
                    }
                  }}
                  onMouseLeave={() => {
                    if (selectedSpecialty === null) {
                      setHoveredSpecialty(null);
                    }
                  }}
                  onAnimationEnd={() =>
                    setPressedSpecialty((current) =>
                      current === index ? null : current
                    )
                  }
                  sx={{
                    height: "100%",
                    position: "relative",
                    transform: isCardActive
                      ? "translateY(-6px) scale(1.012)"
                      : "translateY(0) scale(1)",
                    animation:
                      pressedSpecialty === index
                        ? "specialty-card-snap 240ms cubic-bezier(0.2, 0.8, 0.2, 1)"
                        : "none",
                    "@keyframes specialty-card-snap": {
                      "0%": {
                        transform: "translateY(0) scale(1)",
                      },
                      "38%": {
                        transform: "translateY(1px) scale(0.975)",
                      },
                      "72%": {
                        transform: isCardActive
                          ? "translateY(-8px) scale(1.026)"
                          : "translateY(-2px) scale(1.012)",
                      },
                      "100%": {
                        transform: isCardActive
                          ? "translateY(-6px) scale(1.012)"
                          : "translateY(0) scale(1)",
                      },
                    },
                    transition: theme.transitions.create(
                      [
                        "transform",
                        "border-color",
                        "background-color",
                        "box-shadow",
                      ],
                      {
                        duration: theme.transitions.duration.shorter,
                        easing: theme.transitions.easing.easeInOut,
                      }
                    ),
                    willChange: "transform",
                    p: 3,
                    display: "flex",
                    flexDirection: "column",
                    "@media (prefers-reduced-motion: reduce)": {
                      animation: "none",
                      transition: "none",
                      transform: "none",
                    },
                    borderRadius: "20px",
                    backgroundColor: theme.palette.surfaceContainerLow.main,
                    border: `1px solid ${isCardSelected
                        ? specialtyColor
                        : theme.palette.outline.state.outlinedBorder
                      }`,
                    boxShadow: isCardSelected
                      ? `0 12px 28px ${alpha(specialtyColor, 0.16)}`
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
                      borderColor: isCardSelected
                        ? specialtyColor
                        : theme.palette.outline.state.outlinedBorder,
                      boxShadow: isCardSelected
                        ? `0 12px 28px ${alpha(specialtyColor, 0.16)}`
                        : "none",
                    },
                  }}
                >
                  <Box
                    component="button"
                    type="button"
                    aria-label={`${isCardSelected ? "Clear" : "Apply"
                      } ${pillar.title} filter`}
                    aria-pressed={isCardSelected}
                    onClick={() => activateSpecialty(index)}
                    sx={{
                      position: "absolute",
                      inset: 0,
                      zIndex: 1,
                      width: "100%",
                      height: "100%",
                      border: 0,
                      borderRadius: "inherit",
                      background: "transparent",
                      cursor: "pointer",
                      "&:focus-visible": {
                        outline: `3px solid ${specialtyColor}`,
                        outlineOffset: 3,
                      },
                    }}
                  />

                  {isCardSelected && (
                    <Button
                      size="small"
                      variant="outlined"
                      aria-label={`Clear ${pillar.title} filter`}
                      onClick={() => activateSpecialty(index)}
                      sx={{
                        position: "absolute",
                        top: 12,
                        right: 12,
                        zIndex: 2,
                        minWidth: 0,
                        minHeight: 32,
                        px: 1.25,
                        borderRadius: "9px",
                        borderColor: specialtyColor,
                        backgroundColor: alpha(specialtyColor, 0.14),
                        color: specialtyColor,
                        fontSize: "0.75rem",
                        fontWeight: 750,
                        lineHeight: 1,
                        textTransform: "none",
                        "&:hover": {
                          borderColor: specialtyColor,
                          backgroundColor: alpha(specialtyColor, 0.22),
                        },
                      }}
                    >
                      Clear
                    </Button>
                  )}

                  {/* Icon Header */}
                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: alpha(specialtyColor, isCardActive ? 0.2 : 0.12),
                      color: specialtyColor,
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
                      color: isCardActive ? specialtyColor : theme.palette.text.primary,
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
                  GitHub Experience Radar
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: theme.palette.text.secondary,
                    fontSize: "0.85rem",
                  }}
                >
                  Shared experience and preference KPIs across five representative projects
                </Typography>
              </Box>
            </Stack>

            <Box
              role="toolbar"
              aria-label="Radar chart filters"
              sx={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 1,
                pb: 2.5,
                mb: 2.5,
                borderBottom: `1px solid ${theme.palette.outline.state.outlinedBorder}`,
              }}
            >
              <Typography
                variant="overline"
                sx={{
                  width: { xs: "100%", sm: "auto" },
                  mr: { xs: 0, sm: 0.5 },
                  color: theme.palette.text.secondary,
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  lineHeight: 1,
                }}
              >
                Filter
              </Typography>

              {specialtyKpiData.domains.map((domain, index) => {
                const isSelected = selectedSpecialty === index;
                const filterColor = specialtyColors[index];

                return (
                  <Button
                    key={domain.key}
                    size="small"
                    variant="outlined"
                    aria-pressed={isSelected}
                    onClick={() => activateSpecialty(index)}
                    startIcon={
                      <Box
                        aria-hidden="true"
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          backgroundColor: filterColor,
                        }}
                      />
                    }
                    sx={{
                      minHeight: 36,
                      borderRadius: "10px",
                      borderColor: isSelected
                        ? filterColor
                        : theme.palette.outline.state.outlinedBorder,
                      backgroundColor: isSelected
                        ? alpha(filterColor, 0.14)
                        : "transparent",
                      color: isSelected
                        ? filterColor
                        : theme.palette.text.secondary,
                      fontWeight: isSelected ? 750 : 650,
                      textTransform: "none",
                      boxShadow: isSelected
                        ? `0 4px 14px ${alpha(filterColor, 0.14)}`
                        : "none",
                      transition: theme.transitions.create(
                        ["background-color", "border-color", "box-shadow", "color"],
                        { duration: theme.transitions.duration.shorter }
                      ),
                      "&:hover": {
                        borderColor: filterColor,
                        backgroundColor: alpha(filterColor, isSelected ? 0.18 : 0.06),
                      },
                    }}
                  >
                    {domain.shortLabel}
                  </Button>
                );
              })}

              <Box sx={{ flexGrow: 1 }} />

              <Button
                size="small"
                variant="text"
                disabled={selectedSpecialty === null}
                onClick={clearSpecialty}
                sx={{
                  minHeight: 36,
                  px: 1.5,
                  borderRadius: "10px",
                  color: theme.palette.text.secondary,
                  fontWeight: 700,
                  textTransform: "none",
                }}
              >
                Clear filter
              </Button>
            </Box>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "minmax(0, 1fr)",
                  md: "minmax(0, 1fr) 350px",
                },
                alignItems: "stretch",
                gap: { xs: 3, md: 4 },
              }}
            >
              {/* Radar Chart Component */}
              <Box
                sx={{
                  width: "100%",
                  minWidth: 0,
                  height: { xs: 340, sm: 400, md: 430 },
                  position: "relative",
                }}
              >
                <RadarChart
                  data={SPECIALTY_RADAR_DATA}
                  series={specialtyKpiData.domains.map((domain, index) => ({
                    dataKey: domain.key,
                    label: domain.label,
                    color: specialtyColors[index],
                  }))}
                  dimensionKey="dimension"
                  levels={4}
                  height="100%"
                  maxValue={100}
                  size="default"
                  highlightedSeriesKey={
                    activeSpecialty !== null
                      ? SPECIALTY_SERIES_KEYS[activeSpecialty]
                      : undefined
                  }
                />
              </Box>

              <Box
                component="aside"
                aria-label="KPI details"
                aria-live="polite"
                tabIndex={0}
                sx={{
                  minWidth: 0,
                  height: { xs: 320, md: 430 },
                  overflowY: "auto",
                  overscrollBehavior: "contain",
                  scrollbarGutter: "stable",
                  borderLeft: {
                    xs: "none",
                    md: `1px solid ${theme.palette.outline.state.outlinedBorder}`,
                  },
                  borderTop: {
                    xs: `1px solid ${theme.palette.outline.state.outlinedBorder}`,
                    md: "none",
                  },
                  pl: { xs: 0, md: 3 },
                  pr: { xs: 0.5, md: 1 },
                  mr: { xs: 0, md: -2.5 },
                  pt: { xs: 3, md: 0 },
                  "&:focus-visible": {
                    outline: `2px solid ${theme.palette.primary.main}`,
                    outlineOffset: 3,
                  },
                }}
              >
                <Box
                  key={selectedDomain?.key ?? "summary"}
                  sx={{
                    animation: "kpi-detail-enter 220ms ease-out",
                    "@keyframes kpi-detail-enter": {
                      from: { opacity: 0, transform: "translateX(8px)" },
                      to: { opacity: 1, transform: "translateX(0)" },
                    },
                    "@media (prefers-reduced-motion: reduce)": {
                      animation: "none",
                    },
                  }}
                >
                  {selectedDomain ? (
                    <>
                      <Typography
                        variant="overline"
                        sx={{
                          color: theme.palette.text.secondary,
                          fontWeight: 700,
                          letterSpacing: "0.08em",
                        }}
                      >
                        Selected filter
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{
                          color: selectedDomainColor,
                          fontWeight: 750,
                          fontSize: "1.05rem",
                          lineHeight: 1.3,
                          mb: 1,
                        }}
                      >
                        {selectedDomain.label}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: theme.palette.text.secondary,
                          fontSize: "0.86rem",
                          lineHeight: 1.55,
                          mb: 2.5,
                        }}
                      >
                        {selectedDomain.summary}
                      </Typography>

                      <Stack spacing={2}>
                        {specialtyKpiData.kpis.map((kpi, index) => {
                          const value = Object.values(selectedDomain.scores)[index];

                          return (
                            <Box key={kpi.key}>
                              <Stack
                                direction="row"
                                alignItems="baseline"
                                justifyContent="space-between"
                                gap={1}
                              >
                                <Typography
                                  variant="body2"
                                  sx={{ fontWeight: 700, fontSize: "0.88rem" }}
                                >
                                  {kpi.label}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  sx={{
                                    color: selectedDomainColor,
                                    fontWeight: 800,
                                    fontVariantNumeric: "tabular-nums",
                                  }}
                                >
                                  {value}
                                </Typography>
                              </Stack>
                              <Box
                                sx={{
                                  height: 4,
                                  my: 0.75,
                                  borderRadius: 999,
                                  overflow: "hidden",
                                  backgroundColor:
                                    theme.palette.surfaceContainerHighest.main,
                                }}
                              >
                                <Box
                                  sx={{
                                    width: `${value}%`,
                                    height: "100%",
                                    borderRadius: "inherit",
                                    backgroundColor: selectedDomainColor,
                                  }}
                                />
                              </Box>
                              <Typography
                                variant="caption"
                                sx={{
                                  display: "block",
                                  color: theme.palette.text.secondary,
                                  fontSize: "0.76rem",
                                  lineHeight: 1.4,
                                }}
                              >
                                {kpi.definition}
                              </Typography>
                            </Box>
                          );
                        })}
                      </Stack>
                    </>
                  ) : (
                    <>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 750, fontSize: "1.05rem", mb: 0.75 }}
                      >
                        KPI Summary
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: theme.palette.text.secondary,
                          fontSize: "0.86rem",
                          lineHeight: 1.55,
                          mb: 2.5,
                        }}
                      >
                        Select a specialty for its five KPI scores. Values are
                        directional GitHub signals, not skill percentages.
                      </Typography>

                      <Stack spacing={2}>
                        {specialtyKpiData.domains.map((domain, index) => {
                          const scores = Object.values(domain.scores);
                          const average = Math.round(
                            scores.reduce((total, score) => total + score, 0) /
                            scores.length
                          );

                          return (
                            <Box key={domain.key}>
                              <Stack
                                direction="row"
                                alignItems="center"
                                justifyContent="space-between"
                                gap={1.5}
                              >
                                <Stack
                                  direction="row"
                                  alignItems="center"
                                  gap={1}
                                  sx={{ minWidth: 0 }}
                                >
                                  <Box
                                    aria-hidden="true"
                                    sx={{
                                      width: 9,
                                      height: 9,
                                      flex: "0 0 auto",
                                      borderRadius: "50%",
                                      backgroundColor: specialtyColors[index],
                                    }}
                                  />
                                  <Typography
                                    variant="body2"
                                    sx={{
                                      fontWeight: 700,
                                      fontSize: "0.88rem",
                                      lineHeight: 1.3,
                                    }}
                                  >
                                    {domain.label}
                                  </Typography>
                                </Stack>
                                <Typography
                                  variant="body2"
                                  sx={{
                                    color: specialtyColors[index],
                                    fontWeight: 800,
                                    fontVariantNumeric: "tabular-nums",
                                  }}
                                >
                                  {average}
                                </Typography>
                              </Stack>
                              <Typography
                                variant="caption"
                                sx={{
                                  display: "block",
                                  color: theme.palette.text.secondary,
                                  mt: 0.5,
                                  pl: 2.125,
                                  fontSize: "0.76rem",
                                }}
                              >
                                Five-KPI directional average
                              </Typography>
                            </Box>
                          );
                        })}
                      </Stack>

                      <Box
                        sx={{
                          mt: 3,
                          pt: 2,
                          borderTop: `1px solid ${theme.palette.outline.state.outlinedBorder}`,
                        }}
                      >
                        <Typography
                          variant="caption"
                          sx={{ color: theme.palette.text.secondary, lineHeight: 1.5 }}
                        >
                          Four KPIs describe experience evidence; Preference
                          Signal estimates repeated project emphasis. Source
                          snapshot: {specialtyKpiData.asOf}.
                        </Typography>
                      </Box>
                    </>
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
        </Stack>
      </Box>
    </MainLayout>
  );
}
