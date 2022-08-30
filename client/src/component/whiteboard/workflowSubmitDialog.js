import React from "react";
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import { useState, useEffect } from "react";
import { validateInputs } from "../postTool/util";
import WorkflowDateTimePicker from "./workflowDateTimePicker";
import { Stack } from "@mui/system";

export default function WorkflowSubmitDialog({ open, onApply, onCancel }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startDateTime, setStartDateTime] = useState(new Date());
  const [canAdvance, setCanAdvance] = useState(false);

  const onDateTimeUpdate = (newValue, setter) => {
    setter(newValue);
  };

  const requiredFields = [name, startDateTime];

  useEffect(() => {
    validateInputs(requiredFields, setCanAdvance);
  }, requiredFields);

  return (
    <Dialog onClose={onCancel} open={open}>
      <DialogTitle>Workflow submission</DialogTitle>
      <Stack spacing={3} padding={2}>
        <TextField
          id="workflow-name"
          label="Workflow Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          id="workflow-description"
          label="Workflow Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <WorkflowDateTimePicker
          label="Start date and time"
          value={startDateTime}
          onDateTimeUpdate={(val) => onDateTimeUpdate(val, setStartDateTime)}
        />
      </Stack>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button
          disabled={!canAdvance}
          onClick={() => onApply(name, description, startDateTime)}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
