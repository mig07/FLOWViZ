import { Grid, Stack, Typography } from "@mui/material";
import React from "react";
import PageTitle from "../common/pageTitle";

export default function TaskLog({
  workflowService,
  workflowName,
  selectedDagRun,
  selectedTaskId,
  selectedLogNumber,
  onError,
}) {
  const TaskLogView = (log) => {
    return (
      <Stack>
        <pre>{log}</pre>
      </Stack>
    );
  };

  return selectedLogNumber ? (
    <>
      <PageTitle variant="h5" sx={{ mt: 2, mb: 2 }}>
        Log number: {selectedLogNumber}
      </PageTitle>
      {workflowService.getWorkflowDagRunTaskInstanceLog(
        workflowName,
        selectedDagRun,
        selectedTaskId,
        selectedLogNumber,
        onError,
        TaskLogView,
        <></>
      )}
    </>
  ) : (
    <></>
  );
}
