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
  ButtonProps,
  useTheme,
  Tooltip,
  alpha,
} from "@mui/material";

import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import { NavDataType } from "./navData";
import { to } from "@react-spring/web";

interface Props {
  navData: NavDataType[];
  state: { left: boolean };
  toggleDrawer: Function;
}

type Anchor = "top" | "left" | "bottom" | "right";

export default function TemporaryDrawer({
  navData,
  state,
  toggleDrawer,
}: Props) {
  const theme = useTheme();

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

      //   onClick={toggleDrawer(anchor, false)}
      //   onKeyDown={toggleDrawer(anchor, false)}
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
          onClick={toggleDrawer(anchor, false)}
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
      <List sx={{ p: 1 }}>
        {navData.map((item: NavDataType) => (
          <ListItem key={item.id} disablePadding>
            <ListItemButton
              component={NavLink}
              divider
              to={item.url}
              sx={{
                display: "flex",
                direction: "row",
                gap: 1,
                p: 2,
                backgroundColor: theme.palette.surface.main,
                StackSizing: "border-box",
                border: "1px solid transparent",
                borderRadius: 1,
                cursor: "pointer",
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
    <div>
      {(["left"] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(anchor, true)}
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
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
