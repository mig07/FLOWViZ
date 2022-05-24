import { Button, Grid } from "@mui/material";
import * as React from "react";
import { useState } from "react";
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
  };

  const command = {
    groupName: cmdGroup.groupName,
    name: "",
    value: "",
  };

  const onRemoveCommand = (event, i) => {
    setCommands((cmds) => cmds.splice(i, 1));
  };

  // TODO - add shouldClean
  const onUpdateCommand = (event, i, prop) => {
    const value = event.target.value;
    const cmds = [...commands];
    cmds[i][prop] = value;
    setCommands(cmds);
  };

  console.log(commands)

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
