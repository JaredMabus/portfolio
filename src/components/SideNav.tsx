import * as React from "react";
import { NavLink } from "react-router-dom";
import MenuOpenOutlinedIcon from "@mui/icons-material/MenuOpenOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Box,
  Typography,
  IconButton,
  Button,
  Divider,
  Stack,
  Paper,
  useTheme,
  Tooltip,
  alpha,
} from "@mui/material";

import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

import { NavDataType } from "./data/navData";

interface Props {
  navData: NavDataType[];
  open: boolean;
  toggleDrawer: (
    open: boolean
  ) => (event: React.KeyboardEvent | React.MouseEvent) => void;
}

type Anchor = "top" | "left" | "bottom" | "right";

export default function SideNav({ navData, open, toggleDrawer }: Props) {
  const theme = useTheme();
  const anchor = "left";

  const list = (anchor: Anchor) => (
    <Stack
      role="presentation"
      component="nav"
      sx={{
        flexDirection: "column",
        width: anchor === "top" || anchor === "bottom" ? "auto" : 250,
        backgroundColor: theme.palette.surface.main,
        minHeight: "100vh",
      }}
    >
      <Stack
        sx={{
          width: "100%",
          height: 70,
          flexDirection: "row",
          wrap: "nowrap",
          alignItems: "center",
          justifyContent: "end",
          py: 1,
          px: { xs: 2, sm: 4 },
        }}
      >
        <IconButton
          onClick={toggleDrawer(false)}
          sx={{
            mx: 0.2,
            height: 36,
            width: 36,
            borderRadius: "15px",
            boxSizing: "border-box",
            border: `1px solid ${alpha(theme.palette.border.dark, 0.2)}`,
            backgroundColor: theme.palette.surface.main,
            transition: theme.transitions.create("background-color"),

            "&:hover": {
              backgroundColor: theme.palette.surface.main,
              border: `1px solid ${alpha(theme.palette.border.main, 0.5)}`,
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
          }}
        >
          <MenuOpenOutlinedIcon />
        </IconButton>
      </Stack>
      <Divider />
      <List sx={{ p: 1, gap: 1 }}>
        {navData.map((item: NavDataType) => (
          <ListItem key={item.id} disablePadding>
            <ListItemButton
              component={NavLink}
              divider
              to={item.url}
              onClick={toggleDrawer(false)}
              sx={{
                color: theme.palette.text.secondary,
                textDecoration: "none",
                width: "100%",
                display: "flex",
                direction: "row",
                gap: 1,
                p: 1.5,
                border: "1px solid transparent",
                borderRadius: 1,
                cursor: "pointer",

                "& .MuiListItemText-primary": {
                  color: theme.palette.text.secondary,
                  fontSize: "1rem",
                  fontWeight: 500,
                },
                transition: theme.transitions.create(
                  ["background-color", "border-color", "display"],
                  {
                    duration: theme.transitions.duration.shortest,
                    easing: theme.transitions.easing.easeInOut,
                  }
                ),
                "&:hover": {
                  backgroundColor: theme.palette.surfaceContainer.dark,
                },
                "&.active": {
                  color: theme.palette.text.primary,
                  backgroundColor: theme.palette.surfaceContainer.dark,
                  boxShadow: `inset 4px 0 0 ${alpha(
                    theme.palette.primary.light,
                    1
                  )}`,
                },
              }}
            >
              {item.icon}
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );

  return (
    <Box>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={toggleDrawer(true)}
        sx={{
          display: { xs: "flex", sm: "none" },
          mx: 0.2,
          height: 36,
          width: 36,
          borderRadius: "15px",
          boxSizing: "border-box",
          border: `1px solid ${alpha(theme.palette.border.dark, 0.2)}`,
          backgroundColor: theme.palette.surface.main,
          transition: theme.transitions.create("background-color"),

          "&:hover": {
            backgroundColor: theme.palette.surface.main,
            border: `1px solid ${alpha(theme.palette.border.main, 0.5)}`,
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
        }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer anchor={anchor} open={open} onClose={toggleDrawer(false)}>
        {list(anchor)}
      </Drawer>
    </Box>
  );
}
