import {
  Box,
  Typography,
  Button,
  IconButton,
  Stack,
  Paper,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";
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
      <a href={data.url} target="_blank" rel="noreferrer">
        <Paper
          sx={{
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
                display: "flex",
                alignItems: "start",
                justifyContent: "space-between",
                backgroundColor: theme.palette.secondary.main,
                borderRadius: "4px 4px 0px 0px",
                p: 1.5,
                m: 0,
                height: 63,
                minHeight: 63,
                borderBottom: `3px solid ${theme.palette.primary.dark}`,
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
                <CardButton
                  onClick={() => {
                    typeof data.githubUrl === "string" &&
                      window.open(data.githubUrl, "_blank");
                  }}
                >
                  <GitHubIcon />
                  Code
                </CardButton>
                {data.designUrl && (
                  <CardButton
                    onClick={() => {
                      typeof data.designUrl === "string" &&
                        window.open(data.designUrl, "_blank");
                    }}
                  >
                    <BrushOutlinedIcon />
                    Design
                  </CardButton>
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
                {/* {data.icon && (
                  <Box
                    component="img"
                    sx={{ height: 40, width: 40 }}
                    src={data.icon}
                    alt="icon"
                  />
                )} */}
                <Typography align="left" variant="body1">
                  {data.desc}
                </Typography>
              </Stack>
              <Stack
                direction="row"
                spacing={2}
                sx={{
                  alignSelf: "end",
                  // "& #react-icon": {
                  //   color: "#5CCFEE",
                  // },
                  // "& #node-icon": {
                  //   color: "#83BB05",
                  // },
                  // "& #mongo-icon": {
                  //   color: "#4CA53F",
                  // },
                  // "& #ts-icon": {
                  //   color: "#3472BB",
                  // },
                  "& > svg": {
                    fontSize: "1.8rem",
                  },
                }}
              >
                {data.techStack.map((Component: any, key: any) => (
                  // console.log(item)
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
                filter: `contrast(.6)`,
                objectFit: "cover",
              }}
            />
          </Stack>
        </Paper>
      </a>
    </>
  );
};

export default ProjectCard;
