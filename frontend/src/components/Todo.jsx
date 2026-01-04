import React from 'react';
import Box from '@mui/material/Box';
import { useState } from 'react';

function Todo(props) {
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState(props.title);
    const defaultEndDate = (() => {
        if (props.end_date) {
            var d = new Date(props.end_date);
            return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}T${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
        };
        return undefined;
    })();
    const [date, setDate] = useState(defaultEndDate);

    function handleEditTask(event) {
        event.preventDefault();
        if (newName && newName !== props.title) {
            props.editTask(props.id, newName);
            setIsEditing(false);
        }
        if (date !== defaultEndDate) {
            props.editDate(props.id, props.title, date);
            setIsEditing(false);
        };
    };

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
                <input type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} />
                <Box>
                    <button type="submit">Save</button>
                    <button onClick={() => setIsEditing(!isEditing)}>Cancel</button>
                </Box>
            </form>
        </Box>
    </>

    return (isEditing ? changeTemplate : viewTemplate);

};

export default Todo;