import React, { useState, useMemo, useEffect, useRef } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import ProjectGrid from "./components/ProjectGrid";
import ProjectHeroSection from "./components/ProjectHeroSection";
import FeaturedProjectCard from "./components/FeaturedProjectCard";
import { projectData, ProjectCategory } from "./data/projectData";
import { Box } from "@mui/material";
import { useSpring, animated } from "@react-spring/web";
import useDocumentTitle from "@/utils/useDocumentTitle";

const categories: ProjectCategory[] = [
  "All",
  "Full-Stack",
  "Web App",
  "Developer Tool",
];

export default function Project() {
  useDocumentTitle("Projects");

  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("All");
  const [displayedCategory, setDisplayedCategory] =
    useState<ProjectCategory>("All");

  const filteredProjects = useMemo(() => {
    if (displayedCategory === "All") return projectData;
    return projectData.filter(
      (project) => project.category === displayedCategory,
    );
  }, [displayedCategory]);

  const featuredProject = useMemo(() => {
    const featured = projectData.find((project) => project.featured);
    if (!featured) return undefined;
    if (displayedCategory === "All" || featured.category === displayedCategory) {
      return featured;
    }
    return undefined;
  }, [displayedCategory]);

  const secondaryProjects = useMemo(() => {
    if (featuredProject) {
      return filteredProjects.filter(
        (project) => project.id !== featuredProject.id,
      );
    }
    return filteredProjects;
  }, [filteredProjects, featuredProject]);

  // Spring animation for smooth crossfade of the entire page content (Hero + Grid)
  const [contentSpring, api] = useSpring(() => ({
    opacity: 1,
    transform: "translateY(0px)",
    config: { tension: 320, friction: 26 },
  }));

  const activeCategoryRef = useRef(activeCategory);
  activeCategoryRef.current = activeCategory;

  useEffect(() => {
    if (activeCategory === displayedCategory) return;

    let isCurrent = true;

    // 1. Fast, smooth fade-out of current content
    api.start({
      opacity: 0,
      transform: "translateY(6px)",
      config: { duration: 120 },
      onRest: () => {
        if (!isCurrent) return;

        // 2. Switch displayed category to the latest activeCategory while content is hidden
        const targetCategory = activeCategoryRef.current;
        setDisplayedCategory(targetCategory);

        // 3. Reset position and smoothly fade & slide in
        api.set({ opacity: 0, transform: "translateY(10px)" });
        api.start({
          opacity: 1,
          transform: "translateY(0px)",
          config: { tension: 300, friction: 24 },
        });
      },
    });

    return () => {
      isCurrent = false;
    };
  }, [activeCategory, displayedCategory, api]);

  return (
    <MainLayout animatePage={true}>
      <Box
        component="section"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: { xs: 4, sm: 5, md: 6 },
          pb: 8,
          pt: { xs: 2, md: 3 },
          width: "100%",
        }}
      >
        {/* Project Header: Title, Description, and Category Filter Controls (Permanent at top) */}
        <ProjectHeroSection
          categories={categories}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
        />

        {/* Entire Page Content (Hero + Grid): Smoothly crossfades when filtering */}
        <animated.div style={{ ...contentSpring, width: "100%" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: { xs: 4, sm: 5, md: 6 },
              width: "100%",
            }}
          >
            {/* Featured Project Hero Card (if active for category) */}
            {featuredProject && (
              <Box sx={{ width: "100%" }}>
                <FeaturedProjectCard data={featuredProject} />
              </Box>
            )}

            {/* Secondary Project Showcase Grid */}
            {secondaryProjects.length > 0 && (
              <Box sx={{ width: "100%" }}>
                <ProjectGrid
                  data={secondaryProjects}
                  showHeading={Boolean(featuredProject)}
                />
              </Box>
            )}
          </Box>
        </animated.div>
      </Box>
    </MainLayout>
  );
}
