import React from "react";
import {
  Box,
  Typography,
  Button,
  Stack,
  Chip,
  Tooltip,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import GitHubIcon from "@mui/icons-material/GitHub";
import BrushOutlinedIcon from "@mui/icons-material/BrushOutlined";
import LaunchRoundedIcon from "@mui/icons-material/LaunchRounded";
import { ProjectData } from "../data/projectData";

interface Props {
  data: ProjectData;
}

export default function ProjectCard({ data }: Props) {
  const theme = useTheme();

  return (
    <Box
      component="article"
      sx={{
        width: "100%",
        minWidth: 0,
        height: { xs: "auto", sm: 530, md: 540 },
        minHeight: { sm: 530, md: 540 },
        maxHeight: { sm: 530, md: 540 },
        flex: "1 1 auto",
        display: "flex",
        flexDirection: "column",
        borderRadius: "20px",
        backgroundColor: theme.palette.surfaceContainerLow.main,
        border: `1px solid ${theme.palette.border.state.outlinedBorder}`,
        boxShadow:
          theme.palette.mode === "dark"
            ? "0 2px 8px rgba(0, 0, 0, 0.2)"
            : "0 2px 8px -2px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.03)",
        overflow: "hidden",
        position: "relative",
        transition: theme.transitions.create(
          ["border-color", "box-shadow", "transform"],
          {
            duration: theme.transitions.duration.standard,
            easing: theme.transitions.easing.easeInOut,
          }
        ),
        "&:hover": {
          transform: { xs: "none", md: "translateY(-4px)" },
          borderColor: theme.palette.outline.state.outlinedBorder,
          boxShadow:
            theme.palette.mode === "dark"
              ? "0 6px 20px rgba(0, 0, 0, 0.3)"
              : "0 8px 24px -4px rgba(0, 0, 0, 0.08), 0 2px 6px rgba(0, 0, 0, 0.04)",
        },
      }}
    >
      {/* Top Preview Image Container (Identical fixed height across all cards) */}
      <Box
        component="a"
        href={data.url}
        target="_blank"
        rel="noreferrer"
        sx={{
          display: "block",
          position: "relative",
          width: "100%",
          height: { xs: 180, sm: 195, md: 205 },
          flexShrink: 0,
          overflow: "hidden",
          backgroundColor: "#0d1117",
          textDecoration: "none",
          borderBottom: `1px solid ${theme.palette.border.main}`,
        }}
      >
        {/* Top Overlay Bar: Category Identifier Chip (Left) + Live Status (Right) */}
        <Box
          sx={{
            position: "absolute",
            top: 10,
            left: 10,
            right: 10,
            zIndex: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Category Chip Identifier */}
          <Chip
            label={data.category}
            size="small"
            sx={{
              fontWeight: 600,
              fontSize: "0.68rem",
              borderRadius: "14px",
              backgroundColor: "rgba(0, 0, 0, 0.72)",
              backdropFilter: "blur(10px)",
              color: "#ffffff",
              border: "1px solid rgba(255, 255, 255, 0.16)",
              height: 24,
            }}
          />

          {/* Live Indicator Pill */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.65,
              px: 1.25,
              py: 0.4,
              borderRadius: "20px",
              backgroundColor: "rgba(0, 0, 0, 0.72)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.16)",
              height: 24,
            }}
          >
            <Box
              sx={{
                width: 6.5,
                height: 6.5,
                borderRadius: "50%",
                backgroundColor: "#10b981",
                boxShadow: "0 0 6px rgba(16, 185, 129, 0.8)",
              }}
            />
            <Typography
              variant="caption"
              sx={{
                color: "#ffffff",
                fontWeight: 600,
                fontSize: "0.68rem",
                letterSpacing: "0.02em",
              }}
            >
              {data.status}
            </Typography>
          </Box>
        </Box>

        {/* Screenshot / Preview Image (Fills container uniformly with no scale transition) */}
        <Box
          component="img"
          src={data.img}
          alt={`${data.title} preview`}
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            display: "block",
          }}
        />
      </Box>

      {/* Body Content Container (Equal height across cards) */}
      <Stack
        sx={{
          p: { xs: 2, sm: 2.75 },
          flex: "1 1 auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box>
          {/* Header Row: Icon on left, Title + Subtitle centered vertically beside it */}
          <Stack
            direction="row"
            spacing={1.5}
            sx={{
              alignItems: "center",
              minHeight: 44,
              mb: 1.25,
            }}
          >
            {data.icon && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: theme.palette.text.primary,
                  flexShrink: 0,
                }}
              >
                <data.icon sx={{ fontSize: "1.4rem" }} />
              </Box>
            )}

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                minWidth: 0,
                flex: 1,
              }}
            >
              <Typography
                variant="h5"
                component="h3"
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: "1.12rem", sm: "1.2rem" },
                  letterSpacing: "-0.01em",
                  color: theme.palette.text.primary,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  lineHeight: 1.2,
                }}
              >
                {data.title}
              </Typography>

              {data.subtitle && (
                <Typography
                  variant="caption"
                  sx={{
                    display: "block",
                    color: theme.palette.text.secondary,
                    fontWeight: 500,
                    fontSize: "0.78rem",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    lineHeight: 1.25,
                    mt: 0.25,
                  }}
                >
                  {data.subtitle}
                </Typography>
              )}
            </Box>
          </Stack>

          {/* Project Description (Consistent 3-line clamp & min-height) */}
          <Typography
            variant="body2"
            sx={{
              color: theme.palette.text.secondary,
              lineHeight: 1.55,
              fontSize: { xs: "0.85rem", sm: "0.88rem" },
              minHeight: "4.4rem",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {data.desc}
          </Typography>
        </Box>

        {/* Tech Stack Chips (Clean flex-wrap with CSS gap) */}
        <Box sx={{ mt: 2 }}>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 1,
              minHeight: 58,
              alignItems: "flex-start",
            }}
          >
            {data.techStack.map((tech, idx) => {
              const IconComponent = tech.icon;
              return (
                <Chip
                  key={idx}
                  variant="outlined"
                  icon={
                    IconComponent ? (
                      <IconComponent style={{ fontSize: "0.875rem" }} />
                    ) : undefined
                  }
                  label={tech.name}
                  size="small"
                  sx={{
                    flexShrink: 0,
                    backgroundColor: "transparent",
                    color: theme.palette.text.primary,
                    fontWeight: 600,
                    fontSize: "0.75rem",
                    borderRadius: "8px",
                    borderColor: theme.palette.outline.state.outlinedBorder,
                    height: 24,
                    "& .MuiChip-icon": {
                      color: theme.palette.text.secondary,
                      ml: "8px",
                      mr: "-2px",
                    },
                    "& .MuiChip-label": {
                      px: "8px",
                    },
                  }}
                />
              );
            })}
          </Box>
        </Box>

        {/* Action Buttons Footer (Pinned to bottom) */}
        <Stack
          direction="row"
          spacing={1}
          sx={{
            alignItems: "center",
            pt: 1.5,
            mt: "auto",
            borderTop: `1px solid ${theme.palette.border.main}`,
          }}
        >
          <Button
            variant="contained"
            color="primary"
            href={data.url}
            target="_blank"
            rel="noreferrer"
            endIcon={<LaunchRoundedIcon sx={{ fontSize: "0.9rem !important" }} />}
            sx={{
              flex: 1,
              fontWeight: 700,
              fontSize: { xs: "0.78rem", sm: "0.82rem" },
              borderRadius: "10px",
              py: { xs: 0.7, sm: 0.8 },
              px: { xs: 1, sm: 1.5 },
              textTransform: "none",
              whiteSpace: "nowrap",
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              border: `1px solid ${theme.palette.primary.main}`,
              boxShadow: `0 2px 6px ${theme.palette.primary.state.focus}`,
              "&:hover": {
                backgroundColor: theme.palette.primary.high,
                borderColor: theme.palette.primary.high,
                color: theme.palette.primary.contrastText,
                boxShadow: `0 3px 10px ${theme.palette.primary.state.focusVisible}`,
              },
              "& .MuiSvgIcon-root": {
                color: "inherit",
              },
            }}
          >
            {data.category === "Developer Tool" ? "View Extension" : "Live Demo"}
          </Button>

          {data.githubUrl && (
            <Tooltip title="View Source Code on GitHub">
              <Button
                variant="outlined"
                href={data.githubUrl}
                target="_blank"
                rel="noreferrer"
                startIcon={<GitHubIcon sx={{ fontSize: "0.95rem !important" }} />}
                sx={{
                  fontWeight: 600,
                  fontSize: { xs: "0.78rem", sm: "0.82rem" },
                  borderRadius: "10px",
                  py: { xs: 0.7, sm: 0.8 },
                  px: { xs: 1.25, sm: 1.5 },
                  textTransform: "none",
                  color: theme.palette.text.primary,
                  borderColor: theme.palette.border.main,
                  backgroundColor: theme.palette.surfaceContainer.main,
                  "&:hover": {
                    borderColor: theme.palette.border.main,
                    backgroundColor: theme.palette.surfaceContainerHigh.main,
                  },
                }}
              >
                Code
              </Button>
            </Tooltip>
          )}

          {data.designUrl && (
            <Tooltip title="View Figma Designs">
              <Button
                variant="outlined"
                href={data.designUrl}
                target="_blank"
                rel="noreferrer"
                startIcon={<BrushOutlinedIcon sx={{ fontSize: "0.95rem !important" }} />}
                sx={{
                  fontWeight: 600,
                  fontSize: { xs: "0.78rem", sm: "0.82rem" },
                  borderRadius: "10px",
                  py: { xs: 0.7, sm: 0.8 },
                  px: { xs: 1.25, sm: 1.5 },
                  textTransform: "none",
                  color: theme.palette.text.primary,
                  borderColor: theme.palette.border.main,
                  backgroundColor: theme.palette.surfaceContainer.main,
                  "&:hover": {
                    borderColor: theme.palette.border.main,
                    backgroundColor: theme.palette.surfaceContainerHigh.main,
                  },
                }}
              >
                Figma
              </Button>
            </Tooltip>
          )}
        </Stack>
      </Stack>
    </Box>
  );
}
