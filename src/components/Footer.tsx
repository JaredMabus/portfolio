import { Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Socials from "./Socials";

export default function Footer() {
  const theme = useTheme();
  return (
    <Stack
      sx={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "start",
        height: 125,
        width: "100%",
        margin: 0,
        padding: 0,
        backgroundColor: theme.palette.surface.dark,
      }}
    >
      <Socials />
    </Stack>
  );
}
