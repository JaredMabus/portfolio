import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { Stack, IconButton, alpha } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Socials = () => {
  const theme = useTheme();
  return (
    <>
      <Stack
        sx={{
          // gap: 2,
          py: 0.5,
          px: 10,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.palette.surface.main,
          borderRadius: "0 0 10rem 10rem",
          "& .MuiIconButton-root": {
            "& .MuiSvgIcon-root": {
              height: 32,
              width: 32,
              p: 0,
              color: alpha(theme.palette.text.secondary, 0.5),
              transition: theme.transitions.create(["color"], {
                duration: theme.transitions.duration.standard,
                easing: theme.transitions.easing.easeInOut,
              }),
            },
            "&:hover": {
              "& .MuiSvgIcon-root": {
                color: theme.palette.primary.main,
              },
            },
          },
        }}
      >
        <IconButton
          component={Link}
          to={"https://github.com/JaredMabus"}
          target="_blank"
        >
          <GitHubIcon fontSize="large" />
        </IconButton>
        <IconButton
          component={Link}
          to="https://www.linkedin.com/in/jaredmabusth/"
          target="_blank"
        >
          <LinkedInIcon fontSize="large" />
        </IconButton>
      </Stack>
    </>
  );
};

export default Socials;
