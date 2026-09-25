import React from "react";
import ProjectCard from "./ProjectCard";
import { Box, Typography } from "@mui/material";
import { ProjectData } from "../data/projectData";

interface Props {
  data: ProjectData[];
  showHeading?: boolean;
}

const ProjectGrid = ({ data, showHeading = true }: Props) => {
  if (data.length === 0) {
    return null;
  }

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 2.5,
      }}
    >
      {showHeading && (
        <Typography
          variant="h5"
          component="h2"
          sx={{
            fontWeight: 700,
            fontSize: { xs: "1.15rem", sm: "1.3rem", md: "1.4rem" },
            letterSpacing: "-0.01em",
          }}
        >
          More Selected Projects
        </Typography>
      )}

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, minmax(0, 1fr))",
            md:
              data.length >= 3
                ? "repeat(3, minmax(0, 1fr))"
                : "repeat(2, minmax(0, 1fr))",
          },
          gap: { xs: 2.5, sm: 3, md: 3.5 },
          width: "100%",
          alignItems: "stretch",
        }}
      >
        {data.map((project) => (
          <Box
            key={project.id}
            sx={{
              width: "100%",
              height: "100%",
              minWidth: 0,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <ProjectCard data={project} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ProjectGrid;
