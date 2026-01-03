import React from 'react'
import Box from '@mui/material/Box'

function Todo(props) {
    return (
        <Box>
            <h2>
                {props.title}
            </h2>
            <input type="checkbox" defaultChecked={props.completed} onChange={() => props.toggleTaskCompleted(props.id)}></input>
        </Box>
    )
}

export default Todo;