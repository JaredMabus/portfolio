import { useState, createContext, useEffect, useLayoutEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import * as page from "./pages";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { themeLight, themeDark } from "./styles/style";

export const ThemeContext = createContext<any>("value");

function App() {
  const [light, setTheme] = useState(false);

  const toggleTheme = () => {
    setTheme(!light);
    localStorage.getItem("theme") === "light"
      ? localStorage.setItem("theme", "dark")
      : localStorage.setItem("theme", "light");
  };

  const setInitialTheme = () => {
    const initialThemeMq = window.matchMedia("(prefers-color-scheme: light)");
    if (initialThemeMq.matches) {
      setTheme(true);
      localStorage.setItem("theme", "light");
    } else {
      setTheme(false);
      localStorage.setItem("theme", "dark");
    }
  };

  useLayoutEffect(() => {
    !localStorage.getItem("theme") && setInitialTheme();

    localStorage.getItem("theme") === "light"
      ? setTheme(true)
      : setTheme(false);
  }, []);

  return (
    <ThemeContext.Provider value={{ light, toggleTheme }}>
      <MuiThemeProvider theme={light ? themeLight : themeDark}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<page.Home />} />
            <Route path="/projects" element={<page.Project />} />
            {/* <Route path="/contact" element={<page.Contact />} /> */}
            <Route path="/resume" element={<page.Resume />} />
            <Route path="*" element={<page.Home />} />
          </Routes>
        </BrowserRouter>
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}

export default App;
