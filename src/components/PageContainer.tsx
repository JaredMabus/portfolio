import { Box, Container, useTheme } from "@mui/material";

import Footer from "./Footer";
import Header from "./Header";

interface Props {
  children: React.ReactNode;
}

export default function PageContainer(props: Props) {
  const theme = useTheme();

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
        disableGutters={true}
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          minHeight: "100vh",
          flexGrow: 1,
          mt: "70px",
        }}
      >
        {props.children}
      </Container>
      <Footer />
    </Container>
  );
}
