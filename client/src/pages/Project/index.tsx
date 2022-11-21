import PageContainer from "../../components/PageContainer";
import ProjectGrid from "./components/ProjectGrid";
import { projectData } from "./projectData";
import { Typography, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const Project = () => {
  const theme = useTheme();
  return (
    <PageContainer>
      <Stack
        sx={{ minWidth: "100%", display: "flex", mt: 2, p: 1 }}
        direction="column"
      >
        <Stack sx={{ p: 1, mb: 1 }}>
          <Typography
            sx={{ alignSelf: "start", flex: 1, fontWeight: 600 }}
            variant="h4"
          >
            Projects
          </Typography>
          {/* <Typography
            sx={{
              alignSelf: "start",
              py: 0.5,
              px: 1,
              flex: 1,
              color: theme.palette.text.secondary,
              fontWeight: 600,
            }}
            variant="subtitle1"
          >
            Here are some of the projects I've been working on.
          </Typography> */}
        </Stack>
        <ProjectGrid data={projectData} />
      </Stack>
    </PageContainer>
  );
};

export default Project;
