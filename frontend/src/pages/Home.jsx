import React from 'react'
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Layout from '../components/Layout';
import Button from '@mui/material/Button';
import NoteForm from '../components/NoteForm';
import { useState } from 'react';
import Todo from '../components/Todo';


const context = [
    {
        "id": 0,
        "title": "Hello",
        "description": "string",
        "publication_date": "2026-01-03T17:22:21.887Z",
        "end_date": "2026-01-03T17:22:21.887Z",
        "completed": true,
    },
    {
        "id": 1,
        "title": "Hello2",
        "description": "string",
        "publication_date": "2026-01-03T17:22:21.887Z",
        "end_date": "2026-01-03T17:22:21.887Z",
        "completed": true,
    }
]


function Home({ props }) {
    const [tasks, setTasks] = useState(context)

    function toggleTaskCompleted(id) {
        const updatedTasks = tasks.map((task) => {
            if (id === task.id) {
                return { ...task, completed: !task.completed };
            }
            return task;
        });
        setTasks(updatedTasks);
    }

    function addTask(name) {
        const newTask = { id: "todo-", title: name, completed: false }
        setTasks([...tasks, newTask])
    }

    const taskList = tasks.map((task) =>
    (<Todo id={task.id}
        title={task.title}
        description={task.description}
        publication_date={task.publication_date}
        end_date={task.end_date}
        completed={task.completed}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
    />))

    return (
        <Layout>
            <NoteForm addTask={addTask} />
            <Box sx={{ my: 2 }}>
                {taskList}
            </Box>
        </Layout>
    )
}

export default Home;