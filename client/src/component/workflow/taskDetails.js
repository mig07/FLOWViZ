import { Grid, Stack, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import PageTitle from "../common/pageTitle";
import Selector from "../workflow/selector";
import TaskLog from "./taskLog";

export default function TaskDetails({
  workflowService,
  workflowName,
  selectedDagRun,
  selectedTaskId,
  onError,
}) {
  const [selectedLogNumber, setSelectedLogNumber] = useState("");

  const TaskDetailsView = ({ taskInstance, children }) => {
    return (
      <>
        <Grid container sx={{ mt: 2 }}>
          <Grid item xs={6}>
            <Stack>
              <Typography>
                <b>Run date:</b> {taskInstance.executionDate}
              </Typography>
              <Typography>
                <b>Run state:</b> {taskInstance.state}
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={6} container direction="column" alignItems="flex-end">
            <Selector
              id="dag-run-task-instance"
              label="Log"
              collection={Array(taskInstance.try_number).fill()}
              prop={"log"}
              value={selectedLogNumber}
              onChange={(e) => setSelectedLogNumber(e.target.value)}
              isFirst={true}
            />
          </Grid>
        </Grid>
        {children}
      </>
    );
  };

  return selectedTaskId ? (
    <>
      <PageTitle variant="h5" sx={{ mt: 2, mb: 2 }}>
        Task ID: {selectedTaskId}
      </PageTitle>
      {workflowService.getWorkflowDagRunTaskInstance(
        workflowName,
        selectedDagRun,
        selectedTaskId,
        onError,
        (taskInstance) => {
          return (
            <TaskDetailsView taskInstance={taskInstance}>
              <TaskLog
                workflowService={workflowService}
                workflowName={workflowName}
                selectedDagRun={selectedDagRun}
                selectedTaskId={selectedTaskId}
                selectedLogNumber={selectedLogNumber}
                onError={onError}
              />
            </TaskDetailsView>
          );
        },
        <></>
      )}
    </>
  ) : (
    <></>
  );
}
