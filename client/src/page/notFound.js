import * as React from "react";
import { Typography, useMediaQuery } from "@material-ui/core";
import { Container, Toolbar } from "@mui/material";

export default function NotFound() {
  return (
    <>
      <Toolbar />
      <Container maxWidth="xl">
        <Typography align="center" variant="h2">Error 404</Typography>
        <Typography align="center" variant="h1">Page Not Found!</Typography>
      </Container>
    </>
  );
}
