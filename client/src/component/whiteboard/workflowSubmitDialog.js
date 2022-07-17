import React from "react";
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import { useEffect } from "react";
import { validateInputs } from "../postTool/util";

export default function WorkflowSubmitDialog({
  workflowName,
  onWorkflowNameUpdate,
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
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button onClick={onApply}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
}
