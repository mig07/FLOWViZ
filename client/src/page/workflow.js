import React from "react";
import { useLocation } from "react-router-dom";
import { Container, Paper, Toolbar, Typography } from "@mui/material";
import PageTitle from "../component/common/pageTitle";
import WorkflowService from "../service/workflowService";
import Loading from "../component/common/loading";
import WorkflowView from "../component/common/workflowView";

export default function Workflow({ config }) {
  const location = useLocation();
  const name = location.pathname.split("/")[2]; //TODO

  const workflowService = new WorkflowService(config);

  const onError = (error) => {};

  // TODO
  const onSuccess = (workflow) => {
    const dbWorkflow = workflow.dbWorkflow;
    const airflowWorkflow = workflow.airflowWorkflow;
    return (
      <>
        <PageTitle name={name} />
        <Typography>
          <b>Description:</b> {dbWorkflow.description || "-"}
        </Typography>
        <Typography>
          <b>Last trigger date:</b> {"-"}
        </Typography>
        <Typography>
          <b>Last trigger state:</b> {"-"}
        </Typography>
        <Typography>
          <b>Tools involved:</b> {"-"}{" "}
        </Typography>
        <Typography>
          <b>Times executed:</b> {"-"}
        </Typography>
        <PageTitle name="DAG view" variant="h5" sx={{ mt: 2, mb: 2 }} />
        <WorkflowView />
        <PageTitle name="DAG script" variant="h5" sx={{ mt: 2 }} />
        <pre>{workflow.sourceCode.content}</pre>
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
