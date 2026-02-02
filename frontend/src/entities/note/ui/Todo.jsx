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
import Chip from '@mui/material/Chip';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AlarmAddIcon from '@mui/icons-material/AlarmAdd';
import DeleteIcon from '@mui/icons-material/Delete';

export function Todo(props) {
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState(props.title);
    const defaultEndDate = handlerDate(props.date)
    const [date, setDate] = useState(defaultEndDate);

    function handlerDate(end_date) {
        if (end_date) {
            var d = new Date(end_date);
            return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}T${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
        }
        return "";
    }

    function handleEditTask(event) {
        event.preventDefault();
        if (newName && newName !== props.title) {
            props.editTask(props.id, newName);
            setIsEditing(false);
        };
        if (date !== defaultEndDate) {
            props.editDate(props.id, props.title, date || null);
        };
        setIsEditing(false);
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!(e.target.closest(`.task-${props.id}`))) {
                setIsEditing(false);
            };
        };

        document.addEventListener("mousedown", handleClickOutside, true);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside, true);
        };
    }, [defaultEndDate, props.id, date]);

    const viewTemplate = <>
        <Box sx={{ display: "flex", flexDirection: "column" }} onDoubleClick={() => setIsEditing(!isEditing)}>
            <Box sx={{ display: "flex" }}>
                <Checkbox checked={props.completed} onChange={() => props.toggleTaskCompleted(props.id, props.title, props.completed)} />
                <Typography sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
                    {props.title}
                </Typography>
            </Box>
            {defaultEndDate && <Box sx={{ display: "flex", p: 1 }}><Chip icon={<AccessTimeIcon />} label={<time dateTime={defaultEndDate}>{defaultEndDate && String(defaultEndDate).replace("T", " ")}</time>} /></Box>}
        </Box>
    </>;

    const changeTemplate = <Box sx={{ p: 1 }}>
        <form onSubmit={handleEditTask} >
            <FormControl sx={{ display: "flex" }}>
                <Box sx={{ display: "flex" }}>
                    <Checkbox checked={props.completed} onChange={() => props.toggleTaskCompleted(props.id, props.title, props.completed)} />
                    <Input sx={{ width: "100%" }} type="text" value={newName} onChange={(e) => setNewName(e.target.value)} />
                    <IconButton onClick={() => setIsEditing(!isEditing)}><CloseIcon /></IconButton>
                </Box>
                <Box className={`task-${props.id}`}>
                    <Chip sx={{ mt: 3 }}
                        icon={<AlarmAddIcon />}
                        label={<input style={{ border: 0, backgroundColor: "inherit" }} type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} />}
                        onDelete={() => { setDate("") }}
                    />
                </Box>
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: 2 }}>
                    <Button sx={{ width: "30%" }} variant="contained" type="submit">Save</Button>
                    <IconButton sx={{ position: "absolute", right: 0 }} onClick={() => props.deleteTask(props.id)}><DeleteIcon color="error" /></IconButton>
                </Box>
            </FormControl>
        </form>
    </Box>;

    return (
        <Box
            className={`task-${props.id}`}
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
