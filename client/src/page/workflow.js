import React from "react";
import { useLocation } from "react-router-dom";
import { Container, Toolbar, Typography } from "@mui/material";
import PageTitle from "../component/common/pageTitle";
import WorkflowService from "../service/workflowService";
import Loading from "../component/common/loading";
import WorkflowView from "../component/common/workflowView";

export default function Workflow({ config }) {
  const location = useLocation();
  const name = location.pathname.split("/")[2]; //TODO

  const workflowService = new WorkflowService(config);

  const onError = (error) => {};

  const onSuccess = (workflow) => {
    return (
      <>
        <PageTitle name={name} />
        <PageTitle name="General data" variant="h5" sx={{ mt: 2 }} />
        <Typography>Description: {workflow.description}</Typography>
        <Typography>Last trigger date: </Typography>
        <Typography>Last trigger state: </Typography>
        <Typography>Tools involved: </Typography>
        <Typography>Times executed: </Typography>
        <PageTitle name="DAG view" variant="h5" sx={{ mt: 2, mb: 2 }} />
        <WorkflowView />
        <PageTitle name="DAG script" variant="h5" sx={{ mt: 2 }} />
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
