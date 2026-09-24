import React, { useState, useMemo } from "react";
import {
  Box,
  Typography,
  Stack,
  Chip,
  Button,
  Tooltip,
  IconButton,
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import LaunchRoundedIcon from "@mui/icons-material/LaunchRounded";
import GitHubIcon from "@mui/icons-material/GitHub";
import BrushOutlinedIcon from "@mui/icons-material/BrushOutlined";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import { ProjectData } from "../data/projectData";

interface Props {
  data: ProjectData;
}

export default function FeaturedProjectCard({ data }: Props) {
  const theme = useTheme();

  // Construct gallery slides: slide 0 is always the main application overview (no active bullet)
  const gallerySlides = useMemo(() => {
    const slides = [
      {
        id: "overview",
        title: "Live Application Overview",
        tag: "Main Application",
        image: data.img,
        bulletIndex: null as number | null,
      },
    ];

    if (data.gallery && data.gallery.length > 0) {
      data.gallery.forEach((item, idx) => {
        slides.push({
          id: `feature-${idx}`,
          title: item.title,
          tag: item.tag || `Feature ${idx + 1}`,
          image: item.image,
          bulletIndex: idx,
        });
      });
    }

    return slides;
  }, [data]);

  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const currentSlide = gallerySlides[activeSlideIndex] || gallerySlides[0];

  const handlePrevSlide = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveSlideIndex((prev) => (prev - 1 + gallerySlides.length) % gallerySlides.length);
  };

  const handleNextSlide = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveSlideIndex((prev) => (prev + 1) % gallerySlides.length);
  };

  const handleSelectBulletTab = (bulletIdx: number) => {
    // If clicking the currently active bullet tab, toggle back to overview (slide 0, no tab active)
    if (currentSlide.bulletIndex === bulletIdx) {
      setActiveSlideIndex(0);
    } else {
      const targetIndex = gallerySlides.findIndex((s) => s.bulletIndex === bulletIdx);
      if (targetIndex !== -1) {
        setActiveSlideIndex(targetIndex);
      }
    }
  };

  return (
    <Box
      component="article"
      sx={{
        width: "100%",
        minWidth: 0,
        maxWidth: "100%",
        minHeight: { xs: "auto", lg: 500 },
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "1.15fr 1fr", lg: "1.15fr 1fr" },
        gap: { xs: 3, md: 3.5, lg: 4 },
        p: { xs: 2.5, sm: 3, md: 3.5 },
        borderRadius: "24px",
        backgroundColor: theme.palette.surfaceContainerLow.main,
        border: `1px solid ${theme.palette.border.state.outlinedBorder}`,
        boxShadow:
          theme.palette.mode === "dark"
            ? "0 2px 10px rgba(0, 0, 0, 0.25)"
            : "0 4px 20px -4px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.03)",
        position: "relative",
        overflow: "hidden",
        alignItems: "stretch",
        transition: theme.transitions.create(["box-shadow", "border-color"], {
          duration: theme.transitions.duration.standard,
          easing: theme.transitions.easing.easeInOut,
        }),
        "&:hover": {
          boxShadow:
            theme.palette.mode === "dark"
              ? "0 6px 20px rgba(0, 0, 0, 0.3)"
              : "0 8px 24px -4px rgba(0, 0, 0, 0.07), 0 2px 6px rgba(0, 0, 0, 0.03)",
        },
      }}
    >
      {/* Left Column: Project Information & Actions */}
      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: { xs: 3, md: 3.5 },
          zIndex: 2,
        }}
      >
        {/* Top Information Group: Header, Title, Description, and Interactive Feature Bullets */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
          {/* Cohesive Header Badges Row */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 1,
            }}
          >
            <Chip
              icon={<StarRoundedIcon sx={{ fontSize: "0.95rem !important", color: "inherit" }} />}
              label="Featured Project"
              size="small"
              sx={{
                fontWeight: 700,
                fontSize: "0.75rem",
                letterSpacing: "0.02em",
                backgroundColor: theme.palette.surfaceContainerHighest.main,
                color: theme.palette.text.primary,
                border: `1px solid ${theme.palette.outline.state.outlinedBorder}`,
                borderRadius: "20px",
                px: 0.5,
                height: 26,
              }}
            />
            <Chip
              label={data.category}
              size="small"
              sx={{
                fontWeight: 600,
                fontSize: "0.75rem",
                borderRadius: "20px",
                border: `1px solid ${theme.palette.outline.state.outlinedBorder}`,
                color: theme.palette.text.secondary,
                backgroundColor: theme.palette.surfaceContainer.main,
                height: 26,
              }}
            />
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 0.75,
                px: 1.25,
                py: 0.3,
                borderRadius: "20px",
                backgroundColor: theme.palette.surfaceContainer.main,
                border: `1px solid ${theme.palette.outline.state.outlinedBorder}`,
                height: 26,
              }}
            >
              <Box
                sx={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  backgroundColor:
                    data.status === "Live"
                      ? "#10b981"
                      : theme.palette.primary.main,
                  boxShadow:
                    data.status === "Live"
                      ? "0 0 6px rgba(16, 185, 129, 0.7)"
                      : "none",
                }}
              />
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 600,
                  fontSize: "0.74rem",
                  color: theme.palette.text.primary,
                  letterSpacing: "0.01em",
                }}
              >
                {data.status}
              </Typography>
            </Box>
          </Box>

          {/* Title & Icon Header */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            {data.icon && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: theme.palette.text.primary,
                  flexShrink: 0,
                }}
              >
                <data.icon sx={{ fontSize: { xs: "2.1rem", sm: "2.5rem" } }} />
              </Box>
            )}

            <Box sx={{ minWidth: 0, flex: 1 }}>
              <Typography
                variant="h4"
                component="h2"
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: "1.45rem", sm: "1.75rem", md: "2rem" },
                  letterSpacing: "-0.03em",
                  color: theme.palette.text.primary,
                  lineHeight: 1.15,
                }}
              >
                {data.title}
              </Typography>
              {data.subtitle && (
                <Typography
                  variant="subtitle1"
                  sx={{
                    color: theme.palette.text.secondary,
                    fontWeight: 500,
                    fontSize: { xs: "0.92rem", sm: "1rem", md: "1.05rem" },
                    letterSpacing: "-0.01em",
                    lineHeight: 1.25,
                    mt: 0.25,
                  }}
                >
                  {data.subtitle}
                </Typography>
              )}
            </Box>
          </Box>

          {/* Content Block: Narrative Description + Feature Tabs */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1.75,
              pl: { xs: 1.5, sm: 2.5 },
            }}
          >
            <Typography
              variant="body1"
              sx={{
                color: theme.palette.text.secondary,
                lineHeight: 1.65,
                fontSize: { xs: "0.92rem", md: "0.96rem" },
              }}
            >
              {data.desc}
            </Typography>

            {/* Highlights as Interactive Feature Tabs */}
            {data.highlights && data.highlights.length > 0 && (
              <Stack spacing={0.5} sx={{ pt: 0.25 }}>
                {data.highlights.map((highlight, idx) => {
                  const isTabActive = currentSlide.bulletIndex === idx;

                  return (
                    <Box
                      key={idx}
                      role="tab"
                      aria-selected={isTabActive}
                      tabIndex={0}
                      onClick={() => handleSelectBulletTab(idx)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          handleSelectBulletTab(idx);
                        }
                      }}
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 1.25,
                        py: 0.75,
                        px: 1,
                        borderRadius: "8px",
                        cursor: "pointer",
                        userSelect: "none",
                        border: "none",
                        outline: "none",
                        backgroundColor: isTabActive
                          ? alpha(theme.palette.text.primary, 0.05)
                          : "transparent",
                        transition: theme.transitions.create(
                          ["background-color", "transform"],
                          { duration: theme.transitions.duration.shorter }
                        ),
                        "&:hover": {
                          backgroundColor: alpha(theme.palette.text.primary, 0.04),
                          transform: "translateX(2px)",
                        },
                        "&:focus-visible": {
                          outline: `2px solid ${theme.palette.primary.main}`,
                          outlineOffset: 1,
                        },
                      }}
                    >
                      <CheckCircleOutlineRoundedIcon
                        sx={{
                          fontSize: "1.15rem",
                          color: isTabActive
                            ? theme.palette.text.primary
                            : theme.palette.text.secondary,
                          mt: "2px",
                          flexShrink: 0,
                        }}
                      />

                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography
                          variant="body2"
                          sx={{
                            color: isTabActive
                              ? theme.palette.text.primary
                              : theme.palette.text.secondary,
                            fontWeight: isTabActive ? 600 : 400,
                            lineHeight: 1.5,
                            fontSize: { xs: "0.85rem", md: "0.88rem" },
                          }}
                        >
                          {highlight}
                        </Typography>
                      </Box>
                    </Box>
                  );
                })}
              </Stack>
            )}
          </Box>
        </Box>

        {/* Bottom Section: Technologies & Tools + Action Buttons */}
        <Box sx={{ mt: "auto", pt: { xs: 2.5, md: 3 } }}>
          {/* Tech Stack Header */}
          <Typography
            variant="caption"
            sx={{
              display: "block",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: theme.palette.text.secondary,
              mb: 1.25,
              fontSize: "0.72rem",
            }}
          >
            Technologies & Tools
          </Typography>

          {/* Tech Chips */}
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, alignItems: "flex-start" }}>
            {data.techStack.map((tech, idx) => {
              const IconComponent = tech.icon;
              return (
                <Chip
                  key={idx}
                  variant="outlined"
                  icon={
                    IconComponent ? (
                      <IconComponent style={{ fontSize: "0.875rem" }} />
                    ) : undefined
                  }
                  label={tech.name}
                  size="small"
                  sx={{
                    flexShrink: 0,
                    backgroundColor: "transparent",
                    color: theme.palette.text.primary,
                    fontWeight: 600,
                    fontSize: "0.75rem",
                    borderRadius: "8px",
                    borderColor: theme.palette.outline.state.outlinedBorder,
                    height: 24,
                    "& .MuiChip-icon": {
                      color: theme.palette.text.secondary,
                      ml: "8px",
                      mr: "-2px",
                    },
                    "& .MuiChip-label": {
                      px: "8px",
                    },
                  }}
                />
              );
            })}
          </Box>

          {/* Action Buttons: Positioned directly under Tech Section */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 1.5,
              mt: { xs: 3.5, sm: 4.5 },
            }}
          >
            <Button
              variant="contained"
              color="primary"
              href={data.url}
              target="_blank"
              rel="noreferrer"
              endIcon={<LaunchRoundedIcon sx={{ fontSize: "0.95rem !important" }} />}
              sx={{
                fontWeight: 700,
                fontSize: "0.85rem",
                borderRadius: "10px",
                py: 0.85,
                px: 2.25,
                textTransform: "none",
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                border: `1px solid ${theme.palette.primary.main}`,
                boxShadow: `0 2px 8px ${theme.palette.primary.state.focus}`,
                "&:hover": {
                  backgroundColor: theme.palette.primary.high,
                  borderColor: theme.palette.primary.high,
                  color: theme.palette.primary.contrastText,
                  boxShadow: `0 4px 12px ${theme.palette.primary.state.focusVisible}`,
                },
                "& .MuiSvgIcon-root": {
                  color: "inherit",
                },
              }}
            >
              Live App
            </Button>

            {data.githubUrl && (
              <Button
                variant="outlined"
                href={data.githubUrl}
                target="_blank"
                rel="noreferrer"
                startIcon={<GitHubIcon sx={{ fontSize: "0.95rem !important" }} />}
                sx={{
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  borderRadius: "10px",
                  py: 0.85,
                  px: 1.75,
                  textTransform: "none",
                  color: theme.palette.text.primary,
                  borderColor: theme.palette.border.main,
                  backgroundColor: theme.palette.surfaceContainer.main,
                  "&:hover": {
                    borderColor: theme.palette.outline.state.outlinedBorder,
                    backgroundColor: theme.palette.surfaceContainerHighest.main,
                  },
                }}
              >
                Code
              </Button>
            )}

            {data.designUrl && (
              <Tooltip title="View UI/UX Architecture in Figma">
                <Button
                  variant="outlined"
                  href={data.designUrl}
                  target="_blank"
                  rel="noreferrer"
                  startIcon={<BrushOutlinedIcon sx={{ fontSize: "0.95rem !important" }} />}
                  sx={{
                    fontWeight: 600,
                    fontSize: "0.85rem",
                    borderRadius: "10px",
                    py: 0.85,
                    px: 1.75,
                    textTransform: "none",
                    color: theme.palette.text.primary,
                    borderColor: theme.palette.border.main,
                    backgroundColor: theme.palette.surfaceContainer.main,
                    "&:hover": {
                      borderColor: theme.palette.outline.state.outlinedBorder,
                      backgroundColor: theme.palette.surfaceContainerHighest.main,
                    },
                  }}
                >
                  Figma
                </Button>
              </Tooltip>
            )}
          </Box>
        </Box>
      </Box>

      {/* Right Column: Interactive Tabbed Feature Gallery with External Arrows */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          minWidth: 0,
          height: "100%",
          gap: { xs: 0.5, sm: 1 },
        }}
      >
        {/* Previous Arrow Button (outside image, no outline) */}
        <Tooltip title="Previous" placement="left">
          <IconButton
            onClick={handlePrevSlide}
            aria-label="Previous"
            sx={{
              color: theme.palette.text.secondary,
              p: { xs: 0.5, sm: 0.75 },
              flexShrink: 0,
              border: "none",
              borderRadius: "50%",
              transition: theme.transitions.create(
                ["color", "background-color", "transform"],
                { duration: theme.transitions.duration.shorter }
              ),
              "&:hover": {
                color: theme.palette.primary.main,
                backgroundColor: alpha(theme.palette.primary.main, 0.08),
                transform: "scale(1.1)",
              },
            }}
          >
            <ChevronLeftRoundedIcon sx={{ fontSize: { xs: "1.75rem", sm: "2.1rem" } }} />
          </IconButton>
        </Tooltip>

        {/* Gallery Image Container */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            position: "relative",
            flex: 1,
            minWidth: 0,
            height: "100%",
            minHeight: { xs: 280, sm: 340, md: 380, lg: 440 },
            borderRadius: "18px", // Conforming concentric radius to outer 24px hero section
            overflow: "hidden",
            border: `1px solid ${theme.palette.border.state.outlinedBorder}`,
            backgroundColor: "#0d1117",
            boxShadow:
              theme.palette.mode === "dark"
                ? "0 2px 8px rgba(0, 0, 0, 0.2)"
                : "0 2px 8px -2px rgba(0, 0, 0, 0.05)",
            justifyContent: "space-between",
          }}
        >
          {/* Background Image Container with Crossfade */}
          <Box
            key={currentSlide.id}
            role="img"
            aria-label={`${data.title} - ${currentSlide.title}`}
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: "100%",
              height: "100%",
              backgroundImage: `url(${currentSlide.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundColor: "#0d1117",
              animation: "fadeIn 0.35s ease-in-out",
              "@keyframes fadeIn": {
                from: { opacity: 0.4 },
                to: { opacity: 1 },
              },
            }}
          />

          {/* Top Header Capsule Overlay (Slide Title Only) */}
          <Box
            sx={{
              position: "relative",
              zIndex: 3,
              p: { xs: 1.25, sm: 1.75 },
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              pointerEvents: "none",
            }}
          >
            {/* Active Slide Title */}
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                px: 1.5,
                py: 0.6,
                borderRadius: "20px",
                backgroundColor: "rgba(18, 19, 22, 0.78)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                boxShadow: "0 4px 16px rgba(0, 0, 0, 0.35)",
                pointerEvents: "auto",
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  color: "#f8f9fa",
                  fontWeight: 650,
                  fontSize: "0.76rem",
                  letterSpacing: "0.01em",
                }}
              >
                {currentSlide.title}
              </Typography>
            </Box>
          </Box>

          {/* Bottom Pagination Dots */}
          <Box
            sx={{
              position: "relative",
              zIndex: 3,
              p: { xs: 1.25, sm: 1.75 },
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 1,
                px: 1.5,
                py: 0.6,
                borderRadius: "20px",
                backgroundColor: "rgba(18, 19, 22, 0.78)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                boxShadow: "0 4px 16px rgba(0, 0, 0, 0.35)",
              }}
            >
              {gallerySlides.map((slide, sIdx) => {
                const isActive = activeSlideIndex === sIdx;
                return (
                  <Tooltip key={slide.id} title={slide.title} placement="top">
                    <Box
                      component="button"
                      type="button"
                      onClick={() => setActiveSlideIndex(sIdx)}
                      aria-label={`Go to ${slide.title}`}
                      sx={{
                        width: isActive ? 24 : 8,
                        height: 8,
                        borderRadius: isActive ? "4px" : "50%",
                        backgroundColor: isActive
                          ? theme.palette.primary.main
                          : "rgba(255, 255, 255, 0.4)",
                        border: "none",
                        p: 0,
                        cursor: "pointer",
                        transition: theme.transitions.create(
                          ["width", "background-color"],
                          { duration: theme.transitions.duration.shorter }
                        ),
                        "&:hover": {
                          backgroundColor: isActive
                            ? theme.palette.primary.main
                            : "rgba(255, 255, 255, 0.8)",
                        },
                      }}
                    />
                  </Tooltip>
                );
              })}
            </Box>
          </Box>
        </Box>

        {/* Next Arrow Button (outside image, no outline) */}
        <Tooltip title="Next" placement="right">
          <IconButton
            onClick={handleNextSlide}
            aria-label="Next"
            sx={{
              color: theme.palette.text.secondary,
              p: { xs: 0.5, sm: 0.75 },
              flexShrink: 0,
              border: "none",
              borderRadius: "50%",
              transition: theme.transitions.create(
                ["color", "background-color", "transform"],
                { duration: theme.transitions.duration.shorter }
              ),
              "&:hover": {
                color: theme.palette.primary.main,
                backgroundColor: alpha(theme.palette.primary.main, 0.08),
                transform: "scale(1.1)",
              },
            }}
          >
            <ChevronRightRoundedIcon sx={{ fontSize: { xs: "1.75rem", sm: "2.1rem" } }} />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
}
