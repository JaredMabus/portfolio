import React from "react";
import ProjectCard from "./ProjectCard";
import Box from "@mui/material/Box";
import { animated, useTransition } from "@react-spring/web";
import { ProjectData } from "../data/projectData";

interface Props {
  data: ProjectData[];
}

const ProjectGrid = ({ data }: Props) => {
  const animateStyles = {
    from: { x: 0, y: 20, opacity: 0 },
    enter: { x: 0, y: 0, opacity: 1 },
  };

  const transitions = useTransition(data, {
    from: animateStyles.from,
    enter: () => async (next) => {
      await next(animateStyles.enter);
    },
    expires: 100,
    trail: 75,
  });

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
        gap: { xs: 3, md: 4 },
        width: "100%",
      }}
    >
      {transitions((style, project) => (
        <animated.div
          key={project.id}
          style={{
            ...style,
            width: "100%",
            display: "flex",
          }}
        >
          <ProjectCard data={project} />
        </animated.div>
      ))}
    </Box>
  );
};

export default ProjectGrid;
