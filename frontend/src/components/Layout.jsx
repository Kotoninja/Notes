import React from 'react';
import NavBar from "./NavBar";
import Footer from "./Footer";
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

function Layout({ children }) {
    return (
        <>
            <NavBar />
            <Container sx={{ mt: 10 }}>
                {children}
            </Container>
            <Footer />
        </>
    )
};

export default Layout;