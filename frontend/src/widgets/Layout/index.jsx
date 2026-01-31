import React from 'react';
import { Navbar } from "../Navbar";
import { Footer } from "../Footer";
import Container from '@mui/material/Container';
import { Outlet } from 'react-router-dom';

export function Layout() {
    return (
        <>
            <Navbar />
            <Container sx={{ mt: 10 }}>
                <Outlet />
            </Container>
            <Footer />
        </>
    );
};
