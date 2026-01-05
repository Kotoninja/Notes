import React from 'react';
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Layout from '../components/Layout';
import Button from '@mui/material/Button';
import NoteForm from '../components/NoteForm';
import { useState } from 'react';
import Todo from '../components/Todo';
import api from '../api';
import { useEffect } from 'react';
import FilterButton from '../components/FilterButton';

const FILTER_MAP = {
    All: () => true,
    Active: (task) => !task.completed,
    Completed: (task) => task.completed,
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

function Home(props) {
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState("All")

    const taskList = tasks.filter(FILTER_MAP[filter]).map((task) =>
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
        editDate={editDate}
    />));


    const filterList = FILTER_NAMES.map((name) => (
        <FilterButton key={name} name={name} isPressed={name === filter} setFilter={setFilter} />
    ));

    async function fetchData() {
        api.get("api/note/all/")
            .then(function (response) {
                if (response?.data) {
                    setTasks(response?.data);
                };
            });
    };

    useEffect(() => {
        fetchData();
    }, []);


    function toggleTaskCompleted(id, taskTitle, taskCompleted) {
        api.put(`/api/note/update/${id}/`, { title: taskTitle, completed: !taskCompleted })
            .then(() => {
                const updatedTasks = tasks.map((task) => {
                    if (id === task.id) {
                        return { ...task, completed: !taskCompleted };
                    };
                    return task;
                });
                setTasks(updatedTasks);
            });
    };

    function editTask(id, newName) {
        api.put(`/api/note/update/${id}/`, { title: newName })
            .then(() => {
                const editedTaskList = tasks.map((task) => {
                    if (id === task.id) {
                        return { ...task, title: newName };
                    };
                    return task;
                });
                setTasks(editedTaskList);
            }
            );
    };

    function editDate(id, taskTitle, taskEndDate) {
        api.put(`/api/note/update/${id}/`, { title: taskTitle, end_date: taskEndDate })
            .then(() => {
                const editedTaskList = tasks.map((task) => {
                    if (id === task.id) {
                        return { ...task, end_date: taskEndDate };
                    };
                    return task;
                });
                setTasks(editedTaskList);
            });
    };

    function addTask(name, id) {
        const newTask = { id: id, key: `todo-${id}`, title: name, completed: false };
        setTasks([...tasks, newTask]);
    };

    function deleteTask(id) {
        api.delete(`api/note/delete/${id}/`)
            .then(
                setTasks(tasks.filter((task) => task.id != id))
            );
    };

    return (
        <Layout>
            <NoteForm addTask={addTask} />
            <Box sx={{ display: "flex", gap: 5, justifyContent: "center" }}>
                {filterList}
            </Box>
            <Box sx={{ my: 2, display:"flex", flexDirection:"column", gap:1}}>
                {taskList}
            </Box>
        </Layout>
    );
};

export default Home;
