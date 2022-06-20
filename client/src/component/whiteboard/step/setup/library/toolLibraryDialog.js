import { Grid, Stack, Typography, Divider } from "@mui/material";
import { useState } from "react";
import * as React from "react";
import ToolForm from "../toolForm";
import ToolSetupRow from "../toolSetupRow";
import ToolSetupStack from "../toolSetupStack";
import ToolSetupLibraryCommands from "./toolSetupLibraryCommands";

export default function ToolLibraryDialog({
  commands = [],
  commandGroups = [],
  onAddCommand = () => {},
  onRemoveCommand = () => {},
  onUpdateCommand = () => {},
}) {
  return (
    <ToolSetupStack>
      <ToolSetupRow title="Input"></ToolSetupRow>
      <ToolSetupRow title="Output"></ToolSetupRow>
      <ToolSetupRow title="Command Setup">
        <ToolSetupLibraryCommands
          commands={commands}
          commandGroups={commandGroups}
          onAddCommand={onAddCommand}
          onRemoveCommand={onRemoveCommand}
          onUpdateCommand={onUpdateCommand}
        />
      </ToolSetupRow>
    </ToolSetupStack>
  );
}
