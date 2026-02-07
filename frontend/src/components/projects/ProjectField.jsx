import React, { useEffect, useState } from 'react';
import WorkIcon from '@mui/icons-material/Work';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Typography from '@mui/material/Typography';
import ListItemButton from '@mui/material/ListItemButton';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';

function ProjectField(props) {
  const [isHovered, setIsHovered] = useState(false)
  // console.
  const viewTemplate = <>
    <ListItemAvatar sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: props.color,
      minWidth: 35,
      height: 35,
      borderRadius: "50%",
      mr: 1,
    }}>
      <WorkIcon fontSize="medium" />
    </ListItemAvatar>
    <ListItemText primary={<Typography noWrap>{props.name}</Typography>} secondary="Jan 9, 2014" />
  </>


  const infoTemplate = (
    <Box display="flex" alignItems="center" width="100%">
      <Box
        display="flex"
        alignItems="center"
        flex={1}
        minWidth={0}
        sx={{ cursor: 'pointer' }}
        onClick={() => { props.fetchProjectDetail(props.id) }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: props.color,
            width: 35,
            height: 35,
            borderRadius: "50%",
            mr: 1,
            flexShrink: 0
          }}
        >
          <WorkIcon fontSize="medium" />
        </Box>
        <Box flex={1} minWidth={0}>
          <ListItemText
            primary={
              <Typography noWrap sx={{ overflow: "hidden", textOverflow: "ellipsis" }}>
                {props.name}
              </Typography>
            }
            secondary="Jan 9, 2014"
          />
        </Box>
      </Box>
      <IconButton
        sx={{ flexShrink: 0, zIndex: 1500 }}
      >
        <MoreVertIcon />
      </IconButton>
    </Box>
  );

  useEffect(() => {
    const handleViewTrue = (e) => {
      if (e.target.id == props.id) {
        setIsHovered(true);
      }
    }

    const handleViewFalse = (e) => {
      if (e.target.id == props.id) {
        setIsHovered(false);
      }
    }
    document.addEventListener("mouseenter", handleViewTrue, true)
    document.addEventListener("mouseleave", handleViewFalse, true)
    return () => {
      document.removeEventListener("mouseenter", handleViewTrue, true);
      document.removeEventListener("mouseleave", handleViewFalse, true);
    };
  }, [])


  return (
    <ListItem id={props.id} key={props.id}>
      <Tooltip title={props.name}>
        <ListItemButton sx={{ borderRadius: 4 }} >
          {isHovered ? infoTemplate : viewTemplate}
        </ListItemButton>
      </Tooltip>
    </ListItem>
  );
};

export default ProjectField;
