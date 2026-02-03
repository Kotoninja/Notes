import React from "react"
import Box from "@mui/material/Box";
import { NotesList } from "@/widgets/note/NotesList";

export function NotePage() {
    return (
        <>
            <h2>Home:</h2>
            <Box sx={{ my: 2, display: "flex", flexDirection: "column", gap: 1 }}>
                <NotesList />
            </Box>
        </>
    );
};
