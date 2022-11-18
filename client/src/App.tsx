import { useState, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import * as page from "./pages";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { themeLight, themeDark } from "./styles/style";

export const ThemeContext = createContext<any>('value');

function App() {
  const [light, setTheme] = useState(false);

  const toggleTheme = () => {
    setTheme(!light);
  };

  return (
    <ThemeContext.Provider value={{ light, toggleTheme }}>
      <MuiThemeProvider theme={light ? themeLight : themeDark}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<page.Home />} />
            <Route path="/projects" element={<page.Project />} />
            <Route path="/contact" element={<page.Contact />} />
            <Route path="/resume" element={<page.Resume />} />
            <Route path="*" element={<page.Home />} />
          </Routes>
        </BrowserRouter>
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}

export default App;
