import * as React from "react";
import { Typography, useMediaQuery } from "@material-ui/core";
import { Container, Toolbar } from "@mui/material";

export default function ErrorPage({ statusCode, errorText }) {
  return (
    <>
      <Toolbar />
      <Container maxWidth="xl">
        <Typography align="center" variant="h2">
          Error {statusCode}
        </Typography>
        <Typography align="center" variant="h1">
          {errorText}
        </Typography>
      </Container>
    </>
  );
}
