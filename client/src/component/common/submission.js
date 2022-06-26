import { Container, Toolbar } from "@mui/material";
import Typography from "@mui/material/Typography";
import * as React from "react";

export default function Submission({ text, Icon }) {
  return (
    <Container maxWidth="lg">
      <Typography variant="h2">{text}</Typography>
      {!Icon ? (
        <></>
      ) : (
        <>
          <Toolbar />
          <Icon fontSize="large" />
        </>
      )}
    </Container>
  );
}
