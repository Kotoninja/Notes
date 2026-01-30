import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { notesLabel } from "@/shared/ui/icons/Notes";
import { grey } from "@mui/material/colors";
import { useState } from "react";
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import { useContext } from "react";
import UserContext from "@/";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import LogoutIcon from '@mui/icons-material/Logout';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

// TODO Links to pages in one list
export const Navbar = () => {
    const [open, setOpen] = useState(false);
    const context = useContext(UserContext);
    const [openUser, setOpenUser] = useState(false);

    const handleClick = () => {
        setOpenUser(!openUser);
    };

    const toggleDrawer = () => {
        setOpen(!open);
    };


    const profileTitles = [["Profile", <AccountCircleIcon />], ["Settings", <SettingsIcon />]].map((title) =>
        <ListItemButton key={title} href={`/profile/${context?.user?.id}`} disabled >
            <ListItemIcon sx={{ minWidth: "35px" }}>
                {title[1]}
            </ListItemIcon>
            <ListItemText primary={title[0]} />
        </ListItemButton>
    );

    return (
        <AppBar
            position="fixed"
            square={true}
            sx={{ pt: 2, display: "block", boxShadow: 0, backgroundColor: "transparent" }}
        >
            <Container>
                <Toolbar variant="string" sx={{ backgroundColor: "rgba(26, 35, 126, 0.4)", backdropFilter: "blur(12px)", borderRadius: 4, p: 1 }}>
                    <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 0, }}>
                        <Link href="/home">
                            <img src={notesLabel} style={{ width: 100, display: "flex", justifyContent: "center" }} />
                        </Link>
                        <Box sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: "center", flex: 1 }}>
                            <Button variant="text" color="white" href="/home">
                                Home
                            </Button>
                            <Button variant="text" color="white" href="/projects">
                                Projects
                            </Button>
                        </Box>

                        <Box sx={{ display: "flex", gap: 1, alignItems: 'center', justifyContent: "flex-end", flexGrow: { xs: 1, md: 0 } }}>
                            {!context?.loading &&
                                <>
                                    {context?.isAuthorized ?
                                        <>
                                            <Box>
                                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                                    <Avatar sx={{ width: 36, height: 36 }}>{context?.user?.username[0].toUpperCase()}</Avatar>
                                                    <IconButton sx={{ color: "white" }} size="small" onClick={handleClick}>
                                                        {openUser ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                                                    </IconButton>
                                                </Box>
                                                <Collapse in={openUser} timeout="auto" unmountOnExit sx={{ position: "absolute", color: 'black', width: "150px" }}>
                                                    <List component="div" sx={{ background: grey[200], borderRadius: "4px", mt: "4px", border: 1, borderColor: 'grey.700', }} disablePadding>
                                                        <ListItem>
                                                            <ListItemIcon sx={{ minWidth: "35px" }}>
                                                                <Avatar sx={{ width: 24, height: 24 }}>{context?.user?.username[0].toUpperCase()}</Avatar>
                                                            </ListItemIcon>
                                                            <ListItemText primary={context?.user?.username} />
                                                        </ListItem>
                                                        <Divider variant="middle" />
                                                        {profileTitles}
                                                        <Divider variant="middle" />
                                                        <ListItemButton href="logout">
                                                            <ListItemIcon sx={{ minWidth: "35px" }}>
                                                                <LogoutIcon />
                                                            </ListItemIcon>
                                                            <ListItemText primary="Logout" />
                                                        </ListItemButton>
                                                    </List>
                                                </Collapse>
                                            </Box>
                                        </>
                                        :
                                        <>
                                            <Button color="white" variant="outlined" href="/login" >
                                                Sign in
                                            </Button>
                                            <Button sx={{ color: "black", background: "white" }} variant="contained" href="/registration">
                                                Sign up
                                            </Button>
                                        </>
                                    }
                                </>
                            }
                        </Box>

                    </Box>

                    <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1 }}>
                        <IconButton aria-label="Menu button" onClick={toggleDrawer}>
                            <MenuIcon sx={{ color: "white" }} />
                        </IconButton>
                        <Drawer anchor="top" open={open} onClose={toggleDrawer}>
                            <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
                                <Box
                                    sx={{ display: 'flex', justifyContent: 'flex-end' }}
                                >
                                    <IconButton onClick={toggleDrawer}>
                                        <CloseIcon />
                                    </IconButton>
                                </Box>
                                <MenuItem><Button href="/home">Home</Button></MenuItem>
                                <MenuItem><Button href="/projects">Projects</Button></MenuItem>
                                <Divider sx={{ my: 3 }} />
                            </Box>
                        </Drawer>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
