import React, { useContext } from 'react';
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
import UserContext from '../context/UserContext';
import { TodoBlock } from '../components/TodoBlock';

const FILTER_MAP = {
    All: () => true,
    Active: (task) => !task.completed,
    Completed: (task) => task.completed,
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

function Home() {
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState("All");
    const context = useContext(UserContext);

    const taskList = tasks.filter(FILTER_MAP[filter]).map((task) =>
    (<TodoBlock key={task.id} task={task} tasks={tasks} setTasks={setTasks}
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

    function addTask(name, id) {
        const newTask = { id: id, key: `todo-${id}`, title: name, completed: false };
        setTasks([...tasks, newTask]);
    };


    return (
        <Layout>
            <title>Home</title>
            {
                context?.isAuthorized &&
                <>
                    <NoteForm addTask={addTask} />
                    <Box sx={{ display: "flex", gap: 5, justifyContent: "center" }}>
                        {filterList}
                    </Box>
                    <Box sx={{ my: 2, display: "flex", flexDirection: "column", gap: 1 }}>
                        {taskList}
                    </Box>
                </>
            }
        </Layout>
    );
};

export default Home;
