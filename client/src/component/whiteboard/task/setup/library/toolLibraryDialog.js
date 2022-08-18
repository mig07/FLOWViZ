import { Button } from "@mui/material";
import { useState } from "react";
import * as React from "react";
import ToolSetupRow from "../toolSetupRow";
import ToolSetupStack from "../toolSetupStack";
import ToolSetupLibraryCommand from "./toolSetupLibraryCommand";
import Input from "../../io/input";
import Output from "../../io/output";

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
        {commands.map((cmd, i) => (
          <ToolSetupLibraryCommand
            key={i}
            index={i}
            commandGroups={commandGroups}
            state={cmd}
            onParentUpdate={onUpdateCommand}
            onRemove={onRemoveCommand}
          />
        ))}
        <Button onClick={onAddCommand}>Add command</Button>
      </ToolSetupRow>
    </ToolSetupStack>
  );
}
