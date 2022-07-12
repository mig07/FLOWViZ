import { Container, Typography } from "@mui/material";
import * as React from "react";

export default function CenteredContainer({ maxWidth, children }) {
  return (
    <Container
      maxWidth={maxWidth}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {children}
    </Container>
  );
}
