import { Container, Toolbar, Typography } from "@mui/material";
import * as React from "react";
import PageTitle from "../component/common/pageTitle";

export default function About() {
  return (
    <Container maxWidth="lg">
      <Toolbar />
      <PageTitle>About</PageTitle>
      <Container sx={{ mt: 3 }}>
        <p>
          Welcome to FLOWViZ! This framework allows you to seamlessly integrate
          others phylogenetic tools and frameworks, while providing workflow
          scheduling and execution, through the Apache Airflow workflow system.
        </p>
        <p>
          The code is freely available in this{" "}
          <a href="https://github.com/mig07/FLOWViZ">GitHub repository</a>.
        </p>
        <p>
          If you find any issue, please submit{" "}
          <a href="https://github.com/mig07/FLOWViZ/issues">here</a>!
        </p>
      </Container>
    </Container>
  );
}
