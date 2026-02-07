import { React, useState } from "react"
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import api from "../../api"


export function ProjectEditDialog(props) {
    const [newProjectName, setNewProjectName] = useState(props.name);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    function handleForm(e) {
        e.preventDefault();
        setLoading(true);
        if (newProjectName) {
            api.put(`/api/project/partial_update/${props.id}/`, { name: newProjectName })
                .then(function (response) {
                    props.editProject(response?.data?.id, response?.data?.name);
                })
                .finally(() => {
                    setNewProjectName(props.name);
                    setLoading(false);
                    props.onClose();
                });
        } else {
            setError(true);
            setLoading(false);
        }
    }

    return (
        <Dialog
            onClose={() => { props.onClose(false) }}
            open={props.open}
        >
            <Box sx={{ width: 500 }}>
                <DialogTitle id="alert-dialog-title">
                    {`Edit project: ${props.name}`}
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={() => { props.onClose(!open) }}
                    sx={(theme) => ({
                        position: "absolute",
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
                        <Button loading={loading} sx={{ width: "100%", mt: 3 }} variant="contained" type="submit">Rename</Button>
                    </form>
                </DialogContent>
            </Box>
        </Dialog >
    );
};
