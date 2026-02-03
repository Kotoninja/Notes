import React from "react"
import { useState, useEffect } from "react";
import { noteAPI } from "@/entities/note/api";
import Box from "@mui/material/Box";
import { TodoBlock } from "@/features/note/ui";

export function NotesList() {
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

    const taskList = tasks.map((task) =>
    (<TodoBlock
        id={task.id}
        title={task.title}
        description={task.description}
        publication_date={task.publication_date}
        end_date={task.end_date}
        completed={task.completed}
        key={task.id}
        tasks={tasks}
        setTasks={setTasks}
    />));

    return (
        <Box sx={{ my: 2, display: "flex", flexDirection: "column", gap: 1 }}>
            {taskList}
        </Box>
    )
}
