import { Typography } from "@mui/material";
import * as React from "react";
import CenteredContainer from "./centeredContainer";

export default function GenericError({ error }) {
  return (
    <CenteredContainer maxWidth="lg">
      <Typography variant="h6" align="center">
        {error}
      </Typography>
    </CenteredContainer>
  );
}
