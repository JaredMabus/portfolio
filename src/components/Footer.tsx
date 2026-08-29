import React from "react";
import { Box, Container, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

export default function Footer() {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        mt: "auto",
        backgroundColor: theme.palette.surfaceContainer.main,
        borderTop: `1px solid ${theme.palette.border.state.outlinedBorder}`,
        py: { xs: 3, sm: 3.5 },
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
        }}
      >
        {/* Left: Built With Callout */}
        <Typography
          variant="body2"
          sx={{
            color: theme.palette.text.secondary,
            fontSize: "0.85rem",
            fontWeight: 500,
            letterSpacing: "-0.01em",
          }}
        >
          Built with React, TypeScript & Material UI
        </Typography>

        {/* Right: Minimal Social Actions */}
        <Stack direction="row" spacing={1.5} sx={{
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
                width: { xs: 44, sm: 36 },
                height: { xs: 44, sm: 36 },
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
                "& .MuiSvgIcon-root": {
                  fontSize: { xs: 22, sm: 18 },
                },
              }}
            >
              <GitHubIcon />
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
                width: { xs: 44, sm: 36 },
                height: { xs: 44, sm: 36 },
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
                "& .MuiSvgIcon-root": {
                  fontSize: { xs: 22, sm: 18 },
                },
              }}
            >
              <LinkedInIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      </Container>
    </Box>
  );
}
