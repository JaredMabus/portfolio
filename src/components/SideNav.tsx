import * as React from "react";
import { NavLink } from "react-router-dom";
import MenuOpenOutlinedIcon from "@mui/icons-material/MenuOpenOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Box,
  IconButton,
  Divider,
  Stack,
  useTheme,
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
        width: anchor === "top" || anchor === "bottom" ? "auto" : 256,
        backgroundColor: theme.palette.surface.main,
        minHeight: "100vh",
      }}
    >
      <Stack
        sx={{
          width: "100%",
          minHeight: { xs: 64, sm: 76 },
          flexDirection: "row",
          wrap: "nowrap",
          alignItems: "center",
          justifyContent: "end",
          py: { xs: 1.5, sm: 2 },
          px: { xs: 2, sm: 3 },
        }}
      >
        <IconButton
          onClick={toggleDrawer(false)}
          sx={{
            mx: 0.25,
            height: 36,
            width: 36,
            borderRadius: "10px",
            boxSizing: "border-box",
            border: `1px solid ${theme.palette.border.state.outlinedBorder}`,
            backgroundColor: theme.palette.surfaceContainerLow.main,
            transition: theme.transitions.create([
              "background-color",
              "border-color",
            ]),

            "&:hover": {
              backgroundColor: theme.palette.surfaceContainer.state.hover,
              border: `1px solid ${theme.palette.border.main}`,
              "& .MuiSvgIcon-root": {
                color: theme.palette.text.primary,
              },
            },

            "& .MuiSvgIcon-root": {
              fontSize: "18px",
              color: theme.palette.text.secondary,
              transition: theme.transitions.create("color"),
            },

            "& .MuiTouchRipple-ripple .MuiTouchRipple-child": {
              backgroundColor: theme.palette.surfaceContainer.state.selected,
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
                  fontSize: "14px",
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
                  backgroundColor: theme.palette.surfaceContainer.state.hover,
                  "& .MuiListItemText-primary": {
                    color: theme.palette.text.primary,
                  },
                },
                "&.active": {
                  color: theme.palette.text.primary,
                  backgroundColor: theme.palette.surfaceContainer.state.selected,
                  boxShadow: `inset 4px 0 0 ${theme.palette.primary.main}`,
                  "& .MuiListItemText-primary": {
                    color: theme.palette.text.primary,
                    fontWeight: 700,
                  },
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
          mx: 0.25,
          height: 36,
          width: 36,
          borderRadius: "10px",
          boxSizing: "border-box",
          border: `1px solid ${theme.palette.border.state.outlinedBorder}`,
          backgroundColor: theme.palette.surfaceContainerLow.main,
          transition: theme.transitions.create([
            "background-color",
            "border-color",
          ]),

          "&:hover": {
            backgroundColor: theme.palette.surfaceContainer.state.hover,
            border: `1px solid ${theme.palette.border.main}`,
            "& .MuiSvgIcon-root": {
              color: theme.palette.text.primary,
            },
          },

          "& .MuiSvgIcon-root": {
            fontSize: "18px",
            color: theme.palette.text.secondary,
            transition: theme.transitions.create("color"),
          },

          "& .MuiTouchRipple-ripple .MuiTouchRipple-child": {
            backgroundColor: theme.palette.surfaceContainer.state.selected,
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
