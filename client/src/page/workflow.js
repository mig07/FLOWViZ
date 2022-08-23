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
import PageTitle from "../component/common/pageTitle";
import WorkflowService from "../service/workflowService";
import Loading from "../component/common/loading";
import WorkflowView from "../component/common/workflowView";
import InfoBar from "../component/common/infoBar";
import Selector from "../component/workflow/selector";

export default function Workflow({ workflowService }) {
  const location = useLocation();
  const name = location.pathname.split("/")[2]; //TODO

  const [selectedDagRun, setSelectedDagRun] = useState("");
  const [selectedTaskId, setSelectedTaskId] = useState("");
  const [logNumber, setLogNumber] = useState("");

  const onStateUpdate = (event, setter) => {
    setter(event.target.value);
  };

  const onError = (error) => {
    return <InfoBar type="error" text={error} />;
  };

  const onSuccess = (workflow) => {
    const dbWorkflow = workflow.dbWorkflow;
    const airflow = workflow.airflow;
    const runs = airflow.runs;
    const sourceCode = airflow.sourceCode;

    return (
      <>
        <PageTitle>{name}</PageTitle>
        <Grid container sx={{ mt: 2 }}>
          <Grid item xs={6}>
            <Stack spacing={1}>
              <Typography>
                <b>Description:</b> {dbWorkflow.description || "-"}
              </Typography>
              <Typography>
                <b>Number of runs:</b> {runs.length || "-"}
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={6} container direction="column" alignItems="flex-end">
            <Selector
              id="dag-run"
              label="Dag run"
              collection={runs}
              prop={"dag_run_id"}
              value={selectedDagRun}
              onChange={(e) => onStateUpdate(e, setSelectedDagRun)}
              isFirst={true}
            />
          </Grid>
        </Grid>

        <PageTitle variant="h5" sx={{ mt: 2, mb: 2 }}>
          DAG view
        </PageTitle>
        <WorkflowView />
        <PageTitle variant="h5" sx={{ mt: 2 }}>
          Airflow script
        </PageTitle>
        <pre>{sourceCode.content}</pre>
      </>
    );
  };

  return (
    <>
      <Toolbar />
      <Container maxWidth="lg">
        {workflowService.getWorkflow(name, onError, onSuccess, <Loading />)}
      </Container>
    </>
  );
}
