import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { Stack, IconButton, Tooltip } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Socials: React.FC = () => {
  const theme = useTheme();

  return (
    <Stack direction="row" spacing={1} sx={{
      alignItems: "center"
    }}>
      <Tooltip title="GitHub" arrow>
        <IconButton
          component={Link}
          to="https://github.com/JaredMabus"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub Profile"
          sx={{
            width: 36,
            height: 36,
            borderRadius: "10px",
            color: theme.palette.text.secondary,
            border: `1px solid ${theme.palette.outline.state.outlinedBorder}`,
            transition: theme.transitions.create(
              ["color", "background-color", "border-color", "transform"],
              {
                duration: theme.transitions.duration.standard,
                easing: theme.transitions.easing.easeInOut,
              }
            ),
            "&:hover": {
              color: theme.palette.primary.main,
              backgroundColor: theme.palette.primary.state.hover,
              borderColor: theme.palette.primary.main,
              transform: "translateY(-2px)",
            },
            "&:focus-visible": {
              outline: `2px solid ${theme.palette.primary.state.focusVisible}`,
            },
          }}
        >
          <GitHubIcon sx={{ fontSize: 18 }} />
        </IconButton>
      </Tooltip>
      <Tooltip title="LinkedIn" arrow>
        <IconButton
          component={Link}
          to="https://www.linkedin.com/in/jaredmabusth"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn Profile"
          sx={{
            width: 36,
            height: 36,
            borderRadius: "10px",
            color: theme.palette.text.secondary,
            border: `1px solid ${theme.palette.outline.state.outlinedBorder}`,
            transition: theme.transitions.create(
              ["color", "background-color", "border-color", "transform"],
              {
                duration: theme.transitions.duration.standard,
                easing: theme.transitions.easing.easeInOut,
              }
            ),
            "&:hover": {
              color: theme.palette.primary.main,
              backgroundColor: theme.palette.primary.state.hover,
              borderColor: theme.palette.primary.main,
              transform: "translateY(-2px)",
            },
            "&:focus-visible": {
              outline: `2px solid ${theme.palette.primary.state.focusVisible}`,
            },
          }}
        >
          <LinkedInIcon sx={{ fontSize: 18 }} />
        </IconButton>
      </Tooltip>
    </Stack>
  );
};

export default Socials;
