import React from "react";
import { Container, useTheme } from "@mui/material";
import { useSpring, animated } from "@react-spring/web";

import Footer from "./Footer";
import Header from "./Header";

interface Props {
  children: React.ReactNode;
}

export default function PageContainer(props: Props) {
  const theme = useTheme();

  const animateStyles = useSpring({
    from: { opacity: 0, y: 10 },
    to: { opacity: 1, y: 0 },
    config: {
      duration: theme.transitions.duration.standard, // 300ms matching nav button transitions
    },
  });

  return (
    <Container
      component="main"
      disableGutters={true}
      maxWidth={false}
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <Header />
      <Container
        component="main"
        maxWidth="lg"
        disableGutters={false}
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          minHeight: "100vh",
          flexGrow: 1,
          mt: { xs: "72px", sm: "84px" },
        }}
      >
        <animated.div
          style={{
            ...animateStyles,
            display: "flex",
            flexDirection: "column",
            width: "100%",
            flexGrow: 1,
          }}
        >
          {props.children}
        </animated.div>
      </Container>
      <Footer />
    </Container>
  );
}
