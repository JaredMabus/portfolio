import ProjectGrid from "./components/ProjectGrid";
import { projectData } from "./data/projectData";
import { Typography, Stack, Divider } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import useDocumentTitle from "@/utils/useDocumentTitle";

export default function Project() {
  const theme = useTheme();
  useDocumentTitle("Projects");

  return (
    <>
      <Stack direction="row" sx={{ width: "100%", mt: 5 }}>
        <Typography sx={{ fontWeight: 600, mb: 5 }} variant="h3">
          Projects
        </Typography>
      </Stack>
      {/* <Divider sx={{ borderColor: theme.palette.border.low }} /> */}
      <ProjectGrid data={projectData} />
    </>
  );
}
