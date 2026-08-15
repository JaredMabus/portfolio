import React, { ElementType } from "react";
import {
  Box,
  Typography,
  Button,
  Divider,
  Stack,
  ButtonProps,
  Tooltip,
  useTheme,
  alpha,
} from "@mui/material";
import { Link, LinkProps } from "react-router-dom";
import { styled } from "@mui/material/styles";

// ICONS
import GitHubIcon from "@mui/icons-material/GitHub";
import BrushOutlinedIcon from "@mui/icons-material/BrushOutlined";
import { ProjectData } from "../data/projectData";

// --- Props Interface ---
interface CardContainerProps {
  data: ProjectData;
}
type CardButtonProps = ButtonProps & LinkProps;

const CardContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== "data",
})<CardContainerProps>(({ theme, data }) => ({
  minWidth: 250,
  height: 350,
  position: "relative",
  display: "flex",
  flexDirection: "column",
  justifyContent: "start",
  color: theme.palette.text.secondary,
  borderRadius: "16px",
  border: `1px solid ${theme.palette.outline.main}`,
  boxShadow: theme.shadows[3],
  overflow: "hidden",
  cursor: "pointer",
  transition: theme.transitions.create(
    ["box-shadow", "border-color", "transform"],
    {
      duration: theme.transitions.duration.short,
      easing: theme.transitions.easing.easeInOut,
    }
  ),
  "&:hover": {
    borderColor: theme.palette.primary.main,
    boxShadow: theme.shadows[8],
  },
  "&:hover #card-header": {
    borderColor: theme.palette.primary.main,
  },
  "&:hover #card-content, &:hover #card-btn-stack": {
    visibility: "visible",
    opacity: 1,
  },
  "&:focus-visible": {
    outline: `2px solid ${theme.palette.primary.main}`,
    outlineOffset: "2px",
  },
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: "16px",
    backgroundImage: `url(${data.img})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    filter: "opacity(0.9)",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1,
  },
  "> *": {
    position: "relative",
    zIndex: 2,
  },
}));

const CardHeader = styled(Stack)(({ theme }) => ({
  width: "100%",
  flexDirection: "column",
  alignItems: "start",
  justifyContent: "space-between",
  backgroundColor: theme.palette.surfaceContainer.main,
  padding: theme.spacing(2, 2, 1, 2),
  borderBottom: `2px solid ${theme.palette.outline.main}`,
  transition: theme.transitions.create(["border-color", "background-color"], {
    duration: theme.transitions.duration.standard,
    easing: theme.transitions.easing.easeInOut,
  }),
}));

const CardContent = styled(Stack)(({ theme }) => ({
  visibility: "hidden",
  opacity: 0,
  width: "100%",
  height: "100%",
  padding: theme.spacing(2, 3),
  justifyContent: "space-between",
  backgroundColor: alpha(theme.palette.surfaceContainerHigh.main, 0.95),
  backdropFilter: "blur(6px)",
  transition: theme.transitions.create(
    ["opacity", "visibility", "background-color"],
    {
      duration: theme.transitions.duration.standard,
      easing: theme.transitions.easing.easeInOut,
    }
  ),

  [theme.breakpoints.only("xs")]: {
    padding: theme.spacing(2, 2),
  },
}));

const CardFooter = styled(Stack)({
  flexDirection: "row",
  justifyContent: "end",
  width: "100%",
  fontSize: "1.7rem",
});

const CardLinkButton = styled(Button)<CardButtonProps>(({ theme }) => ({
  border: `1px solid ${theme.palette.outline.main}`,
  color: theme.palette.text.secondary,
  padding: "4px 12px",
  fontSize: "0.85rem",
  borderRadius: "16px",
  transition: theme.transitions.create(
    ["color", "border-color", "background-color"],
    {
      duration: theme.transitions.duration.short,
      easing: theme.transitions.easing.easeInOut,
    }
  ),
  "&:hover": {
    color: theme.palette.primary.main,
    borderColor: theme.palette.primary.main,
    backgroundColor: theme.palette.primary.state.hover,
    "& .MuiSvgIcon-root": {
      color: theme.palette.primary.main,
    },
  },
  "& .MuiSvgIcon-root": {
    fontSize: "1.1rem",
    transition: theme.transitions.create("color", {
      duration: theme.transitions.duration.short,
    }),
  },
}));

interface PropTypes {
  data: ProjectData;
}

export default function ProjectCard({ data }: PropTypes) {
  const theme = useTheme();

  const handleCardClick = () => {
    if (data.url) {
      window.open(data.url, "_blank", "noreferrer");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleCardClick();
    }
  };

  return (
    <CardContainer
      data={data}
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="link"
      aria-label={`View ${data.title} live project`}
    >
      <CardHeader id="card-header">
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            whiteSpace: "nowrap",
            color: theme.palette.text.primary,
          }}
        >
          {data.title}
        </Typography>
        <Divider sx={{ my: 1, borderColor: theme.palette.outline.main }} />
        <Stack
          id="card-btn-stack"
          sx={{ visibility: "visible" }}
          direction="row"
          spacing={1}
        >
          <Tooltip title="View on GitHub">
            <CardLinkButton
              component={Link}
              to={data.githubUrl || "#"}
              target="_blank"
              rel="noreferrer"
              startIcon={<GitHubIcon />}
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              Code
            </CardLinkButton>
          </Tooltip>
          {data.designUrl && (
            <Tooltip title="View on Figma">
              <CardLinkButton
                component={Link}
                to={data.designUrl}
                target="_blank"
                rel="noreferrer"
                startIcon={<BrushOutlinedIcon />}
                onClick={(e: React.MouseEvent) => e.stopPropagation()}
              >
                Design
              </CardLinkButton>
            </Tooltip>
          )}
        </Stack>
      </CardHeader>

      <CardContent id="card-content">
        <Typography
          align="left"
          variant="body1"
          sx={{ color: theme.palette.text.primary }}
        >
          {data.desc}
        </Typography>
        <CardFooter>
          {data.techStack.map((Component: ElementType, key: number) => (
            <Component key={key} />
          ))}
        </CardFooter>
      </CardContent>
    </CardContainer>
  );
}
