import React from 'react'
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Layout from '../components/Layout';
import Button from '@mui/material/Button';
import NoteForm from '../components/NoteForm';
import { useState } from 'react';
import Todo from '../components/Todo';
import api from '../api';
import { useEffect } from 'react';

function Home(props) {
    const [tasks, setTasks] = useState([])

    async function fetchData() {
        api.get("api/note/all/")
            .then(function (response) {
                setTasks(response?.data)
            })
    }

    useEffect(() => {
        fetchData()
    }, [])


    function toggleTaskCompleted(id) {
        const updatedTasks = tasks.map((task) => {
            if (id === task.id) {
                api.put(`/api/note/update/${id}/`, { title: task.title, completed: !task.completed })
                return { ...task, completed: !task.completed };
            }
            return task;
        });
        setTasks(updatedTasks);
    }

    function addTask(name, id) {
        const newTask = { id: `todo-${id}`, title: name, completed: false }
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