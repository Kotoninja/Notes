import React from 'react';
import Box from "@mui/material/Box";
import { LoginForm } from '@/features/auth/ui';

export function LoginPage() {
    return (
        <>
            <title>Login</title>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", flexDirection: "column" }}>
                <LoginForm/>
            </Box>
        </>
    );
};
