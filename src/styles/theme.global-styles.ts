export const GlobalStyle = {
  "*": { padding: 0, margin: 0, boxSizing: "border-box" },
  html: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
    WebkitFontSmoothing: "antialiased",
    WebkitTextSizeAdjust: "100%",
    MozOsxFontSmoothing: "grayscale",
    width: "100%",
    overflowX: "hidden",
    overscrollBehaviorX: "none",
  },
  body: {
    minHeight: "100dvh",
    width: "100%",
    overflowX: "hidden",
    overflowY: "auto",
    overscrollBehaviorX: "none",
    touchAction: "pan-y",
  },
  "#root": { height: "100%", width: "100%", overflowX: "hidden" },
  "input, textarea, select": {
    fontSize: "1rem",
  },
  "@media (max-width: 600px)": {
    ".MuiInputBase-root, input, textarea, select": {
      fontSize: "1rem",
    },
  },
  a: { textDecoration: "none !important" },
  code: {
    fontFamily:
      'source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace',
  },
};
