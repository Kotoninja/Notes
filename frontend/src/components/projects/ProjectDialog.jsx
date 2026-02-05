import { React, useState } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import CloseIcon from '@mui/icons-material/Close';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import api from '../../api';
// TODO add color selection and description

export function ProjectDialog({ addProject }) {
    const [open, setOpen] = useState(false);
    const [newProjectName, setNewProjectName] = useState("");
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function handleForm(e) {
        e.preventDefault();
        setLoading(true);
        if (newProjectName) {
            api.post("api/project/create/", { name: newProjectName })
                .then(function (response) {
                    addProject(response?.data?.id, response?.data?.name, response?.data?.color);
                })
                .finally(() => {
                    setNewProjectName("");
                    setLoading(false);
                    handleClose();
                });
        } else {
            setError(true);
        }
    }

    return (
        <>
            <Tooltip title={"Create project"}>
                <IconButton sx={{ marginLeft: "auto" }} onClick={handleClickOpen}>
                    <AddCircleOutlineIcon sx={{ color: "#228B22" }} />
                </IconButton>
            </Tooltip>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <Box sx={{ width: 500 }}>
                    <DialogTitle id="alert-dialog-title">
                        {"Create new project"}
                    </DialogTitle>
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={(theme) => ({
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: theme.palette.grey[500],
                        })}
                    >
                        <CloseIcon />
                    </IconButton>
                    <DialogContent>
                        <form onSubmit={handleForm}>
                            <FormControl variant="standard" sx={{ display: "flex", justifyContent: "center" }}>
                                <TextField
                                    error={error}
                                    label="Project name"
                                    value={newProjectName}
                                    onChange={(e) => setNewProjectName(e.target.value)}
                                    onClick={() => setError(false)} />
                            </FormControl>
                            <Button loading={loading} sx={{ width: "100%", mt: 3 }} variant="contained" type="submit">Create</Button>
                        </form>
                    </DialogContent>
                </Box>
            </Dialog >
        </>
    )
};
