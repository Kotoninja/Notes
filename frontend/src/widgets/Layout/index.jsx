import React from 'react';
import NavBar from "../Navbar";
import Footer from "../Footer";
import Container from '@mui/material/Container';

export function Layout({ children }) {
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
