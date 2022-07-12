import { Toolbar } from "@mui/material";
import Typography from "@mui/material/Typography";
import * as React from "react";
import CenteredContainer from "./centeredContainer";

export default function Submission({ text, Icon }) {
  return (
    <CenteredContainer maxWidth="lg">
      <Typography variant="h2">{text}</Typography>
      {!Icon ? (
        <></>
      ) : (
        <>
          <Toolbar />
          <Icon fontSize="large" />
        </>
      )}
    </CenteredContainer>
  );
}
