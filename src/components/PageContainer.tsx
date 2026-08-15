import React from "react";
import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";

import Footer from "./Footer";
import Header from "./Header";

interface Props {
  children?: React.ReactNode;
}

export default function PageContainer(props: Props) {
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
          mt: "70px",
        }}
      >
        {props.children ?? <Outlet />}
      </Container>
      <Footer />
    </Container>
  );
}

