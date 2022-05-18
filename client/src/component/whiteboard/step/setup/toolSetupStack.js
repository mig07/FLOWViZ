import { Stack } from "@mui/material";
import * as React from "react";

export default function ToolSetupStack(props) {
  return <Stack spacing={2}>{props.children}</Stack>;
}
