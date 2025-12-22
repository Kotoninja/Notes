import React from "react"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Container from "@mui/material/Container"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import notes from "../assets/notes.svg";
import { indigo } from "@mui/material/colors";
import { useState } from "react"
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from "@mui/material/IconButton"
import MenuItem from "@mui/material/MenuItem"
import Divider from "@mui/material/Divider"
import Link from "@mui/material/Link"

const NavBar = () => {
    const [open, setOpen] = useState(false);

    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <AppBar
            position="fixed"
            square={true}
            sx={{ p: 2, display: "block", boxShadow: 0, backgroundColor: "transparent" }}
        >
            <Container  >
                <Toolbar variant="string" sx={{ backgroundColor: "rgba(26, 35, 126, 0.4)", backdropFilter:"blur(24px)", borderRadius:4}}>
                    <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 0, }}>
                        <Link href="/">
                            <img src={notes} style={{ width: 100 }} />
                        </Link>
                        <Box sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: "center", flex: 1 }}>
                            <Button variant="text" color="white" href="/home">
                                Home
                            </Button>
                            <Button variant="text" color="white" sx={{ minWidth: 0 }} href="/faq">
                                FAQ
                            </Button>
                        </Box>
                        <Box
                            sx={{ display: { xs: 'none', md: 'flex' }, gap: 1, alignItems: 'center', }}>
                            <Button color="white" variant="outlined"  href="/login" >
                                Sign in
                            </Button>
                            <Button sx={{ color: "black", background: "white" }} variant="contained"  href="/registration">
                                Sign up
                            </Button>
                        </Box>
                    </Box>

                    <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1 }}>
                        <IconButton aria-label="Menu button" onClick={toggleDrawer}>
                            <MenuIcon sx={{ color: "white" }} />
                        </IconButton>
                        <Drawer anchor="top" open={open} onClose={toggleDrawer}>
                            <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
                                <Box
                                    sx={{ display: 'flex', justifyContent: 'flex-end', }}
                                >
                                    <IconButton onClick={toggleDrawer}>
                                        <CloseIcon />
                                    </IconButton>
                                </Box>
                                <MenuItem>Home</MenuItem>
                                <MenuItem>FAQ</MenuItem>
                                <Divider sx={{ my: 3 }} />
                                <MenuItem>
                                    <Button sx={{ backgroundColor: indigo['300'] }} variant="contained" fullWidth>
                                        Sign up
                                    </Button>
                                </MenuItem>
                                <MenuItem>
                                    <Button sx={{ color: indigo['300'], borderColor: indigo['300'] }} variant="outlined" fullWidth>
                                        Sign in
                                    </Button>
                                </MenuItem>
                            </Box>
                        </Drawer>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default NavBar;