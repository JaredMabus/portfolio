import React from "react";
import { Container, Box, Breakpoint, useTheme } from "@mui/material";
import { useSpring, animated } from "@react-spring/web";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export interface MainLayoutProps {
  children: React.ReactNode;
  contentMaxWidth?: false | Breakpoint | undefined;
  animatePage?: boolean;
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
 * @param disableContentGutters If true, the main content container will have its padding removed. Default false
 * @param justifyPageContent The horizontal alignment of the content. Default "center"
 * @param mainContentOverflowY Sets the overflow-y property of the main content container. Default "visible"
 */
export default function MainLayout({
  children,
  contentMaxWidth = "lg",
  animatePage = true,
  disableContentGutters = false,
  justifyPageContent = "flex-start",
  mainContentOverflowY = "visible",
}: MainLayoutProps) {
  const theme = useTheme();

  // Animation for page transitions matching nav timing
  const pageAnimate = useSpring({
    from: { opacity: 0, y: 8 },
    to: { opacity: 1, y: 0 },
    config: {
      duration: theme.transitions.duration.standard, // 300ms matching nav button transitions
    },
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        minHeight: "100dvh",
      }}
    >
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
          width: "100%",
          minHeight: "100dvh",
          overflowY: mainContentOverflowY,
          mt: { xs: "72px", sm: "84px" },
        }}
      >
        {animatePage ? (
          <animated.div
            style={{
              ...pageAnimate,
              display: "flex",
              flexDirection: "column",
              width: "100%",
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
