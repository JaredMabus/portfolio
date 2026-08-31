import { createTheme } from "@mui/material/styles";
import { sharedComponents } from "./theme.components";

export const baseTheme = createTheme({
  typography: {
    fontFamily: ["Roboto", "Montserrat", "sans-serif"].join(","),
    h1: {
      fontSize: 57,
      lineHeight: 1.1228,
      letterSpacing: "-0.004386em",
      fontWeight: 400,
    },
    h2: { fontSize: 45, lineHeight: 1.1556, letterSpacing: 0, fontWeight: 400 },
    h3: { fontSize: 36, lineHeight: 1.2222, letterSpacing: 0, fontWeight: 400 },

    // HEADLINES
    h4: { fontSize: 32, lineHeight: 1.25, letterSpacing: 0, fontWeight: 400 },
    h5: { fontSize: 28, lineHeight: 1.2857, letterSpacing: 0, fontWeight: 400 },
    h6: { fontSize: 24, lineHeight: 1.3333, letterSpacing: 0, fontWeight: 400 },

    // TITLES
    subtitle1: {
      fontSize: 22,
      lineHeight: 1.2727,
      letterSpacing: 0,
      fontWeight: 400,
    },
    subtitle2: {
      fontSize: 18,
      lineHeight: 1.5,
      letterSpacing: "0.009375em",
      fontWeight: 500,
    },

    body1: {
      fontSize: 16,
      lineHeight: 1.5,
      letterSpacing: "0.03125em",
      fontWeight: 400,
    },
    body2: {
      fontSize: 14,
      lineHeight: 1.4286,
      letterSpacing: "0.017857em",
      fontWeight: 400,
    },

    // LABELS
    button: {
      fontSize: 14,
      fontWeight: 500,
      lineHeight: 1,
      letterSpacing: "0.007143em",
      textTransform: "none",
    },
    caption: {
      fontSize: 12,
      fontWeight: 500,
      lineHeight: 1.3333,
      letterSpacing: "0.041667em",
    },
    overline: {
      fontSize: 14,
      lineHeight: 1.4286,
      letterSpacing: "0.007143em",
      fontWeight: 500,
      textTransform: "none",
    },
  },
  breakpoints: { values: { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536 } },
  shape: { borderRadius: 4 },
  components: sharedComponents,
});
