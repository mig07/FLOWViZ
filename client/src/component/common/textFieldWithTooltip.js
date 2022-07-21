import { InputAdornment, Grid, TextField, Tooltip } from "@mui/material";
import Typography from "@mui/material/Typography";
import * as React from "react";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";

export default function TextFieldWithTooltip({
  id,
  label,
  defaultValue,
  onChange = (event) => {},
  tooltip,
}) {
  return (
    <TextField
      margin="normal"
      id={id}
      name={id}
      label={label}
      defaultValue={defaultValue}
      onChange={onChange}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Tooltip disableFocusListener disableTouchListener title={tooltip}>
              <HelpOutlineOutlinedIcon />
            </Tooltip>
          </InputAdornment>
        ),
      }}
    />
  );
}
