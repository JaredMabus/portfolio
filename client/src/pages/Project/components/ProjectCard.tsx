import {
  Box,
  Typography,
  Button,
  IconButton,
  Stack,
  Paper,
  Link,
  alpha,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
// import { Link } from "react-router-dom";
// ICONS
import GitHubIcon from "@mui/icons-material/GitHub";
import BrushOutlinedIcon from "@mui/icons-material/BrushOutlined";
// Types
import { ProjectData } from "../projectData";

// Added 'any' type per https://github.com/mui/material-ui/issues/22699
const CardButton: any = styled(Button)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  gap: 6,
  m: 10,
  border: `1px solid ${
    theme.palette.mode === "dark"
      ? theme.palette.primary.light
      : theme.palette.primary.dark
  }45`,
}));

interface PropTypes {
  data: ProjectData;
  children?: React.ReactNode;
}

const ProjectCard = ({ data }: PropTypes) => {
  const theme = useTheme();

  return (
    <>
      <Link href={data.url} target="_blank" rel="noreferrer">
        <Paper
          sx={{
            minWidth: 300,
            maxWidth: 500,
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            backgroundColor:
              theme.palette.mode === "dark"
                ? theme.palette.secondary.main
                : "#fff",
            textAlign: "center",
            color: theme.palette.text.secondary,
            boxShadow: "rgb(25 25 25 / 20%) 2px 2px 3px 2px",
            borderRadius: "4px",
            transition: "150ms ease-in-out",
            height: "100%",
            cursor: "pointer",
            ":hover #project-desc": {
              visibility: "visible",
            },
            ":hover #card-btn-stack": {
              visibility: "visible",
            },
          }}
        >
          <Stack sx={{ position: "relative", height: "100%" }}>
            <Stack
              direction="row"
              id="card-menu"
              sx={{
                // flexWrap: "wrap",
                height: 63,
                minHeight: 63,
                maxWidth: "100%",
                alignItems: "start",
                justifyContent: "space-between",
                backgroundColor: theme.palette.secondary.main,
                borderRadius: "4px 4px 0px 0px",
                p: 1.5,
                m: 0,
                borderBottom: `3px solid ${theme.palette.primary.dark}`,
                borderImage:
                  theme.palette.mode === "dark"
                    ? `linear-gradient(
                      to right,
                      ${alpha(theme.palette.primary.main, 1)},
                      ${alpha(theme.palette.primary.main, 0.5)},
                      ${alpha(theme.palette.primary.main, 0.7)},
                      ${alpha(theme.palette.primary.dark, 1)}
                    )
                    4;`
                    : `linear-gradient(
                      to right,
                      ${alpha(theme.palette.primary.main, 1)},
                      ${alpha(theme.palette.primary.main, 0.5)},
                      ${alpha(theme.palette.primary.main, 0.7)},
                      ${alpha(theme.palette.primary.dark, 1)},
                      )
                      4;`,
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: "1rem", sm: "1.3rem" },
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                }}
                align="center"
                variant="h6"
              >
                {data.title}
              </Typography>
              <Stack
                id="card-btn-stack"
                sx={{ visibility: "hidden" }}
                direction="row"
                spacing={1}
              >
                <Link
                  href={data.githubUrl || "#"}
                  target="_blank"
                  rel="noreferrer"
                >
                  <CardButton>
                    <GitHubIcon />
                    Code
                  </CardButton>
                </Link>
                {data.designUrl && (
                  <Link
                    href={data.designUrl || "#"}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <CardButton>
                      <BrushOutlinedIcon />
                      Design
                    </CardButton>
                  </Link>
                )}
              </Stack>
            </Stack>
            <Stack
              direction="column"
              spacing={1}
              id="project-desc"
              sx={{
                justifyContent: "space-between",
                zIndex: 1,
                position: "absolute",
                top: 63,
                flex: 1,
                p: 2,
                width: "100%",
                height: "100%",
                maxHeight: 302,
                visibility: "hidden",
                border: `2px solid ${
                  theme.palette.mode === "dark"
                    ? theme.palette.secondary.main
                    : theme.palette.secondary.main
                }`,
                borderRadius: "0px 0px 4px 4px",
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? theme.palette.secondary.main
                    : theme.palette.secondary.main,
                opacity: 0.95,
              }}
            >
              <Stack>
                <Typography align="left" variant="body1">
                  {data.desc}
                </Typography>
              </Stack>
              <Stack
                direction="row"
                spacing={2}
                sx={{
                  alignSelf: "end",
                  "& > svg": {
                    fontSize: "1.8rem",
                  },
                }}
              >
                {data.techStack.map((Component: any, key: any) => (
                  <Component key={key} id={Component.id} />
                ))}
              </Stack>
            </Stack>
            <Box
              id="project-card-img"
              component="img"
              src={data.img}
              sx={{
                borderRadius: "0px 0px 4px 4px",
                width: "100%",
                height: "100%",
                minHeight: "300px",
                maxHeight: "300px",
                filter: `contrast(.7)`,
                objectFit: "cover",
              }}
            />
          </Stack>
        </Paper>
      </Link>
    </>
  );
};

export default ProjectCard;
