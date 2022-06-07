import { Container, Typography } from "@mui/material";
import * as React from "react";

export default function ResourceNotFound(error) {
  // TODO
  return (
    <Container>
      <Typography variant="body">{error}</Typography>
    </Container>
  );
}
