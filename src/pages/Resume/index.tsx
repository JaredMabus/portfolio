import { Stack } from "@mui/material";

import PageContainer from "../../components/PageContainer";
import ResumePage from "./ResumePage";

export default function Resume() {
  return (
    <PageContainer>
      <Stack sx={{ justifySelf: "center", height: "100%" }}>
        <ResumePage />
      </Stack>
    </PageContainer>
  );
}
