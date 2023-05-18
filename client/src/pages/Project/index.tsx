import PageContainer from "../../components/PageContainer";
import ProjectGrid from "./components/ProjectGrid";
import { projectData } from "./projectData";
import { Typography, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { grey } from "@mui/material/colors";

const Project = () => {
  const theme = useTheme();
  return (
    <PageContainer>
      <Stack
        sx={{ 
          // justifySelf: "center",
          flexDirection: {xs: "column", sm: "row"},
          justifyContent: "center",
          mt: 2, 
          p: 1,
          pt: 3,
        }}
      >
        <Stack sx={{ 
            p: {xs: 1, sm: 4}, 
            mb: 1,
            alignItems: {xs: "center", sm: "end"},
            borderRight: {
              xs: "none",
              sm: `3px solid ${
                theme.palette.mode === "dark"
                  ? theme.palette.primary.light
                  : grey[200]
              }`
              
            },
            borderBottom: {
              xs: `3px solid ${
                theme.palette.mode === "dark"
                  ? theme.palette.primary.light
                  : grey[200]
              }`,
              sm: "none"
            },
          }}>
          <Typography
            sx={{fontWeight: 600 }}
            variant="h4"
          >
            Websites
          </Typography>
        </Stack>
        <Stack
          sx={{
            p: 3, 
            // flex: 1,
          }}
        >
          <ProjectGrid data={projectData} />
        </Stack>
        
      </Stack>
    </PageContainer>
  );
};

export default Project;
