import PageContainer from "../components/PageContainer";
import AboutMe from "../components/AboutMe";
import { Box, Typography, Button } from "@mui/material";
import avatar from "../assets/images/ProfilePic.svg";
import { Link } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useTheme } from "@mui/material/styles";

import { useSpring, animated } from "@react-spring/web";

const Home = () => {
  // Access theme prop using useTheme hook
  const theme = useTheme();

  const animateStyles = useSpring({
    from: { x: 0, y: 10, opacity: 0 },
    to: { x: 0, y: 0, opacity: 1 },
    delay: 250,
  });

  return (
    <PageContainer>
      {/* Avatar Container */}
      <animated.div style={animateStyles}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            mt: { xs: 3, sm: 10 },
            mb: 10,
            width: "100%",
            position: "relative",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              p: 2,
            }}
          >
            <Typography variant="h3">Hi, I'm Jared 👋 </Typography>
            <Typography variant="h5">Web Developer</Typography>
            <Box
              sx={{
                mt: 1,
                py: 2,
                borderTop: `3px solid ${theme.palette.secondary.light}`,
              }}
            >
              <Typography variant="subtitle1">
                Check out some of my recent projects
              </Typography>
              <Button
                sx={{
                  mt: 1,
                  alignSelf: "start",
                  width: 150,
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
                component={Link}
                to="/projects"
                variant="contained"
                color="primary"
              >
                Projects <ArrowForwardIosIcon fontSize="small" />
              </Button>
            </Box>
          </Box>
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
        </Box>
        <AboutMe />
      </animated.div>
    </PageContainer>
  );
};

export default Home;
