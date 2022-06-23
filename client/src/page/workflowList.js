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
import Loading from "../component/common/loading";
import PageTitle from "../component/common/pageTitle";
import ResourceNotFound from "../component/common/resourceNotFound";
import Request from "../service/request";

const WorkflowStates = {
  cancelled: "cancelled",
  queued: "queued",
  running: "running",
  completed: "completed",
};

function createData(name, description, creationDate, finishDate, state) {
  return { name, description, creationDate, finishDate, state };
}

const rows = [
  createData(
    "MyFirstPipeline",
    "This is my first pipeline",
    new Date().toDateString(),
    "-",
    WorkflowStates.queued
  ),
  createData(
    "ExamplePipeline",
    "This is an example pipeline",
    new Date().toDateString(),
    "-",
    WorkflowStates.queued
  ),
  createData(
    "TrimmomaticPipeline",
    "A trimmomatic pipeline",
    new Date().toDateString(),
    "-",
    WorkflowStates.cancelled
  ),
];

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

  const onSuccess = (workflows) => {
    rows.map((workflow) => (
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
    ));
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
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell>{row.creationDate}</TableCell>
                  <TableCell>{row.finishDate}</TableCell>
                  <TableCell>{getState(row.state)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}
