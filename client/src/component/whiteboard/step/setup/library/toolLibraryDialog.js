import { Grid, Stack, Typography, Divider } from "@mui/material";
import { useState } from "react";
import * as React from "react";
import ToolForm from "../toolForm";
import ToolSetupRow from "../toolSetupRow";
import ToolSetupStack from "../toolSetupStack";
import ToolSetupLibraryCommands from "./toolSetupLibraryCommands";

export default function ToolLibraryDialog({
  library = {},
  onParentUpdate = () => {},
}) {
  return (
    <ToolSetupStack>
      <ToolSetupRow title="Input"></ToolSetupRow>
      <ToolSetupRow title="Output"></ToolSetupRow>
      <ToolSetupRow title="Command Setup">
        <ToolSetupLibraryCommands library={library} />
      </ToolSetupRow>
    </ToolSetupStack>
  );
}
