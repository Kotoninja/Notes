import React from 'react';
import Layout from '../components/Layout';
import List from '@mui/material/List';
import Grid from '@mui/material/Grid';
import { useState, useEffect } from 'react';
import api from '../api';
import ProjectField from '../components/ProjectField';
import Todo from '../components/Todo';


```
TODO Add individual components for notes in projects.
TODO Add created time in projectField.
TODO Project addition system.
TODO Project note addition system.
```
function Projects() {
    const [projects, setProjects] = useState([]);
    const [notes, setNotes] = useState([]);
    const [detailPk, setDetailPk] = useState(null);

    async function fetchData() {
        api.get("api/project/")
            .then(function (response) {
                if (response?.data) {
                    setProjects(response?.data);
                };
            });
    };

    const projectsList = projects.map((project) =>
    (<ProjectField
        id={project.id}
        name={project.name}
        color={project.color}
        key={project.id}
        fetchProjectDetail={fetchProjectDetail}
    />));

    useEffect(() => {
        fetchData();
    }, []);

    const notesList = notes.map((note) => ( // TODO stopped here
        <Todo
            key={note.id}
            id={note.id}
            title={note.title}
        />
    ));

    function fetchProjectDetail(id) {
        if (detailPk !== id) {
            api.get(`api/project/detail/${id}/`)
                .then(function (response) {
                    if (response?.data.notes.length) {
                        setNotes(response?.data.notes);
                    } else {
                        setNotes([]);
                    };
                })
                .finally(() => { setDetailPk(id) });
        };
    };

    return (
        <Layout sx={{ display: "flex" }}>
            <title>Projects</title>
            <Grid container spacing={1}>
                <Grid sx={{ border: 1, borderRadius: 2, p: 1 }} size={3}>
                    Projects
                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                        {projectsList}
                    </List>
                </Grid>
                <Grid sx={{ border: 1, borderRadius: 2, p: 1 }} size={9}>
                    {notesList}
                </Grid>
            </Grid>
        </Layout>
    );
};

export default Projects;
