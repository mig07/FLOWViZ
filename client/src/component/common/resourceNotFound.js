import { Typography } from "@mui/material";
import * as React from "react";
import CenteredContainer from "./centeredContainer";

export default function ResourceNotFound(error) {
  return (
    <CenteredContainer maxWidth="lg">
      <Typography variant="body">{error}</Typography>
    </CenteredContainer>
  );
}
