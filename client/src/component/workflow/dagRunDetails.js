import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  FormControl,
  MenuItem,
  Container,
  Select,
  InputLabel,
  Toolbar,
  Typography,
  Stack,
  Grid,
} from "@mui/material";
import PageTitle from "../common/pageTitle";
import Selector from "./selector";

export default function WorkflowDagRunInformation({
  selectedDagRun,
  workflowService = "-",
  workflowName = "-",
  dagRunId = "-",
  onError = () => {},
  selectorValue,
  selectorUpdate = (e) => {},
  children,
}) {
  return (
    <>
      <PageTitle variant="h5" sx={{ mt: 2, mb: 2 }}>
        Run details: {selectedDagRun}
      </PageTitle>
      {workflowService.getWorkflowRun(
        workflowName,
        dagRunId,
        onError,
        (dagRun) => {
          return (
            <>
              <Grid container sx={{ mt: 2 }}>
                <Grid item xs={6}>
                  <Typography>
                    <b>Run date:</b> {dagRun.executionDate}
                  </Typography>
                  <Typography>
                    <b>Run state:</b> {dagRun.state}
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={6}
                  container
                  direction="column"
                  alignItems="flex-end"
                >
                  {children}
                </Grid>
              </Grid>
            </>
          );
        },
        <></>
      )}
    </>
  );
}
