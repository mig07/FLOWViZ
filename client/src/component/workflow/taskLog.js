import { Grid, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import PageTitle from "../common/pageTitle";
import Loading from "../common/loading";

export default function TaskLog({
  workflowService,
  workflowName,
  selectedDagRun,
  selectedTaskId,
  selectedLogNumber,
  onError,
}) {
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
        (log) => (
          <code>{log.content}</code>
        ),
        <Loading />
      )}
    </>
  ) : (
    <></>
  );
}
