import { Stack } from "@mui/material";

import MainLayout from "@/components/layouts/MainLayout";
import ResumePage from "./ResumePage";

export default function Resume() {
  return (
    <MainLayout>
      <Stack sx={{ justifySelf: "center", height: "100%" }}>
        <ResumePage />
      </Stack>
    </MainLayout>
  );
}
