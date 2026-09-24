import React, { useState, useMemo } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import ProjectGrid from "./components/ProjectGrid";
import ProjectHeroSection from "./components/ProjectHeroSection";
import { projectData, ProjectCategory } from "./data/projectData";
import { Box } from "@mui/material";
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

  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") return projectData;
    return projectData.filter((project) => project.category === activeCategory);
  }, [activeCategory]);

  const featuredProject = useMemo(() => {
    if (activeCategory === "All") {
      return projectData.find((project) => project.featured);
    }
    return undefined;
  }, [activeCategory]);

  const secondaryProjects = useMemo(() => {
    if (featuredProject) {
      return filteredProjects.filter((project) => project.id !== featuredProject.id);
    }
    return filteredProjects;
  }, [filteredProjects, featuredProject]);

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
        {/* Project Hero Section: Two sections (Content + Featured Project Card) */}
        <ProjectHeroSection
          categories={categories}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          featuredProject={featuredProject}
        />

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
    </MainLayout>
  );
}
