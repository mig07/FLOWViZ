import { Grid, Stack, Typography, Divider } from "@mui/material";
import { useState } from "react";
import * as React from "react";
import ToolForm from "../toolForm";
import ToolSetupRow from "../toolSetupRow";
import ToolSetupStack from "../toolSetupStack";
import ToolSetupLibraryCommands from "./toolSetupLibraryCommands";
import Input from "../io/input";
import Output from "../io/output";

export default function ToolLibraryDialog({
  commands = [],
  commandGroups = [],
  onAddCommand = () => {},
  onRemoveCommand = () => {},
  onUpdateCommand = () => {},
}) {
  return (
    <ToolSetupStack>
      <ToolSetupRow title="Input">
        <Input />
      </ToolSetupRow>
      <ToolSetupRow title="Output">
        <Output />
      </ToolSetupRow>
      <ToolSetupRow title="Setup">
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
