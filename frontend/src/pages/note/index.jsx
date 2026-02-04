import { React, useState, useEffect } from "react"
import Box from "@mui/material/Box";
import { NotesList } from "@/widgets/note";
import { noteAPI } from "@/entities/note/api";

export function NotePage() {
    const [tasks, setTasks] = useState([]);
    // const [filter, setFilter] = useState("All");
    // const context = useContext(UserContext);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await noteAPI.getALL();
                setTasks(response || []);
            } catch (error) {
                console.error(error)
            };
        };
        fetchData()
    }, [])

    return (
        <>
            <h2>Home:</h2>
            <Box sx={{ my: 2, display: "flex", flexDirection: "column", gap: 1 }}>
                <NotesList props={{ tasks, setTasks }} />
            </Box>
        </>
    );
};
