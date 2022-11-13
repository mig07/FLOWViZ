import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import {
  Button,
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
import { useNavigate } from "react-router-dom";
import InfoBar from "../component/common/infoBar";
import Loading from "../component/common/loading";
import PageTitle from "../component/common/pageTitle";
import CenteredContainer from "../component/common/centeredContainer";

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

export default function WorkflowList({ workflowService }) {
  const navigate = useNavigate();

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
      const dagId = workflow.dag_id;
      return (
        <TableRow
          key={dagId}
          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        >
          <TableCell>
            <Button onClick={() => navigate(`/workflow/${dagId}`)}>
              {dagId}
            </Button>
          </TableCell>
          <TableCell>{workflow.description || "-"}</TableCell>
        </TableRow>
      );
    });
  };

  return (
    <>
      <Toolbar />
      <Container maxWidth="lg">
        <PageTitle>Your workflows</PageTitle>
        <TableContainer style={componentStyle} component={Paper} sx={{ mt: 5 }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
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
