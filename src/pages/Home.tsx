import { Box, Button, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useSpring, animated } from "@react-spring/web";
import { useTheme } from "@mui/material/styles";

import useDocumentTitle from "@/utils/useDocumentTitle";
import avatar from "@/assets/images/ProfilePic.svg";

export default function Home() {
  const theme = useTheme();
  useDocumentTitle("About Me");

  const animateStyles = useSpring({
    from: { x: 0, y: 10, opacity: 0 },
    to: { x: 0, y: 0, opacity: 1 },
    delay: 250,
  });

  return (
    <animated.div style={animateStyles}>
        <Stack
          sx={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            width: "100%",
            flexWrap: "wrap",
            mt: { xs: 3, sm: 10 },
            mb: 10,
          }}
        >
          <Stack
            sx={{
              flexDirection: "column",
              justifyContent: "start",
              alignItems: "space-between",
              p: 2,
            }}
          >
            <Typography variant="h1" sx={{ fontWeight: 700 }}>
              Hi, I'm Jared 👋
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                pl: 0.5,
                color: theme.palette.text.secondary,
              }}
            >
              Full Stack Developer
            </Typography>
            <Stack
              sx={{
                gap: 2,
                mt: 1,
                py: 2,
                borderTop: `2px solid ${theme.palette.outline.main}`,
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 600,
                }}
              >
                View My Projects
              </Typography>
              <Button
                component={Link}
                to="/projects"
                variant="contained"
                color="primary"
                endIcon={<ArrowForwardIosIcon fontSize="small" />}
                sx={{
                  color: theme.palette.primary.contrastText,
                  backgroundColor: theme.palette.primary.main,
                  fontWeight: 600,
                  fontSize: "1rem",
                  py: 1.25,
                  px: 3,
                  borderRadius: 6,
                  width: "auto",
                  alignSelf: "flex-start",
                  transition: theme.transitions.create(
                    ["background-color", "box-shadow", "transform"],
                    {
                      duration: theme.transitions.duration.short,
                      easing: theme.transitions.easing.easeInOut,
                    }
                  ),
                  "&:hover": {
                    backgroundColor: theme.palette.primary.high,
                  },
                }}
              >
                Projects
              </Button>
            </Stack>
          </Stack>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              mt: { xs: 3, sm: 0 },
              p: { xs: 0.5, sm: 1, md: 2 },
              pl: 0,
              img: {
                minWidth: { xs: "100%" },
                maxWidth: { xs: "100%", md: "auto" },
                maxHeight: { xs: "100%", md: "300px" },
              },
            }}
          >
            <img src={avatar} alt="avatar" />
          </Box>
        </Stack>
        <Stack
          sx={{
            flexDirection: "column",
            justifyContent: { sm: "start", md: "center" },
            alignItems: "center",
            justifySelf: "center",
            alignSelf: "center",
            px: 1,
            mb: 20,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 600,
              p: 1,
              pb: 0.5,
            }}
          >
            About Me
          </Typography>
          <Stack
            sx={{
              gap: 2,
              width: { xs: "100%", sm: "75%", md: "60%" },
              justifyContent: "center",
              py: 2,
              px: 1,
              mb: 10,
              "& p": { textWrap: "pretty" },
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
      </animated.div>
  );
}
