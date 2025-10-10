import PageContainer from "../../components/PageContainer";
import ProjectGrid from "./components/ProjectGrid";
import { projectData } from "./projectData";
import { Typography, Stack, Divider } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import useDocumentTitle from "@/utils/useDocumentTitle";

export default function Project() {
  const theme = useTheme();
  useDocumentTitle("Projects");

  return (
    <PageContainer>
      <Stack direction="row" sx={{ width: "100%", mt: 5 }}>
        <Typography sx={{ fontWeight: 600 }} variant="h3">
          Projects
        </Typography>
      </Stack>
      <Divider />
      <ProjectGrid data={projectData} />
    </PageContainer>
  );
}
