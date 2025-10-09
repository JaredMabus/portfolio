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
      <Stack direction="row" sx={{ width: "100%" }}>
        <Typography sx={{ fontWeight: 600 }} variant="h3">
          Projects
        </Typography>
      </Stack>
      <ProjectGrid data={projectData} />
    </PageContainer>
  );
}
