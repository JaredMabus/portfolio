import {
  Typography,
  Button,
  Divider,
  Stack,
  ButtonProps,
  Paper,
  Tooltip,
  useTheme,
  alpha,
} from "@mui/material";
import { Link, LinkProps } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { ElementType } from "react";

import StyledTooltip from "@/components/Tooltips";
// ICONS
import GitHubIcon from "@mui/icons-material/GitHub";
import BrushOutlinedIcon from "@mui/icons-material/BrushOutlined";
import { ProjectData } from "../projectData";

// --- Props Interface ---
interface CardContainerProps {
  data: ProjectData;
  component: ElementType;
}
type CardContainerLinkProps = CardContainerProps & LinkProps;

type CardButtonProps = ButtonProps & LinkProps;

const CardContainer = styled(Link, {
  shouldForwardProp: (prop) => prop !== "data",
})<CardContainerLinkProps>(({ theme, data }) => ({
  minWidth: 284,
  height: 350,
  position: "relative",
  display: "flex",
  flexDirection: "column",
  justifyContent: "start",
  color: theme.palette.text.secondary,
  borderRadius: "16px",
  boxShadow: theme.shadows[9],
  cursor: "pointer",
  overflow: "hidden",
  "&:hover #card-header": {
    borderColor: theme.palette.primary.main,
  },
  "&:hover #card-content, &:hover #card-btn-stack": {
    visibility: "visible",
    opacity: 1,
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
  backgroundColor: theme.palette.surface.main,
  padding: theme.spacing(2, 2, 1, 2),
  borderBottom: `3px solid ${theme.palette.border.dark}`,
  transition: theme.transitions.create(["borderColor"], {
    duration: theme.transitions.duration.standard,
    easing: theme.transitions.easing.easeInOut,
    delay: 500,
  }),
}));

const CardContent = styled(Stack)(({ theme }) => ({
  visibility: "hidden",
  opacity: 0,
  width: "100%",
  height: "100%",
  padding: theme.spacing(2, 4),
  justifyContent: "space-between",
  backgroundColor: theme.palette.surface.dark,
  transition: theme.transitions.create(["opacity", "visibility"], {
    duration: theme.transitions.duration.standard,
    easing: theme.transitions.easing.easeInOut,
  }),

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
  border: `1px solid ${alpha(theme.palette.primary.dark, 0.05)}`,
  color: theme.palette.text.secondary,
  transition: theme.transitions.create(["color", "borderColor"], {
    duration: theme.transitions.duration.standard,
    easing: theme.transitions.easing.easeInOut,
  }),
  "&:hover": {
    color: theme.palette.primary.main,
    borderColor: alpha(theme.palette.primary.dark, 0.2),
    "& .MuiSvgIcon-root": {
      color: theme.palette.primary.main,
    },
  },
  "& .MuiSvgIcon-root": {
    fontSize: "1.1rem",
    transition: theme.transitions.create(["color", "borderColor"], {
      duration: theme.transitions.duration.standard,
      easing: theme.transitions.easing.easeInOut,
    }),
  },
}));

interface PropTypes {
  data: ProjectData;
}

export default function ProjectCard({ data }: PropTypes) {
  const theme = useTheme();

  const tooltipDelay = 500;

  return (
    <CardContainer
      data={data}
      component={Link}
      to={data.url}
      target="_blank"
      rel="noreferrer"
    >
      <CardHeader id="card-header">
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            whiteSpace: "nowrap",
          }}
        >
          {data.title}
        </Typography>
        <Divider />
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
              onClick={(e) => e.stopPropagation()}
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
                onClick={(e) => e.stopPropagation()}
              >
                Design
              </CardLinkButton>
            </Tooltip>
          )}
        </Stack>
      </CardHeader>

      <CardContent id="card-content">
        <Typography align="left" variant="body1">
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
