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
                if (response?.data) {
                    setTasks(response?.data)
                }
            })
    }

    useEffect(() => {
        fetchData()
    }, [])


    function toggleTaskCompleted(id) {
        const updatedTasks = tasks.map((task) => {
            if (id === task.id) {
                api.put(`/api/note/update/${id}/`, { title: task.title, completed: !task.completed }) // FIXME 
                return { ...task, completed: !task.completed };
            }
            return task;
        });
        setTasks(updatedTasks);
    }

    function editTask(id, newName) {
        api.put(`/api/note/update/${id}/`, { title: newName })
            .then(() => {
                const editedTaskList = tasks.map((task) => {
                    if (id === task.id) {
                        return { ...task, title: newName }
                    }
                    return task
                })
                setTasks(editedTaskList)
            }
            )
    }

    function addTask(name, id) {
        const newTask = { id: id, key: `todo-${id}`, title: name, completed: false }
        setTasks([...tasks, newTask])
    }

    function deleteTask(id) {
        api.delete(`api/note/delete/${id}/`)
            .then(
                setTasks(tasks.filter((task) => task.id != id))
            )
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
        deleteTask={deleteTask}
        editTask={editTask}
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