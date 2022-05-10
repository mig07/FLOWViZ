import * as React from "react";
import { Box, TextField } from "@mui/material";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function TextFieldMultiInput(props) {
    const name = props.name
    const label = props.label
    const onButtonClick = props.onButtonClick
  return (
    <Box display="flex" alignItems="center">
      <TextField
        margin="normal"
        id={name}
        name={name}
        label={label}
      />
      <IconButton onClick={onButtonClick}>
        <AddIcon />
      </IconButton>
    </Box>
  );
}
