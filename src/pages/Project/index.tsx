import MainLayout from "@/components/layouts/MainLayout";
import ProjectGrid from "./components/ProjectGrid";
import { projectData } from "./data/projectData";
import { Box, Typography, Stack, Divider } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import useDocumentTitle from "@/utils/useDocumentTitle";

export default function Project() {
  const theme = useTheme();
  useDocumentTitle("Projects");

  return (
    <MainLayout animatePage={false}>
      <Stack
        sx={{
          width: "100%",
          mt: { xs: 2, sm: 4 },
          mb: 1.5,
          gap: 0.5,
        }}
      >
        <Typography sx={{ fontWeight: 700, letterSpacing: "-0.02em" }} variant="h3">
          Projects
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: theme.palette.text.secondary, maxWidth: 640 }}
        >
          Selected full-stack applications, interactive web tools, and data-driven systems.
        </Typography>
      </Stack>
      <Divider
        sx={{
          borderColor: theme.palette.outline.state.outlinedBorder,
          mb: 4,
        }}
      />
      <Box sx={{ width: "100%", pb: 6 }}>
        <ProjectGrid data={projectData} />
      </Box>
    </MainLayout>
  );
}
