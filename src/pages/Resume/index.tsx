import { Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useSpring, animated } from "@react-spring/web";

import PageContainer from "../../components/PageContainer";
import ResumePage from "./ResumePage";

export default function Resume() {
  const theme = useTheme();
  const animateStyles = useSpring({
    from: { x: 0, y: 10, opacity: 0 },
    to: { x: 0, y: 0, opacity: 1 },
    delay: 250,
  });

  return (
    <PageContainer>
      <animated.div style={animateStyles}>
        <Stack sx={{ justifySelf: "center", height: "100%" }}>
          <ResumePage />
        </Stack>
      </animated.div>
    </PageContainer>
  );
}
