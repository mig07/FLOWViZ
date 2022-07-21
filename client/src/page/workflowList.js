import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import {
  Container,
  Grid,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import * as React from "react";
import InfoBar from "../component/common/infoBar";
import Loading from "../component/common/loading";
import PageTitle from "../component/common/pageTitle";
import Request from "../service/request";
import CenteredContainer from "../component/common/centeredContainer";
import WorkflowService from "../service/workflowService";

const WorkflowStates = {
  cancelled: "cancelled",
  queued: "queued",
  running: "running",
  completed: "completed",
};

const componentStyle = {
  TableCell: {
    align: "center",
  },
};

const State = ({ icon, state }) => {
  return (
    <Grid container spacing={1}>
      <Grid item>{icon}</Grid>
      <Grid item>
        <Typography variant="caption">{state}</Typography>
      </Grid>
    </Grid>
  );
};

const getState = (value) => {
  switch (value) {
    case WorkflowStates.cancelled:
      return <State icon={<CancelIcon />} state={value} />;
    case WorkflowStates.queued:
      return <State icon={<HourglassTopIcon />} state={value} />;
    case WorkflowStates.running:
      return <State icon={<Loading />} state={value} />;
    case WorkflowStates.completed:
      return <State icon={<CheckCircleIcon />} state={value} />;
  }
};

export default function WorkflowList({ config }) {
  const url = `${config.appProtocol}://${config.address}:${config.port}/workflow`;

  const workflowService = new WorkflowService(config);

  const onError = (error) => {
    return <InfoBar type="error" text={error} />;
  };

  const onSuccess = (workflows) => {
    if (!workflows || workflows.length === 0)
      return (
        <CenteredContainer>
          <Typography>You do not have any workflows</Typography>
        </CenteredContainer>
      );
    return workflows.map((workflow) => {
      return (
        <TableRow
          key={workflow.name}
          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        >
          <TableCell component="th" scope="row">
            {workflow.name}
          </TableCell>
          <TableCell>{workflow.description}</TableCell>
          <TableCell>{workflow.creationDate}</TableCell>
          <TableCell>{workflow.finishDate}</TableCell>
          <TableCell>{getState(workflow.state)}</TableCell>
        </TableRow>
      );
    });
  };

  return (
    <>
      <Toolbar />
      <Container maxWidth="lg">
        <PageTitle name="Your workflows" />
        <TableContainer style={componentStyle} component={Paper} sx={{ mt: 5 }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Creation date</TableCell>
                <TableCell>Finish date</TableCell>
                <TableCell>State</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {workflowService.getWorkflows(onError, onSuccess, <Loading />)}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}
