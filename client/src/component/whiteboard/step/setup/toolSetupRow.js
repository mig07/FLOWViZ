import { Divider, Typography } from "@mui/material";
import * as React from "react";

export default function ToolSetupRow(props) {
  return (
    <>
      <Typography variant="h6">{props.title}</Typography>
      <Divider />
      {props.children}
    </>
  );
}
