import React from 'react';
import { Navbar } from "../Navbar";
import { Footer } from "../Footer";
import Container from '@mui/material/Container';

export function Layout({ children }) {
    return (
        <>
            <Navbar />
            <Container sx={{ mt: 10 }}>
                {children}
            </Container>
            <Footer />
        </>
    )
};
