import React from 'react'
import { useState } from 'react'
import api from '../api';

function NoteForm(props) {
    const [name, setName] = useState("");

    function handleForm(event) {
        event.preventDefault();
        api.post("/api/note/create/", { title: name })
            .then(function (response) {
                console.log(response)
                props.addTask(name, response?.data?.id)
            })
        setName("")
    }

    return (
        <>
            <form onSubmit={handleForm}>
                <input type="text" id="new-todo-input" name="text" value={name} onChange={(e) => setName(e.target.value)} />
                <button type="submit">Add</button>
            </form>
        </>
    )
}

export default NoteForm