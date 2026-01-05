import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import Checkbox from '@mui/material/Checkbox';
import Input from '@mui/material/Input';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

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

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!e.target.closest(`#task-${props.id}`)) {
                setIsEditing(false);
            };
        };

        document.addEventListener("mousedown", handleClickOutside, true);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside, true);
        };
    }, [isEditing]);

    const viewTemplate = <>
        <Box sx={{ display: "flex" }} onDoubleClick={() => setIsEditing(!isEditing)}>
            <Checkbox checked={props.completed} onChange={() => props.toggleTaskCompleted(props.id, props.title, props.completed)} />
            <Typography sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
                {props.title}
            </Typography>
            {/* <button onClick={() => props.deleteTask(props.id)}>Delete</button> */}
            {/* <button onClick={() => setIsEditing(!isEditing)}>Change</button> */}
        </Box>
    </>

    const changeTemplate = <Box sx={{ p: 1 }}>
        <form onSubmit={handleEditTask} >
            <FormControl sx={{ display: "flex" }}>
                <Box sx={{ display: "flex" }}>
                    <Checkbox checked={props.completed} onChange={() => props.toggleTaskCompleted(props.id, props.title, props.completed)} />
                    <Input sx={{ width: "100%" }} type="text" value={newName} onChange={(e) => setNewName(e.target.value)} />
                    <IconButton onClick={() => setIsEditing(!isEditing)}><CloseIcon /></IconButton>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Button sx={{ mt: 2, width: "30%" }} variant="contained" type="submit">Save</Button>
                </Box>
            </FormControl>
            {/* <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} /> */}
            {/* <input type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} />
            <Box>
                <button style={{userSelect:"none"}} type="submit">Save</button>
                <button style={{userSelect:"none"}} onClick={() => setIsEditing(!isEditing)}>Cancel</button>
            </Box> */}
        </form>
    </Box>

    return (
        <Box
            id={`task-${props.id}`}
            sx={{
                border: 2,
                p: 0.5,
                borderRadius: 3,
                borderColor: "rgba(189, 189, 189, 0.5)",
                cursor: isEditing ? 'default' : 'pointer',
                userSelect: isEditing ? "auto" : "none"
            }}>
            {isEditing ? changeTemplate : viewTemplate}
        </Box>
    );

};

export default Todo;
