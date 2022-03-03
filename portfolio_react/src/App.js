import React, { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { GlobalStyle, light, dark } from "./styles/components";
import Home from "./components/Home";
import Project from "./components/Project";

const About = () => {
  return (
    <>
      <h1>About</h1>
      <Link to="/">About</Link>
    </>
  );
};

function App() {
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  return (
    <>
      <ThemeProvider theme={theme === "light" ? light : dark}>
        <GlobalStyle />
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Project />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
