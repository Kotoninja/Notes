import React from "react"
import List from "@mui/material/List"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import Popper from "@mui/material/Popper";
import Paper from "@mui/material/Paper"

export function ProjectFieldListSettings(props) {
    return (
        <Popper open={true} anchorEl={props.anchorEl} id={`popper-${props.id}`}>
            <Paper sx={{ width: "150px" }}>
                <List component="div" sx={{ borderRadius: "4px", mt: "4px", border: 1, borderColor: "grey.700", }} disablePadding>
                    <ListItemButton onClick={props.onEditClick}>
                        <ListItemIcon sx={{ minWidth: "35px" }}>
                            <DriveFileRenameOutlineIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Rename"} />
                    </ListItemButton>
                    <ListItemButton sx={{ color: "red" }} onClick={() => { props.deleteProject(props.id) }}>
                        <ListItemIcon sx={{ minWidth: "35px" }}>
                            <DeleteIcon sx={{ color: "red" }} />
                        </ListItemIcon>
                        <ListItemText primary="Delete" />
                    </ListItemButton>
                </List>
            </Paper>
        </Popper>
    );
};
