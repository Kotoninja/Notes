import React from 'react'
import { useState } from 'react'


function NoteForm(props) {
    const [name, setName] = useState("");


    function handleForm(event) {
        event.preventDefault();
        props.addTask(name)
        setName("")
    }

    return (
        <>
            <form onSubmit={handleForm}>
                <input type="text" id="new-todo-input" name="text" value={name} onChange={(e) => setName(e.target.value)} />
                <button type="submit">Submit</button>
            </form>
        </>
    )
}

export default NoteForm