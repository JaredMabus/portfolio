import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { Stack, IconButton } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Socials = () => {
  const theme = useTheme();
  return (
    <Stack
      sx={{
        py: 0.75,
        px: 4,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 1,
        backgroundColor: theme.palette.surfaceContainer.main,
        border: `1px solid ${theme.palette.outline.main}`,
        borderRadius: "0 0 2rem 2rem",
        "& .MuiIconButton-root": {
          color: theme.palette.text.secondary,
          transition: theme.transitions.create(["color", "background-color"], {
            duration: theme.transitions.duration.standard,
            easing: theme.transitions.easing.easeInOut,
          }),
          "&:hover": {
            color: theme.palette.primary.main,
            backgroundColor: theme.palette.primary.state.hover,
          },
        },
      }}
    >
      <IconButton
        component={Link}
        to="https://github.com/JaredMabus"
        target="_blank"
        aria-label="GitHub"
      >
        <GitHubIcon fontSize="medium" />
      </IconButton>
      <IconButton
        component={Link}
        to="https://www.linkedin.com/in/jaredmabusth/"
        target="_blank"
        aria-label="LinkedIn"
      >
        <LinkedInIcon fontSize="medium" />
      </IconButton>
    </Stack>
  );
};

export default Socials;
