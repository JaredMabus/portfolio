import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Box, Button, Stack, Typography } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";

import ProfileAvatar from "@/components/ProfileAvatar";

export default function HeroSection() {
  const theme = useTheme();

  return (
    <Stack
      component="section"
      aria-label="Introduction"
      sx={{
        flexDirection: { xs: "column", md: "row" },
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        width: "100%",
        gap: { xs: 4, sm: 5, md: 6 },
        mt: { xs: 1, sm: 2 },
        mb: { xs: 2, sm: 3 },
      }}
    >
      <Stack
        sx={{
          flexDirection: "column",
          justifyContent: "start",
          alignItems: "flex-start",
          textAlign: "left",
          position: "relative",
          width: "fit-content",
          "&::before": {
            content: '""',
            position: "absolute",
            inset: "-32px -40px",
            background: `radial-gradient(ellipse at 45% 50%, ${theme.palette.background.default} 0%, ${theme.palette.background.default} 52%, ${alpha(theme.palette.background.default, 0.85)} 70%, ${alpha(theme.palette.background.default, 0.35)} 86%, transparent 100%)`,
            filter: "blur(14px)",
            zIndex: 0,
            pointerEvents: "none",
            borderRadius: "36px",
          },
          "& > *": { position: "relative", zIndex: 1 },
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontWeight: 700,
            letterSpacing: "-0.03em",
            fontSize: { xs: "2.6rem", sm: "3.2rem", md: "3.5rem" },
            lineHeight: 1.15,
          }}
        >
          Hi, I'm Jared
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            color: theme.palette.text.secondary,
            fontWeight: 500,
            fontSize: { xs: "1rem", sm: "1.05rem" },
            mt: 0.5,
            mb: 2,
            pl: { xs: 0.5, sm: 0.75 },
          }}
        >
          Full Stack Developer
        </Typography>
        <Stack direction="row" spacing={2} sx={{ alignItems: "center", pt: 1 }}>
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
              color: theme.palette.surface.main,
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
              "& .MuiSvgIcon-root": { color: "inherit" },
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
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          maxWidth: { xs: "280px", sm: "340px", md: "440px" },
          flexShrink: 0,
        }}
      >
        <ProfileAvatar />
      </Box>
    </Stack>
  );
}
