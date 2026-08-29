import React, { useState, useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import {
  AppBar,
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  Stack,
  Toolbar,
  Typography,
  useScrollTrigger,
  useMediaQuery,
  Slide,
  Tooltip,
} from "@mui/material";
import { useTheme, alpha } from "@mui/material/styles";

import { ThemeContext } from "../App";
import SideNav from "./SideNav";
import LightDarkSwitch from "./ThemeSwitchBtn";
import Logo from "./Logo";

import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { navData, NavDataType } from "./data/navData";

interface Props {
  item: NavDataType;
}

const NavItem: React.FC<Props> = ({ item }) => {
  const theme = useTheme();
  const isLight = theme.palette.mode === "light";
  const activeColor = isLight ? "#1B4D33" : theme.palette.primary.main;
  const hoverColor = isLight ? "#245E41" : theme.palette.primary.main;
  const activeBg = isLight
    ? alpha(theme.palette.primary.main, 0.18)
    : theme.palette.primary.state.selected;
  const hoverBg = isLight
    ? alpha(theme.palette.primary.main, 0.09)
    : theme.palette.primary.state.hover;

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

          padding: theme.spacing(0.5, 1.25),
          borderRadius: "8px",

          whiteSpace: "nowrap",
          fontSize: "14px",
          fontWeight: 600,

          transition: theme.transitions.create(
            ["color", "background-color"],
            {
              duration: 140,
              easing: "cubic-bezier(0.16, 1, 0.3, 1)",
            }
          ),
          "&:hover": {
            color: hoverColor,
            backgroundColor: hoverBg,
          },
          "&.active": {
            color: activeColor,
            fontWeight: 700,
            backgroundColor: activeBg,
          },
        }}
      >
        {item.name}
      </Box>
      <Divider orientation="vertical" flexItem sx={{ height: 16, my: "auto" }} />
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
    height: { xs: 42, sm: 36 },
    width: { xs: 42, sm: 36 },
    borderRadius: "10px",
    border: `1px solid ${theme.palette.border.state.outlinedBorder}`,
    backgroundColor: theme.palette.surfaceContainerLow.main,
    transition: theme.transitions.create([
      "background-color",
      "border-color",
      "color",
    ]),

    "&:hover": {
      backgroundColor: theme.palette.primary.state.hover,
      borderColor: theme.palette.primary.state.outlinedBorder,
      "& .MuiSvgIcon-root": {
        color: theme.palette.primary.main,
      },
    },

    "& .MuiSvgIcon-root": {
      fontSize: { xs: "20px", sm: "18px" },
      color: theme.palette.text.secondary,
      transition: theme.transitions.create("color"),
    },

    "& .MuiTouchRipple-ripple .MuiTouchRipple-child": {
      backgroundColor: theme.palette.primary.state.selected,
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
        sx={{
          backgroundColor: scrolled
            ? theme.palette.surfaceContainerGlass.main
            : "transparent",
          boxShadow: scrolled
            ? `0px 0px 50px 5px rgba(0, 0, 0, .05)`
            : "none",
          borderBottom: scrolled
            ? `1px solid ${theme.palette.outline.state.outlinedBorder}`
            : "1px solid transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
          transition: theme.transitions.create(
            [
              "background-color",
              "box-shadow",
              "border-color",
              "backdrop-filter",
              "-webkit-backdrop-filter",
            ],
            {
              duration: 140,
              easing: "cubic-bezier(0.16, 1, 0.3, 1)",
            }
          ),
        }}
      >
        <Container maxWidth="lg" disableGutters={false}>
          <Toolbar
            component="nav"
            disableGutters={true}
            sx={{
              minHeight: { xs: 64, sm: 76 },
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              py: { xs: 1.5, sm: 2 },
            }}
          >
            {/* Left: Mobile Menu + Site Logo + Desktop Nav Items */}
            <Stack
              direction="row"
              sx={{
                alignItems: "center",
                gap: { xs: 1, sm: 2 }
              }}>
              <SideNav
                open={isDrawerOpen}
                toggleDrawer={toggleDrawer}
                navData={navData}
              />
              <Box
                component={Link}
                to="/"
                aria-label="Jared Mabusth Portfolio Home"
                sx={{
                  display: { xs: "none", sm: "flex" },
                  alignItems: "center",
                  justifyContent: "center",
                  textDecoration: "none",
                }}
              >
                <Logo size={32} />
              </Box>

              <Stack
                sx={{
                  display: { xs: "none", sm: isDrawerOpen ? "none" : "flex" },
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 0.5,
                }}
              >
                {navData.map((item) => (
                  <NavItem key={item.id} item={item} />
                ))}
              </Stack>
            </Stack>
            {/* Right Controls: Theme Switch, Centered Divider, Paired Socials */}
            <Stack
              direction="row"
              sx={{
                alignItems: "center"
              }}
            >
              <IconButton
                onClick={toggleTheme}
                size="small"
                sx={{ p: 0 }}
                disableRipple
                aria-label="Toggle theme"
              >
                <LightDarkSwitch />
              </IconButton>

              <Divider
                orientation="vertical"
                flexItem
                sx={{
                  height: 18,
                  my: "auto",
                  mx: { xs: 1, sm: 1.5 },
                  borderColor: theme.palette.outline.state.outlinedBorder,
                }}
              />

              <Stack direction="row" spacing={0.5} sx={{
                alignItems: "center"
              }}>
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
        </Container>
      </AppBar>
    </Slide>
  );
}
