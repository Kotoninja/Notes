import React from "react";
import Box from "@mui/material/Box";
import { RegistrationForm } from "@/features/auth/ui/RegistrationForm";

export function RegistrationPage() {
    return (
        <>
            <title>Registration</title>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", flexDirection: "column" }}>
                <RegistrationForm />
            </Box>
        </>
    );
};
