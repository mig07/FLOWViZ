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
  const [startDateTime, setStartDateTime] = useState(new Date());
  const [endDateTime, setEndDateTime] = useState(new Date());
  const [canAdvance, setCanAdvance] = useState(false);

  const onDateTimeUpdate = (newValue, setter) => {
    setter(newValue);
  };

  const requiredFields = [name, startDateTime, endDateTime];

  useEffect(() => {
    validateInputs(requiredFields, setCanAdvance);
  }, requiredFields);

  return (
    <Dialog onClose={onCancel} open={open}>
      <DialogTitle>Set workflow name</DialogTitle>
      <Stack spacing={3} padding={2}>
        <Container>
          <TextField
            id="workflow-name"
            label="Workflow Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Container>
        <WorkflowDateTimePicker
          label="Start date and time"
          value={startDateTime}
          onDateTimeUpdate={(val) => onDateTimeUpdate(val, setStartDateTime)}
        />
        <WorkflowDateTimePicker
          label="End date and time"
          value={endDateTime}
          onDateTimeUpdate={(val) => onDateTimeUpdate(val, setEndDateTime)}
        />
      </Stack>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button
          disabled={!canAdvance}
          onClick={() => onApply(name, startDateTime, endDateTime)}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
