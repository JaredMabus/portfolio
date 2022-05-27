import { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { GlobalStyle, light, dark } from "./styles/components";
import Home from "./components/Home";
import ReactGa from "react-ga";

function App() {
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  useEffect(() => {
    ReactGa.initialize("UA-225621926-1");
    ReactGa.pageview(window.location.pathname + window.location.search);
  });

  return (
    <>
      <ThemeProvider theme={theme === "light" ? light : dark}>
        <GlobalStyle />
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
