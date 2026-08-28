import React from "react";
import MainLayout from "@/components/layouts/MainLayout";
import ProjectGrid from "./components/ProjectGrid";
import { projectData } from "./data/projectData";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import useDocumentTitle from "@/utils/useDocumentTitle";

export default function Project() {
  const theme = useTheme();
  useDocumentTitle("Projects");

  return (
    <MainLayout animatePage={true}>
      <Box
        component="section"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: { xs: 4, md: 6 },
          pb: 8,
          pt: { xs: 2, md: 4 },
          width: "100%",
        }}
      >
        {/* Page Header */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
            position: "relative",
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
            }}
          >
            Projects
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: theme.palette.text.secondary,
              maxWidth: 720,
              fontSize: { xs: "0.95rem", md: "1.05rem" },
              lineHeight: 1.6,
            }}
          >
            Selected full-stack applications, interactive web tools, and data-driven systems.
          </Typography>
        </Box>

        {/* Project Grid Showcase */}
        <Box sx={{ width: "100%" }}>
          <ProjectGrid data={projectData} />
        </Box>
      </Box>
    </MainLayout>
  );
}
