import React from "react";
import { Box, Typography, Chip, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import FeaturedProjectCard from "./FeaturedProjectCard";
import { ProjectData, ProjectCategory } from "../data/projectData";

interface ProjectHeroSectionProps {
  categories: ProjectCategory[];
  activeCategory: ProjectCategory;
  onSelectCategory: (category: ProjectCategory) => void;
  featuredProject?: ProjectData;
}

/**
 * ProjectHeroSection Component
 *
 * Contains two primary sections:
 * 1. The Content: Page heading, description summary, and interactive category filter pills.
 * 2. The Hero Project Showcase: Optional featured project card.
 */
export default function ProjectHeroSection({
  categories,
  activeCategory,
  onSelectCategory,
  featuredProject,
}: ProjectHeroSectionProps) {
  const theme = useTheme();

  return (
    <Box
      component="header"
      aria-label="Projects overview and featured showcase"
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: { xs: 3, sm: 3.75, md: 4.5 },
      }}
    >
      {/* Section 1: Content (Heading, Description, and Category Filter Controls) */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1.5,
          position: "relative",
          width: "100%",
        }}
      >
        <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: 800,
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
              letterSpacing: "-0.03em",
              color: theme.palette.text.primary,
            }}
          >
            Projects
          </Typography>
        </Stack>

        <Typography
          variant="body1"
          sx={{
            color: theme.palette.text.secondary,
            maxWidth: 720,
            lineHeight: 1.6,
          }}
        >
          A curated collection of full-stack web applications, interactive tools,
          and developer utilities built with modern frontend and backend technologies.
        </Typography>

        {/* Category Filter Pills */}
        <Stack
          direction="row"
          spacing={1}
          sx={{ flexWrap: "wrap", gap: 1, pt: 1 }}
        >
          {categories.map((category) => {
            const isSelected = activeCategory === category;
            return (
              <Chip
                key={category}
                label={category}
                clickable
                onClick={() => onSelectCategory(category)}
                sx={{
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  borderRadius: "10px",
                  px: 0.5,
                  py: 2,
                  backgroundColor: isSelected
                    ? theme.palette.primary.main
                    : theme.palette.surfaceContainerLow.main,
                  color: isSelected
                    ? theme.palette.primary.contrastText
                    : theme.palette.text.secondary,
                  border: `1px solid ${
                    isSelected
                      ? theme.palette.primary.main
                      : theme.palette.border.state.outlinedBorder
                  }`,
                  transition: theme.transitions.create(
                    ["background-color", "color", "border-color", "transform"],
                    {
                      duration: theme.transitions.duration.shorter,
                    }
                  ),
                  "&:hover": {
                    backgroundColor: isSelected
                      ? theme.palette.primary.main
                      : theme.palette.primary.state.hover,
                    color: isSelected
                      ? theme.palette.primary.contrastText
                      : theme.palette.primary.main,
                    borderColor: theme.palette.primary.state.outlinedBorder,
                    transform: "translateY(-1px)",
                  },
                }}
              />
            );
          })}
        </Stack>
      </Box>

      {/* Section 2: Optional Hero Project Showcase */}
      {featuredProject && (
        <Box sx={{ width: "100%" }}>
          <FeaturedProjectCard data={featuredProject} />
        </Box>
      )}
    </Box>
  );
}
