import { Box, Typography, Button, Stack, Paper } from "@mui/material";
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
      ? theme.palette.primary.light + 45
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
            transform: "scale(0.99)",
            height: 350,
            minHeight: 350,
            maxHeight: 350,
            cursor: "pointer",
            ":hover ": {
              transform: "scale(1)",
            },
            ":hover #project-desc": {
              visibility: "visible",
            },
            ":hover #card-btn-stack": {
              visibility: "visible",
            },
            backgroundImage: `url(${data.img})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
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
              maxHeight: 62.5,
            }}
          >
            <Typography sx={{ fontWeight: "bold" }} align="center" variant="h6">
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
                // target="_blank"
                // href={data.githubUrl}
              >
                <GitHubIcon />
                Code
              </CardButton>
              {data.designUrl && (
                <CardButton>
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
              zIndex: 1,
              position: "absolute",
              top: 59,
              width: "100%",
              visibility: "hidden",
              p: 2,
              backgroundColor:
                theme.palette.mode === "dark"
                  ? theme.palette.secondary.main
                  : theme.palette.secondary.main,
              opacity: 0.95,
              borderBottom: `1px solid ${theme.palette.secondary.dark}`,
            }}
          >
            <Typography variant="body1">{data.desc}</Typography>
          </Stack>
          {/* <Box
              component="img"
              src={data.img}
              sx={{
                // top: 0,
                // left: 0,
                width: "100%",
                // height: "100%",
                // minHeight: "100%",
                // maxWidth: "100%",
                // maxHeight: "300px",
                filter: `contrast(.8)`,
                objectFit: "cover",
                // objectPosition: "center",
                // img: {
                //   width: "100%",
                //   height: "100%",
                // },
              }}
            /> */}
        </Paper>
      </a>
    </>
  );
};

export default ProjectCard;
