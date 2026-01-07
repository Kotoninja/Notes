import React from 'react'
import { useState } from 'react'
import api from '../api';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/TextField';

function NoteForm(props) {
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false)

    function handleForm(event) {
        event.preventDefault();
        if (name) {
            setLoading(true)
            api.post("/api/note/create/", { title: name })
                .then(function (response) {
                    console.log(response)
                    props.addTask(name, response?.data?.id)
                })
                .finally(setLoading(false))
            setName("")
        }
    }

    return (
        <>
            <h2>Home:</h2>
            <form onSubmit={handleForm}>
                <FormControl fullWidth={true}>
                    <OutlinedInput id="new-todo-input" placeholder={"What needs to be done?"} value={name} onChange={(e) => setName(e.target.value)} />
                    <Button loading={loading} variant="contained" sx={{ my: 2 }} type="submit">Add</Button>
                </FormControl>
            </form>
        </>
    )
}

export default NoteForm