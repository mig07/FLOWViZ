import EditIcon from "@mui/icons-material/Edit";
import { IconButton, TextField, Typography } from "@mui/material";
import React from "react";

export default function CommandPreview({
  cmdPreview,
  onCommandEdit,
  onEditButtonPress,
  isEditable,
}) {
  return (
    <>
      <Typography>
        <b>Command preview</b>
      </Typography>
      <TextField
        value={cmdPreview}
        onChange={onCommandEdit}
        InputProps={{
          readOnly: !isEditable,
          endAdornment: (
            <IconButton
              variant="contained"
              color={isEditable ? "primary" : "default"}
              onClick={onEditButtonPress}
            >
              <EditIcon />
            </IconButton>
          ),
        }}
      />
    </>
  );
}
