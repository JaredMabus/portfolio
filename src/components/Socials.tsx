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
        py: 1,
        px: { xs: 4, sm: 6 },
        gap: 2,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.palette.surfaceContainer.main,
        borderRadius: "0 0 24px 24px",
        border: `1px solid ${theme.palette.border.state.outlinedBorder}`,
        borderTop: "none",
        "& .MuiIconButton-root": {
          p: 0.5,
          borderRadius: "8px",
          "& .MuiSvgIcon-root": {
            height: 32,
            width: 32,
            p: 0,
            color: theme.palette.text.secondary,
            transition: theme.transitions.create(["color"], {
              duration: theme.transitions.duration.standard,
              easing: theme.transitions.easing.easeInOut,
            }),
          },
          "&:hover": {
            backgroundColor: theme.palette.primary.state.hover,
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
  );
};

export default Socials;
