import { Box, Stack } from "@mui/material";
import ProjectCard from "./ProjectCard";
import Grid from "@mui/material/Unstable_Grid2";
import { animated, useTransition } from "@react-spring/web";
import { ProjectData } from "../projectData";

interface Props {
  data: ProjectData[];
}

const ProjectGrid = ({ data }: Props) => {
  // ANIMATION
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
    <>
      <Grid container direction="row" spacing={4}>
        {transitions((style, project) => (
          <Grid
            wrap={"wrap"}
            xs={12}
            sm={12}
            md={6}
            // sx={{
            //   transition: "150ms ease-in-out",
            //   ":hover ": {
            //     transform: "scale(1.01)",
            //   },
            // }}
          >
            <animated.div style={style} className="item">
              <ProjectCard key={project.id} data={project} />
            </animated.div>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default ProjectGrid;
