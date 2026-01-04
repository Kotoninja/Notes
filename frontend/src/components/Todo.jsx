import React from 'react';
import Box from '@mui/material/Box';
import { useState } from 'react';

function Todo(props) {
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState(props.title);

    function handleEditTask(event) {
        event.preventDefault();
        if (newName && props.title !== newName) {
            props.editTask(props.id, newName);
            setIsEditing(false);
            setNewName(newName);
        }
    }

    const viewTemplate = <>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
            <input type="checkbox" checked={props.completed} onChange={() => props.toggleTaskCompleted(props.id, props.title, props.completed)}></input>
            <h2>
                {props.title}
            </h2>
            <button onClick={() => props.deleteTask(props.id)}>Delete</button>
            <button onClick={() => setIsEditing(!isEditing)}>Change</button>
        </Box>
    </>

    const changeTemplate = <>
        <Box>
            <form onSubmit={handleEditTask} >
                <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} />
                <Box>
                    <button type="submit">Save</button>
                    <button onClick={() => setIsEditing(!isEditing)}>Cancel</button>
                </Box>
            </form>
        </Box>
    </>

    return (isEditing ? changeTemplate : viewTemplate);

}

export default Todo;