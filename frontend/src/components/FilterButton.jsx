import React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function FilterButton(props) {
  return (
    <Button
      className="btn toggle-btn"
      variant="outlined"
      aria-pressed={props.isPressed}
      onClick={() => props.setFilter(props.name)}>
      <Typography sx={{ textDecoration:(props.isPressed && "underline" ) }}>{props.name}</Typography>
    </Button>
  );
};

export default FilterButton;