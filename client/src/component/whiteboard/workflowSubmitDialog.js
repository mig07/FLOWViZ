import React from "react";
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogTitle,
  TextField,
} from "@material-ui/core";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useEffect } from "react";
import { validateInputs } from "../postTool/util";

export default function WorkflowSubmitDialog({
  workflowName,
  onWorkflowNameUpdate,
  workflowStartDateTime,
  setWorkflowStartDateTime,
  workflowEndDateTime,
  setWorkflowEndDateTime,
  setCanAdvance,
  open,
  onApply,
  onCancel,
}) {
  useEffect(() => {
    validateInputs([workflowName], setCanAdvance);
  }, [workflowName]);

  return (
    <Dialog onClose={onCancel} open={open}>
      <DialogTitle>Set workflow name</DialogTitle>
      <Container sx={{ p: 2 }}>
        <TextField
          id="workflow-name"
          label="Workflow Name"
          onChange={onWorkflowNameUpdate}
        />
      </Container>
      {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateTimePicker
          renderInput={(props) => <TextField {...props} />}
          label="Start date and time"
          value={workflowStartDateTime}
          onChange={(newValue) => {
            setWorkflowStartDateTime(newValue);
          }}
        />
      </LocalizationProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateTimePicker
          renderInput={(props) => <TextField {...props} />}
          label="End date and time"
          value={workflowEndDateTime}
          onChange={(newValue) => {
            setWorkflowEndDateTime(newValue);
          }}
        />
      </LocalizationProvider> */}
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button onClick={onApply}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
}
