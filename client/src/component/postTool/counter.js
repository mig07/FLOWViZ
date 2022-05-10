import * as React from "react";
import { Box, TextField, Typography } from "@mui/material";

export default function Counter(props) {
  const label = props.label;
  const id = props.id;
  const minValue = Number(props.minValue);
  const defaultValue = props.defaultValue;
  const onValueChange = props.onValueChange;

  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      <Typography variant="h6" sx={{mr: 2}}>
        {label}
      </Typography>
      <TextField
        margin="normal"
        id={id}
        type="number"
        InputProps={{ inputProps: { min: minValue } }}
        defaultValue={defaultValue}
        onChange={onValueChange}
        name={id}
      />
    </Box>
  );
}
