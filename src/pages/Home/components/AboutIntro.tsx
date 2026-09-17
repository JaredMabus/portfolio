import { Box, Stack, Typography } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";

import { highlights } from "../data/homeContent";

export default function AboutIntro() {
  const theme = useTheme();

  return (
    <>
      <Stack
        spacing={1}
        sx={{
          alignItems: "flex-start",
          width: "100%",
          maxWidth: "920px",
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            inset: "-16px -24px",
            background: `radial-gradient(ellipse at 20% 50%, ${theme.palette.background.default} 0%, ${theme.palette.background.default} 55%, ${alpha(theme.palette.background.default, 0.85)} 75%, ${alpha(theme.palette.background.default, 0.35)} 90%, transparent 100%)`,
            filter: "blur(12px)",
            zIndex: 0,
            pointerEvents: "none",
            borderRadius: "20px",
          },
          "& > *": { position: "relative", zIndex: 1 },
        }}
      >
        <Typography
          variant="h3"
          sx={{ fontWeight: 800, letterSpacing: "-0.025em" }}
        >
          About me
        </Typography>
      </Stack>

      <Stack
        direction="row"
        sx={{
          flexWrap: "wrap",
          gap: 1.5,
          width: "100%",
          maxWidth: "920px",
          position: "relative",
          "& > *": { zIndex: 1, position: "relative" },
        }}
      >
        {highlights.map((item) => {
          const Icon = item.icon;
          return (
            <Box
              key={item.label}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                px: 2,
                py: 0.75,
                borderRadius: "24px",
                backgroundColor: theme.palette.surfaceContainerHigh.main,
                border: `1px solid ${theme.palette.outline.state.outlinedBorder}`,
                boxShadow: `0 2px 8px ${alpha(theme.palette.common.black, 0.04)}`,
                transition: "all 0.25s ease",
                "&:hover": {
                  borderColor: theme.palette.primary.main,
                  transform: "translateY(-2px)",
                },
              }}
            >
              <Icon sx={{ fontSize: 18, color: theme.palette.primary.main }} />
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 600,
                  fontSize: "0.825rem",
                  color: theme.palette.text.primary,
                }}
              >
                {item.label}
              </Typography>
            </Box>
          );
        })}
      </Stack>

      <Box
        sx={{
          width: "100%",
          maxWidth: "920px",
          p: { xs: 3, sm: 4, md: 4.5 },
          borderRadius: "24px",
          backgroundColor: theme.palette.surfaceContainerLow.main,
          border: `1px solid ${theme.palette.outline.state.outlinedBorder}`,
          boxShadow: `0 4px 20px ${alpha(theme.palette.common.black, 0.04)}`,
          position: "relative",
        }}
      >
        <Stack spacing={2.5}>
          <Typography
            variant="body1"
            sx={{
              lineHeight: 1.8,
              fontSize: { xs: "1rem", sm: "1.08rem" },
              color: theme.palette.text.secondary,
            }}
          >
            I’m a full-stack developer with a background in data analytics,
            focused on turning complex information into useful, reliable
            software. My interest in programming began in college during more
            than a few caffeine-fueled research projects. I started using code
            to organize messy information, test assumptions, and explain what
            the results actually meant. That work eventually led me from
            analyzing information to building software.
          </Typography>
          <Typography
            variant="body1"
            sx={{
              lineHeight: 1.8,
              fontSize: { xs: "1rem", sm: "1.08rem" },
              color: theme.palette.text.secondary,
            }}
          >
            When building software, I work across data models, APIs, frontend
            architecture, and interface design, choosing the approach that best
            fits what I’m creating. I care about how data moves through a
            system, how people experience it, and whether the implementation
            will hold up beyond the first demo.
          </Typography>
        </Stack>
      </Box>
    </>
  );
}
