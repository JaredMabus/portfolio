import React, { useState, useContext } from "react";
import { ThemeContext } from "../App";
import { NavLink } from "react-router-dom";
import { styled } from "@mui/material/styles";
import LightDarkSwitch from "./ThemeSwitchBtn";
import { Box, AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {navData, NavDataType} from "./navData";
import SideNav from "./SideNav";

const StyledNavLink = styled(NavLink)(
  ({ theme }) => `
        margin: 1rem;
        white-space:nowrap;
    `
);

interface Props {
  item: NavDataType
}

const NavItem: React.FC<Props> = ({ item }) => {
  const theme = useTheme();

  return (
    <StyledNavLink
      to={item.url}
      style={({ isActive }) =>
        isActive
          ? {
              textDecoration: "none",
              color: theme.palette.primary.dark,
              borderBottom: `1px solid ${theme.palette.primary.dark}`,
              transition: "250ms ease-in-out",
            }
          : {
              textDecoration: "none",
              color: theme.palette.text.primary,
              borderBottom: "1px solid rgba(0,0,0,0)",
            }
      }
    >
      {item.name}
    </StyledNavLink>
  );
};

const Nav = () => {
  const { toggleTheme } = useContext(ThemeContext);
  const [state, setState] = useState({
    left: false,
  });


  const toggleDrawer = (anchor: any, open: any) => (event: React.KeyboardEvent<HTMLElement>) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  return (
    <Box
      maxWidth="xl"
      sx={{
        display: "flex",
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
            <Box
              sx={{
                display: { xs: "none", sm: "flex" },
              }}
            >
              {navData.map((item) => (
                <NavItem key={item.id} item={item} />
              ))}
            </Box>
          </Typography>
          <Button
            sx={{ mr: { xs: "100px", sm: "75px" } }}
            onClick={toggleTheme}
          >
            <LightDarkSwitch />
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Nav;
