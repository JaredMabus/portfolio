import React, { useState, useContext } from "react";
import { ThemeContext } from "../App";
import { NavLink } from "react-router-dom";
import LightDarkSwitch from "./ThemeSwitchBtn";
import {
  Box,
  Stack,
  AppBar,
  Toolbar,
  Typography,
  Button,
  alpha,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { useTheme } from "@mui/material/styles";
import { navData, NavDataType } from "./navData";
import SideNav from "./SideNav";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

interface Props {
  item: NavDataType;
}

const NavItem: React.FC<Props> = ({ item }) => {
  const theme = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  const StyledTheme = {
    color: isHovered ? theme.palette.primary.main : theme.palette.text.primary,
    padding: "2px",
    fontWeight: 600,
    transition: "all 200ms ease-in-out",
  };

  const activeStyle = {
    color: theme.palette.primary.main,
    borderBottom: `2px solid ${theme.palette.primary.main}`,
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const navItemClassName = `NavItem ${isHovered ? "hovered" : ""}`;

  return (
    <NavLink
      to={item.url}
      className={navItemClassName}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={({ isActive }) => ({
        ...StyledTheme,
        ...(isActive && activeStyle),
      })}
    >
      {item.name}
    </NavLink>
  );
};

const Nav = () => {
  const theme = useTheme();
  const { toggleTheme } = useContext(ThemeContext);
  const [state, setState] = useState({
    left: false,
  });

  const toggleDrawer =
    (anchor: any, open: any) => (event: React.KeyboardEvent<HTMLElement>) => {
      if (
        event.type === "keydown" &&
        (event.key === "Tab" || event.key === "Shift")
      ) {
        return;
      }
      setState({ ...state, [anchor]: open });
    };

  return (
    <Stack
      maxWidth="xl"
      sx={{
        justifyContent: "end",
        m: 0,
        py: 1,
      }}
    >
      <AppBar
        sx={{ background: "transparent" }}
        position="static"
        elevation={0}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
            background: "transparent",
          }}
          disableGutters={true}
        >
          <SideNav
            state={state}
            toggleDrawer={toggleDrawer}
            navData={navData}
          />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Stack
              direction="row"
              spacing={3}
              sx={{
                display: { xs: "none", sm: "flex" },
              }}
            >
              {navData.map((item) => (
                <NavItem key={item.id} item={item} />
              ))}
            </Stack>
          </Typography>
          <Stack
            direction={"row"}
            sx={{
              justifyContent: "center",
              alignItems: "center",
              px: 0.5,
              py: 0.5,
              pt: 1,
              borderRadius: "4px 10px 4px 10px",
              backgroundColor:
                theme.palette.mode === "dark"
                  ? alpha(grey[50], 0.2)
                  : alpha(theme.palette.primary.main, 0.15),
              svg: {
                height: 34,
                width: 34,
                color:
                  theme.palette.mode === "dark"
                    ? alpha(theme.palette.text.primary, 0.7)
                    : alpha(theme.palette.text.primary, 0.6),
                transition: "250ms ease-in-out",
                m: 0.5,
                ":hover": {
                  color:
                    theme.palette.mode === "dark"
                      ? alpha(theme.palette.text.primary, 1)
                      : alpha(theme.palette.text.primary, 1),
                },
              },
              "& > a": {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                width: "100%",
              },
            }}
          >
            <Box
              sx={{
                // flex: 1,
                borderRight:
                  theme.palette.mode === "dark"
                    ? `2px solid ${alpha(grey[100], 0.4)}`
                    : `2px solid ${alpha(grey[500], 0.4)}`,
              }}
            >
              <Button onClick={toggleTheme}>
                <LightDarkSwitch />
              </Button>
            </Box>
            <Stack
              direction={"row"}
              sx={{
                flex: 1,
                pl: 1,
              }}
            >
              <a
                href="https://github.com/JaredMabus"
                target="_blank"
                rel="noreferrer"
              >
                <GitHubIcon fontSize="large" />
              </a>
              <a
                href="https://www.linkedin.com/in/jaredmabusth/"
                target="_blank"
                rel="noreferrer"
              >
                <LinkedInIcon fontSize="large" />
              </a>
            </Stack>
          </Stack>
        </Toolbar>
      </AppBar>
    </Stack>
  );
};

export default Nav;
