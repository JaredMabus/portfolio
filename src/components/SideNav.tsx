import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink } from 'react-router-dom';


import { NavDataType } from "./navData";

interface Props {
    navData: NavDataType[];
    state: {left: boolean};
    toggleDrawer: Function;
}

type Anchor = 'top' | 'left' | 'bottom' | 'right';

export default function TemporaryDrawer ({ navData, state, toggleDrawer }: Props) {
    const list = (anchor: Anchor) => (
        <Box
            sx={{ pt: 4, width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                {navData.map((item: NavDataType) => (
                    <ListItem key={item.id} disablePadding>
                        <ListItemButton divider component={NavLink} to={item.url}>
                            {/* <ListItemIcon>
                                {item.icon}
                            </ListItemIcon> */}
                            <ListItemText primary={item.name} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            {/* <Divider /> */}
        </Box>
    );

    return (
        <div>
            {(['left']as const).map((anchor) => (
                <React.Fragment key={anchor}>
                    {/* <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button> */}
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={toggleDrawer(anchor, true)}
                        sx={{
                            mr: 2,
                            display: { xs: "flex", sm: 'none' }
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