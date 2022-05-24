import { Button, Grid } from "@mui/material";
import * as React from "react";
import { useState, useEffect } from "react";
import ToolSetupLibraryCommand from "./toolSetupLibraryCommand";

export default function ToolSetupLibraryCommands({
  library = {},
  onParentUpdate = () => {},
}) {
  const commandGroups = library.commandGroups;
  const cmdGroup = commandGroups.find((cmdGroup) => cmdGroup.order === 0);
  const firstCmd = cmdGroup.commands[0];
  const firstCmdName = firstCmd.name;

  const [commands, setCommands] = useState([
    {
      groupName: cmdGroup.groupName,
      name: firstCmdName,
      value: "",
    },
  ]);

  const onAddCommand = (event) => {
    setCommands([...commands, command]);
    onParentUpdate(commands)
  };

  const command = {
    groupName: cmdGroup.groupName,
    name: "",
    value: "",
  };

  const onRemoveCommand = (event, i) => {
    const cmds = [...commands]
    cmds.splice(i, 1)
    setCommands(cmds);
    onParentUpdate(commands)
  };

  const onUpdateCommand = (event, i, prop, propsToClean) => {
    const value = event.target.value;
    const cmds = [...commands];
    cmds[i][prop] = value;
    propsToClean.forEach((propToClean) => {
      cmds[i][propToClean] = "";
    });
    setCommands(cmds);
    onParentUpdate(commands)
  };

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
