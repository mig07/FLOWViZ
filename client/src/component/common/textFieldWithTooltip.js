import { InputAdornment, Grid, TextField, Tooltip } from "@mui/material";
import Typography from "@mui/material/Typography";
import * as React from "react";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";

function TextFieldWithTooltip({
  id,
  label,
  value,
  defaultValue,
  onChange = (event) => {},
  onKeyPress = (event) => {},
  tooltip,
}) {
  return (
    <TextField
      margin="normal"
      id={id}
      name={id}
      label={label}
      defaultValue={defaultValue}
      value={value}
      onChange={onChange}
      onKeyPress={onKeyPress}
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

function arePropsEqual(oldProps, newProps) {
  return oldProps.value === newProps.value;
}

export default React.memo(TextFieldWithTooltip, arePropsEqual);
