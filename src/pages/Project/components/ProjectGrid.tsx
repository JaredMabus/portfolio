import ProjectCard from "./ProjectCard";
import Grid from "@mui/material/Unstable_Grid2";
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
    <Box sx={{ width: "100%" }}>
      <Grid
        container
        maxWidth="lg"
        wrap="wrap"
        direction="row"
        spacing={4}
        margin="auto"
        sx={{
          width: "100%",
        }}
      >
        {transitions((style, project) => (
          <Grid key={project.id} xs={12} sm={6}>
            <animated.div style={style}>
              <ProjectCard data={project} />
            </animated.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProjectGrid;
