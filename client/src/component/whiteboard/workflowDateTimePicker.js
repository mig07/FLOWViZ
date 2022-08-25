import React from "react";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import TextField from "@mui/material/TextField";

export default function WorkflowDateTimePicker({
  label,
  value,
  onDateTimeUpdate,
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateTimePicker
        label={label}
        value={value}
        onChange={onDateTimeUpdate}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}
