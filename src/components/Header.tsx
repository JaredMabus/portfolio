import React, { useState, useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import {
  AppBar,
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Toolbar,
  Typography,
  useScrollTrigger,
  useMediaQuery,
  Slide,
  Tooltip,
  alpha,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { ThemeContext } from "../App";
import SideNav from "./SideNav";
import LightDarkSwitch from "./ThemeSwitchBtn";

import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { navData, NavDataType } from "./data/navData";

interface Props {
  item: NavDataType;
}

const NavItem: React.FC<Props> = ({ item }) => {
  const theme = useTheme();

  return (
    <>
      <Box
        component={NavLink}
        to={item.url}
        sx={{
          display: "flex",
          textDecoration: "none",
          justifyContent: "center",
          alignItems: "center",
          color: theme.palette.text.secondary,

          padding: theme.spacing(2, 1.5, 1, 1.5),
          border: `2px solid transparent`,
          borderBottom: "2px solid transparent",

          whiteSpace: "nowrap",
          fontSize: "1.1rem",
          fontWeight: 600,

          transition: theme.transitions.create(["color", "border-color"], {
            duration: theme.transitions.duration.standard,
            easing: theme.transitions.easing.easeInOut,
          }),
          "&:hover": {
            color: theme.palette.primary.main,
          },
          "&.active": {
            color: theme.palette.primary.main,
            borderBottom: `2px solid ${theme.palette.primary.main}`,
          },
        }}
      >
        {item.name}
      </Box>
      <Divider orientation="vertical" variant="middle" />
    </>
  );
};

export default function Header() {
  const theme = useTheme();
  const { toggleTheme } = useContext(ThemeContext);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const isMobileScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const showHeaderScrollTrigger = useScrollTrigger();
  const scrolled = useScrollTrigger({
    disableHysteresis: true,
    threshold: 1,
  });

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setDrawerOpen(open);
    };

  const SocialIconButtonStyles = {
    height: 48,
    width: 48,
    ml: 1,
    borderRadius: "15px",
    border: `1px solid ${alpha(theme.palette.border.main, 0.4)}`,
    backgroundColor: alpha(theme.palette.surface.dark, 0.4),
    transition: theme.transitions.create("background-color"),

    "&:hover": {
      backgroundColor: alpha(theme.palette.primary.main, 0.2),
      "& .MuiSvgIcon-root": {
        color: theme.palette.text.primary,
      },
    },

    "& .MuiSvgIcon-root": {
      fontSize: "24px",
      color: alpha(theme.palette.text.primary, 0.7),
      transition: theme.transitions.create("color"),
    },

    "& .MuiTouchRipple-ripple .MuiTouchRipple-child": {
      backgroundColor: theme.palette.text.primary,
    },
  };

  return (
    <Slide
      direction="down"
      in={!isMobileScreen || !showHeaderScrollTrigger}
      appear={false}
    >
      <AppBar
        component="header"
        position="fixed"
        color="transparent"
        elevation={0}
      >
        <Toolbar
          component="nav"
          disableGutters={true}
          sx={{
            height: 70,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            py: 1,
            px: { xs: 2, sm: 4 },
            backgroundColor: scrolled
              ? alpha(theme.palette.background.default, 0.98)
              : "transparent",
            boxShadow: scrolled
              ? `0px 0px 50px 5px rgba(0, 0, 0, .05)`
              : "none",
            borderBottom: scrolled
              ? `1px solid ${alpha(theme.palette.outline.main, 0.2)}`
              : "1px solid transparent",
            backdropFilter: scrolled ? "blur(8px)" : "none",
            transition: theme.transitions.create(
              [
                "background-color",
                "box-shadow",
                "border-color",
                "backdrop-filter",
              ],
              {
                duration: theme.transitions.duration.shortest,
                easing: theme.transitions.easing.easeOut,
              }
            ),
          }}
        >
          <Stack
            sx={{
              display: { xs: "none", sm: isDrawerOpen ? "none" : "flex" },
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {navData.map((item) => (
              <NavItem key={item.id} item={item} />
            ))}
          </Stack>
          <SideNav
            open={isDrawerOpen}
            toggleDrawer={toggleDrawer}
            navData={navData}
          />
          <Stack
            direction={"row"}
            sx={{
              justifyContent: "center",
              alignItems: "center",
              gap: 1,
              px: 1,
              borderRadius: "4px 10px 4px 10px",
            }}
          >
            <Stack
              sx={{
                borderRight: `2px solid ${alpha(
                  theme.palette.outline.dark,
                  0.2
                )}`,
              }}
            >
              <Button onClick={toggleTheme}>
                <LightDarkSwitch />
              </Button>
            </Stack>
            <Stack direction={"row"}>
              <Tooltip title="GitHub">
                <IconButton
                  component={Link}
                  to="https://github.com/JaredMabus"
                  target="_blank"
                  sx={SocialIconButtonStyles}
                >
                  <GitHubIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="LinkedIn">
                <IconButton
                  component={Link}
                  to="https://www.linkedin.com/in/jaredmabusth/"
                  target="_blank"
                  sx={SocialIconButtonStyles}
                >
                  <LinkedInIcon />
                </IconButton>
              </Tooltip>
            </Stack>
          </Stack>
        </Toolbar>
      </AppBar>
    </Slide>
  );
}
