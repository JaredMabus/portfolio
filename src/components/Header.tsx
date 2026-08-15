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
          borderRadius: 2,
          padding: theme.spacing(1, 1.5),
          borderBottom: "2px solid transparent",

          whiteSpace: "nowrap",
          fontSize: "1rem",
          fontWeight: 600,

          transition: theme.transitions.create(
            ["color", "background-color", "border-color"],
            {
              duration: theme.transitions.duration.standard,
              easing: theme.transitions.easing.easeInOut,
            }
          ),
          "&:hover": {
            color: theme.palette.primary.main,
            backgroundColor: theme.palette.primary.state.hover,
          },
          "&.active": {
            color: theme.palette.primary.main,
            backgroundColor: theme.palette.primary.state.selected,
            borderBottom: `2px solid ${theme.palette.primary.main}`,
          },
        }}
      >
        {item.name}
      </Box>
      <Divider orientation="vertical" variant="middle" flexItem sx={{ mx: 0.5, borderColor: theme.palette.outline.main }} />
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
    (open: boolean) =>
    (event?: React.KeyboardEvent | React.MouseEvent | React.SyntheticEvent | object) => {
      if (
        event &&
        "type" in event &&
        event.type === "keydown" &&
        ("key" in event && (event.key === "Tab" || event.key === "Shift"))
      ) {
        return;
      }
      setDrawerOpen(open);
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
              ? theme.palette.surfaceContainerGlass.main
              : "transparent",
            boxShadow: scrolled
              ? `0px 4px 20px 0px rgba(0, 0, 0, 0.08)`
              : "none",
            borderBottom: scrolled
              ? `1px solid ${theme.palette.outline.main}`
              : "1px solid transparent",
            backdropFilter: scrolled ? "blur(12px)" : "none",
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
              gap: 0.5,
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
            }}
          >
            <Stack
              sx={{
                borderRight: `1px solid ${theme.palette.outline.main}`,
                pr: 1,
              }}
            >
              <Button
                onClick={toggleTheme}
                sx={{
                  minWidth: "auto",
                  p: 0.5,
                  borderRadius: "20px",
                }}
              >
                <LightDarkSwitch />
              </Button>
            </Stack>
            <Stack direction={"row"} spacing={0.5}>
              <Tooltip title="GitHub">
                <IconButton
                  component={Link}
                  to="https://github.com/JaredMabus"
                  target="_blank"
                  color="neutral"
                  variant="outlined"
                  size="medium"
                  sx={{
                    width: 42,
                    height: 42,
                  }}
                >
                  <GitHubIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="LinkedIn">
                <IconButton
                  component={Link}
                  to="https://www.linkedin.com/in/jaredmabusth/"
                  target="_blank"
                  color="neutral"
                  variant="outlined"
                  size="medium"
                  sx={{
                    width: 42,
                    height: 42,
                  }}
                >
                  <LinkedInIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Stack>
          </Stack>
        </Toolbar>
      </AppBar>
    </Slide>
  );
}
