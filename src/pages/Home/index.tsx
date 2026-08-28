import React from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useTheme } from "@mui/material/styles";

import useDocumentTitle from "@/utils/useDocumentTitle";
import MainLayout from "@/components/layouts/MainLayout";
import avatar from "@/assets/images/ProfilePic.svg";

export default function Home() {
  const theme = useTheme();
  useDocumentTitle("About Me");

  return (
    <MainLayout animatePage={true} showBackground={true}>
      <Box
        component="section"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: { xs: 4, md: 6 },
          pb: 8,
          pt: { xs: 2, md: 4 },
          width: "100%",
        }}
      >
        {/* Hero Section */}
        <Stack
          component="section"
          aria-label="Introduction"
          sx={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            width: "100%",
            flexWrap: "wrap",
            gap: { xs: 3, md: 6 },
            mt: { xs: 1, sm: 2 },
            mb: { xs: 2, sm: 3 },
          }}
        >
          <Stack
            sx={{
              flexDirection: "column",
              justifyContent: "start",
            }}
          >
            <Typography variant="h1" sx={{ fontWeight: 700, letterSpacing: "-0.03em" }}>
              Hi, I'm Jared 👋
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                color: theme.palette.text.secondary,
                fontWeight: 500,
                fontSize: "1.05rem",
                mt: 0.5,
                mb: 2,
              }}
            >
              Full Stack Developer
            </Typography>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              alignItems={{ xs: "stretch", sm: "center" }}
              sx={{
                pt: 2.5,
                borderTop: `1px solid ${theme.palette.outline.state.outlinedBorder}`,
              }}
            >
              <Button
                component={Link}
                to="/projects"
                variant="contained"
                endIcon={
                  <ArrowForwardIosIcon
                    sx={{
                      fontSize: "15px !important",
                      transition: "transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                  />
                }
                sx={{
                  color: theme.palette.background.default,
                  backgroundColor: theme.palette.primary.main,
                  fontWeight: 700,
                  fontSize: { xs: "1rem", sm: "1.05rem" },
                  py: 1.5,
                  px: 4,
                  borderRadius: "32px",
                  textTransform: "none",
                  letterSpacing: "-0.01em",
                  width: "fit-content",
                  boxShadow: `0 4px 16px ${theme.palette.primary.state.focus}`,
                  transition: theme.transitions.create(
                    ["background-color", "box-shadow", "transform"],
                    {
                      duration: theme.transitions.duration.standard,
                      easing: theme.transitions.easing.easeInOut,
                    }
                  ),
                  "& .MuiSvgIcon-root": {
                    color: theme.palette.background.default,
                  },
                  "&:hover": {
                    backgroundColor: theme.palette.primary.high,
                    boxShadow: `0 8px 24px ${theme.palette.primary.state.focusVisible}`,
                    transform: "translateY(-2px)",
                    "& .MuiButton-endIcon .MuiSvgIcon-root": {
                      transform: "translateX(4px)",
                    },
                  },
                  "&:active": {
                    transform: "translateY(0px)",
                    boxShadow: `0 2px 8px ${theme.palette.primary.state.focus}`,
                  },
                  "&:focus-visible": {
                    outline: `2px solid ${theme.palette.primary.state.focusVisible}`,
                  },
                }}
              >
                Explore Projects
              </Button>
            </Stack>
          </Stack>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              img: {
                minWidth: { xs: "100%" },
                maxWidth: { xs: "100%", md: "auto" },
                maxHeight: { xs: "240px", md: "280px" },
              },
            }}
          >
            <img src={avatar} alt="developer profile illustration" />
          </Box>
        </Stack>

        {/* About Me Section */}
        <Stack
          component="section"
          aria-label="About Me"
          sx={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
            px: 2,
            mb: 4,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              letterSpacing: "-0.02em",
              textAlign: "center",
            }}
          >
            About Me
          </Typography>
          <Stack
            sx={{
              gap: 2.5,
              width: { xs: "100%", sm: "85%", md: "68%" },
              justifyContent: "center",
              py: 2,
              px: { xs: 1, sm: 2 },

              "& p": { textWrap: "pretty", lineHeight: 1.7, fontSize: "1.05rem", color: theme.palette.text.secondary },
            }}
          >
            <Typography variant="body1">
              I'm a full-stack developer and data analyst who enjoys turning
              data and ideas into meaningful applications. My passion began in
              college, during countless caffeine-fueled research projects, where
              I discovered how code could manage, analyze, and tell stories with
              data.
            </Typography>
            <Typography variant="body1">
              Over time, my passion for data analytics and web development
              merged into a single craft. I enjoy the creative freedom of
              frontend design, blending visual storytelling with interface
              design, while maintaining well-structured data models and robust
              API endpoints.
            </Typography>
          </Stack>
        </Stack>
      </Box>
    </MainLayout>
  );
}
