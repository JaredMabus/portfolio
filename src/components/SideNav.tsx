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
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import { NavDataType } from "./data/navData";

interface Props {
  navData: NavDataType[];
  open: boolean;
  toggleDrawer: (
    open: boolean
  ) => (
    event?: React.KeyboardEvent | React.MouseEvent | React.SyntheticEvent | object
  ) => void;
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
        width: anchor === "top" || anchor === "bottom" ? "auto" : 260,
        backgroundColor: theme.palette.surfaceContainer.main,
        color: theme.palette.surface.contrastText,
        minHeight: "100vh",
      }}
    >
      <Stack
        sx={{
          width: "100%",
          height: 70,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-end",
          py: 1,
          px: { xs: 2, sm: 4 },
        }}
      >
        <IconButton
          onClick={toggleDrawer(false)}
          color="neutral"
          variant="outlined"
          sx={{
            width: 42,
            height: 42,
          }}
        >
          <MenuOpenOutlinedIcon />
        </IconButton>
      </Stack>
      <Divider sx={{ borderColor: theme.palette.outline.main }} />
      <List sx={{ p: 1.5, display: "flex", flexDirection: "column", gap: 0.5 }}>
        {navData.map((item: NavDataType) => (
          <ListItem key={item.id} disablePadding>
            <ListItemButton
              component={NavLink}
              to={item.url}
              className="side-nav-button"
              onClick={toggleDrawer(false)}
              sx={{
                width: "100%",
                gap: 1.5,
                px: 2,
                py: 1,
              }}
            >
              {item.icon && (
                <ListItemIcon
                  sx={{
                    minWidth: "auto",
                    color: "inherit",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
              )}
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
        color="neutral"
        variant="outlined"
        aria-label="menu"
        onClick={toggleDrawer(true)}
        sx={{
          display: { xs: "flex", sm: "none" },
          width: 42,
          height: 42,
        }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        anchor={anchor}
        open={open}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            backgroundColor: theme.palette.surfaceContainer.main,
            backgroundImage: "none",
          },
        }}
      >
        {list(anchor)}
      </Drawer>
    </Box>
  );
}
