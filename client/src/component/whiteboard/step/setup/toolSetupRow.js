import { Divider, Typography } from "@mui/material";
import * as React from "react";

export default function ToolSetupRow({title, children}) {
  return (
    <>
      <Typography variant="h6">{title}</Typography>
      <Divider />
      {children}
    </>
  );
}
