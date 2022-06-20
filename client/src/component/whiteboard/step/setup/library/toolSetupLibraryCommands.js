import { Button, Grid } from "@mui/material";
import * as React from "react";
import { useState, useEffect } from "react";
import ToolSetupLibraryCommand from "./toolSetupLibraryCommand";

export default function ToolSetupLibraryCommands({
  commands = [],
  commandGroups = [],
  onAddCommand = () => {},
  onRemoveCommand = () => {},
  onUpdateCommand = () => {},
}) {
  return (
    <>
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
    </>
  );
}
