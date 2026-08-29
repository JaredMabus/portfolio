import React from "react";
import { Container, Box, Breakpoint, useTheme } from "@mui/material";
import { useSpring, animated } from "@react-spring/web";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackgroundGrid from "@/components/BackgroundGrid";

export interface MainLayoutProps {
  children: React.ReactNode;
  contentMaxWidth?: false | Breakpoint | undefined;
  animatePage?: boolean;
  showBackground?: boolean;
  disableContentGutters?: boolean;
  justifyPageContent?: "center" | "flex-start" | "flex-end";
  mainContentOverflowY?: React.CSSProperties["overflowY"];
}

/**
 * Provides the app’s primary layout, including the Header and Footer.
 * It wraps the main page content in a configurable container.
 *
 * @param children The main content to be rendered inside the layout.
 * @param contentMaxWidth The maximum width of the main content container. Default "lg"
 * @param animatePage Determines if page transitions should be animated. Default true
 * @param showBackground Determines if the organic wave/grid background should be rendered. Default false
 * @param disableContentGutters If true, the main content container will have its padding removed. Default false
 * @param justifyPageContent The horizontal alignment of the content. Default "center"
 * @param mainContentOverflowY Sets the overflow-y property of the main content container. Default "visible"
 */
export default function MainLayout({
  children,
  contentMaxWidth = "lg",
  animatePage = true,
  showBackground = false,
  disableContentGutters = false,
  justifyPageContent = "flex-start",
  mainContentOverflowY = "visible",
}: MainLayoutProps) {
  const theme = useTheme();

  // Pure opacity fade-in animation for page transitions
  const pageAnimate = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: {
      duration: theme.transitions.duration.standard, // 300ms
    },
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        maxWidth: "100vw",
        minHeight: "100dvh",
        position: "relative",
        overflowX: "hidden",
      }}
    >
      {showBackground && <BackgroundGrid />}
      <Header />
      <Container
        component="main"
        disableGutters={disableContentGutters}
        maxWidth={contentMaxWidth}
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: "1 1 auto",
          justifyContent: justifyPageContent,
          alignSelf: "center",
          minWidth: 0,
          maxWidth: "100%",
          width: "100%",
          minHeight: "100dvh",
          overflowY: mainContentOverflowY,
          mt: { xs: "92px", sm: "108px", md: "120px" },
          px: disableContentGutters ? 0 : { xs: 2, sm: 3, md: 4 },
        }}
      >
        {animatePage ? (
          <animated.div
            style={{
              ...pageAnimate,
              display: "flex",
              flexDirection: "column",
              width: "100%",
              minWidth: 0,
              maxWidth: "100%",
              flexGrow: 1,
            }}
          >
            {children}
          </animated.div>
        ) : (
          <React.Fragment>{children}</React.Fragment>
        )}
      </Container>
      <Footer />
    </Box>
  );
}
