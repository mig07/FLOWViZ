import React from "react";
import { Container, Toolbar, Typography } from "@mui/material";
import PageTitle from "../component/common/pageTitle";

export default function Workflow({ name, config }) {
  const url = `${config.appProtocol}://${config.address}:${config.port}/workflow`;

  const onError = (error) => {};

  const onSuccess = (workflows) => {};

  return (
    <>
      <Toolbar />
      <Container maxWidth="lg">
        <PageTitle name={name} />
        <PageTitle name="General data" variant="h5" sx={{ mt: 2 }} />
        <Typography>Last trigger date: </Typography>
        <Typography>Last trigger state: </Typography>
        <Typography>Tools involved: </Typography>
        <Typography>Times executed: </Typography>
        <PageTitle name="DAG view" variant="h5" sx={{ mt: 2 }} />
        <PageTitle name="DAG script" variant="h5" sx={{ mt: 2 }} />
      </Container>
    </>
  );
}
