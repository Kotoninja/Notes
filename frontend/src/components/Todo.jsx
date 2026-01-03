import React from 'react'
import Box from '@mui/material/Box'

function Todo(props) {
    return (
        <Box sx={{ display: "flex", flexDirection:"row"}}>
            <input type="checkbox" defaultChecked={props.completed} onChange={() => props.toggleTaskCompleted(props.id)}></input>
            <h2>
                {props.title}
            </h2>
            <button onClick={() => props.deleteTask(props.id)}>Delete</button>
        </Box>
    )
}

export default Todo;