import PageContainer from "../../components/PageContainer";
import ProjectGrid from "./components/ProjectGrid";
import { projectData } from "./projectData";
import { Typography, Stack, alpha } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { grey } from "@mui/material/colors";

import useDocumentTitle from "@/utils/useDocumentTitle";

export default function Project() {
  const theme = useTheme();
  useDocumentTitle("Projects");

  return (
    <PageContainer>
      <Stack
        sx={{
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "center",
          mt: 2,
          p: 1,
          pt: 3,
          mb: 20,
        }}
      >
        <Stack
          sx={{
            p: { xs: 1, sm: 2 },
            mb: 1,
            minHeight: { xs: "auto", sm: 800 },
            alignItems: { xs: "center", sm: "end" },
            borderRight: {
              xs: "none",
              sm: `3px solid ${
                theme.palette.mode === "dark"
                  ? alpha(theme.palette.primary.main, 0.6)
                  : alpha(theme.palette.primary.main, 0.2)
              }`,
            },
            borderBottom: {
              xs: `3px solid ${
                theme.palette.mode === "dark"
                  ? alpha(theme.palette.primary.main, 0.6)
                  : alpha(theme.palette.primary.main, 0.8)
              }`,
              sm: "none",
            },
          }}
        >
          <Typography sx={{ fontWeight: 600 }} variant="h4">
            Websites
          </Typography>
        </Stack>
        <Stack
          sx={{
            p: 3,
          }}
        >
          <ProjectGrid data={projectData} />
        </Stack>
      </Stack>
    </PageContainer>
  );
}
