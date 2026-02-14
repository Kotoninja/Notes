import React from "react";
import Layout from "../components/Layout";
import List from "@mui/material/List";
import Grid from "@mui/material/Grid";
import { useState, useEffect } from "react";
import api from "../api";
import ProjectField from "../components/projects/ProjectField";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { TodoBlock } from "../components/TodoBlock";
import { ProjectCreateDialog } from "../components/projects/ProjectCreateDialog";
import NoteForm from "../components/NoteForm";

// TODO Add created time in projectField.

function Projects() {
    const [projects, setProjects] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [detailPk, setDetailPk] = useState(null);
    const [loadingNotes, setLoadingNotes] = useState(false);

    const projectsList = projects.map((project) =>
    (<ProjectField
        id={project.id}
        name={project.name}
        color={project.color}
        key={project.id}
        fetchProjectDetail={fetchProjectDetail}
        deleteProject={deleteProject}
        editProject={editProject}
    />));

    useEffect(() => {
        async function fetchData() {
            api.get("api/project/")
                .then(function (response) {
                    if (response?.data) {
                        setProjects(response?.data);
                    };
                });
        };
        fetchData();
    }, []);

    const notesList = tasks.map((task) => (
        <TodoBlock
            key={task.id}
            task={task}
            tasks={tasks}
            setTasks={setTasks}
        />
    ));

    function fetchProjectDetail(id) {
        if (detailPk !== id) {
            setLoadingNotes(true);
            api.get(`api/project/detail/${id}/`)
                .then(function (response) {
                    if (response?.data.notes.length) {
                        setTasks(response?.data.notes);
                        setLoadingNotes(false);
                    } else {
                        setTasks([]);
                    };
                })
                .finally(() => {
                    setDetailPk(id);
                    setLoadingNotes(false);
                });
        };
    };

    function addProject(id, name, color) {
        const newProject = { id: id, name: name, color: color };
        setProjects([...projects, newProject]);
    };

    function deleteProject(id) {
        api.delete(`api/project/delete/${id}/`)
            .then(
                setProjects(projects.filter((project) => project.id != id))
            )
    };

    function editProject(id, newName) {
        api.put(`api/project/partial_update/${id}/`, { name: newName })
            .then(() => {
                const editedTaskList = projects.map((project) => {
                    if (id === project.id) {
                        return { ...project, name: newName };
                    };
                    return project;
                });
                setProjects(editedTaskList);
            }
            );
    };

    function addTask(name, id) {
        const newTask = { id: id, key: `todo-${id}`, title: name, completed: false };
        setTasks([...tasks, newTask]);
    };

    return (
        <Layout sx={{ display: "flex" }}>
            <title>Projects</title>
            <Grid container spacing={1}>
                <Grid sx={{ borderRight: 2, borderRadius: 2, borderColor: "rgba(189, 189, 189, 0.5)", p: 1 }} size={3}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography>
                            Projects
                        </Typography>
                        <ProjectCreateDialog addProject={addProject} />
                    </Box>
                    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
                        {projectsList}
                    </List>
                </Grid>
                <Grid sx={{ p: 1, display: "flex", alignItems: "center", flexDirection: "column" }} size={9}>
                    <Box sx={{ width: "100%" }}>
                        <NoteForm addTask={addTask} sx={{ marginBottom: 15 }} body={{ project: detailPk }} />
                        {loadingNotes
                            ?
                            <CircularProgress />
                            :
                            tasks.length ?
                                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                                    {notesList}
                                </Box>
                                :
                                <Typography color="Grey" variant="h4" sx={{ userSelect: "none", textAlign: "center" }}>No notes...</Typography>
                        }
                    </Box>
                </Grid>
            </Grid>
        </Layout>
    );
};

export default Projects;
