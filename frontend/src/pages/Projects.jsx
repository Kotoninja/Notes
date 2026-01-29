import React from 'react';
import Layout from '../components/Layout';
import List from '@mui/material/List';
import Grid from '@mui/material/Grid';
import { useState, useEffect } from 'react';
import api from '../api';
import ProjectField from '../components/ProjectField';
import Todo from '../components/Todo';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// TODO Add individual components for notes in projects.
// TODO Add created time in projectField.
// TODO Project addition system.
// TODO Project note addition system.

function Projects() {
    const [projects, setProjects] = useState([]);
    const [notes, setNotes] = useState([]);
    const [detailPk, setDetailPk] = useState(null);
    const [loadingNotes, setLoadingNotes] = useState(false);

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

    const notesList = notes.map((note) => (
        <Todo
            key={note.id}
            id={note.id}
            title={note.title}
        />
    ));

    function fetchProjectDetail(id) {
        if (detailPk !== id) {
            setLoadingNotes(true);
            api.get(`api/project/detail/${id}/`)
                .then(function (response) {
                    if (response?.data.notes.length) {
                        setNotes(response?.data.notes);
                        setLoadingNotes(false)
                    } else {
                        setNotes([]);
                    };
                })
                .finally(() => {
                    setDetailPk(id)
                    setLoadingNotes(false)
                });
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
                <Grid sx={{ border: 1, borderRadius: 2, p: 1, ...((loadingNotes || !notes.length) && { display: 'flex', justifyContent: "center", alignItems: "center" }) }} size={9}>
                    {loadingNotes
                        ?
                        <CircularProgress />
                        :
                        notes.length ?
                            <Box sx={{ display:"flex",flexDirection:"column", gap:2}}>
                                {notesList}
                            </Box>
                            :
                            <Typography color="Grey" variant="h4" sx={{ userSelect: "none" }}>No notes...</Typography>
                    }
                </Grid>
            </Grid>
        </Layout>
    );
};

export default Projects;
