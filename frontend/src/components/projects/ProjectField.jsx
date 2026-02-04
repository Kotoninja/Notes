import React from 'react';
import WorkIcon from '@mui/icons-material/Work';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Typography from '@mui/material/Typography';
import ListItemButton from '@mui/material/ListItemButton';
import Tooltip from '@mui/material/Tooltip';

function ProjectField(props) {
  return (
    <ListItem>
      <Tooltip title={props.name}>
        <ListItemButton sx={{ borderRadius: 4 }} onClick={() => { props.fetchProjectDetail(props.id) }}>
          <ListItemAvatar sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: props.color,
            minWidth: 35,
            height: 35,
            borderRadius: "50%",
            mr: 1
          }}>
            <WorkIcon fontSize="medium" />
          </ListItemAvatar>
          <ListItemText primary={<Typography noWrap>{props.name}</Typography>} secondary="Jan 9, 2014" />
        </ListItemButton>
      </Tooltip>
    </ListItem>
  );
};

export default ProjectField;
