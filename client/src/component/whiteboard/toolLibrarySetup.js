import { Grid } from "@material-ui/core";
import * as React from "react";
import { useState } from "react";
import ToolForm from "./toolForm";

export default function ToolLibrarySetup(props) {
  const library = props.library;
  const commandGroups = library.commandGroups;

  const cmdGroup = commandGroups.find((cmdGroup) => cmdGroup.order === 0);

  const firstCmd = cmdGroup.commands[0];
  const firstCmdName = firstCmd.name;
  const firstCmdValue = firstCmd.allowedValues[0];
  const firstCmdSubCommandGroup = firstCmd.allowedCommandSets[0];

  const [cmd, setCmd] = useState(firstCmdName);
  const [cmdValue, setCmdValue] = useState(firstCmdValue);
  const [subCommandSet, setSubCommandSet] = useState(firstCmdSubCommandGroup);
  const [subCommand, setSubCommand] = useState("");
  const [subCommandValue, setSubCommandValue] = useState("");

  const selectedCmds = cmdGroup.commands.find(
    (command) => command.name === cmd
  );

  const onValueChange = (event, setter) => {
    const value = event.target.value;
    setter(value);
  };

  return (
    <Grid container>
      <Grid item xs={6}>
        <ToolForm
          id="cmd-type"
          label="Command"
          collection={cmdGroup.commands.map((cmd) => cmd.name)}
          value={cmd.name}
          onValueUpdate={(event) => onValueChange(event, setCmd)}
        />
      </Grid>
      <Grid item xs={6}>
        <ToolForm
          id="cmd-value"
          label="Command Value"
          collection={selectedCmds.allowedValues.map((value) => value)}
          value={cmdValue}
          onValueUpdate={(event) => onValueChange(event, setCmdValue)}
        />
      </Grid>

      <Grid item xs={12}>
        <ToolForm
          id="cmd-subCmdSet"
          label="Sub-Command Set"
          collection={selectedCmds.allowedCommandSets.map((value) => value)}
          value={subCommandSet}
          onValueUpdate={(event) => onValueChange(event, setSubCommandSet)}
        />
      </Grid>
      <Grid item xs={6}>
        <ToolForm
          id="cmd-sub-command"
          label="Sub-Command"
          /* collection={
            commandGroups.find(
              (cmdGroup) => cmdGroup.groupName === subCommandSet
            ).commands
          } */
          value={subCommand}
          onValueUpdate={(event) => onValueChange(event, setSubCommand)}
        />
      </Grid>
      <Grid item xs={6}>
        <ToolForm
          id="cmd-sub-command-value"
          label="Sub-Command value"
          /* collection={
            commandGroups
              .find((cmdGroup) => cmdGroup.groupName === subCommandSet)
              .commands.find((cmd) => cmd.name === subCommand).allowedValues
          } */
          value={subCommandValue}
          onValueUpdate={(event) => onValueChange(event, setSubCommandValue)}
        />
      </Grid>
    </Grid>
  );
}
