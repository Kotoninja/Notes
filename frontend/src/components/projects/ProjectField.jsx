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
import { ProjectFieldListSettings } from './ProjectFieldListSettings';


function ProjectField(props) {
  const [isHovered, setIsHovered] = useState(false)
  const [isProjectListSettingsOpen, setIsProjectListSettingsOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null);

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
    <Box display="flex" alignItems="center" width="100%" id={props.id}>
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
      <IconButton onClick={(e) => { setIsProjectListSettingsOpen(!isProjectListSettingsOpen), setAnchorEl(e.currentTarget); }}
        sx={{ flexShrink: 0 }}
      >
        <MoreVertIcon />
      </IconButton>
      {isProjectListSettingsOpen && <ProjectFieldListSettings anchorEl={anchorEl} id={props.id}/>}
    </Box>
  );

  useEffect(() => {
    const handleClickOutside = (e) => {
      const mainElement = document.getElementById(props.id);
      const popperId = `popper-${props.id}`;
      const popperElement = document.getElementById(popperId);

      const clickedInsideMain = mainElement && mainElement.contains(e.target);
      const clickedInsidePopper = popperElement && popperElement.contains(e.target);

      console.log(!clickedInsideMain && !clickedInsidePopper)
      if (!clickedInsideMain && !clickedInsidePopper) {
        setIsProjectListSettingsOpen(false);
        setIsHovered(false)
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [props.id]);

  useEffect(() => {
    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      if (!isProjectListSettingsOpen) {
        setIsHovered(false);
      }
    };

    const element = document.getElementById(props.id);
    if (element) {
      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, [props.id, isProjectListSettingsOpen]);

  return (
    <ListItem id={props.id} key={props.id}>
      <ListItemButton sx={{ borderRadius: 4 }} >
        {isHovered ? infoTemplate : viewTemplate}
      </ListItemButton>
    </ListItem>
  );
};

export default ProjectField;
