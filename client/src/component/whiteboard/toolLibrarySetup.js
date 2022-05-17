import { Grid, Stack, Typography, Divider } from "@mui/material";
import * as React from "react";
import { useState } from "react";
import ToolForm from "./toolForm";

export default function ToolLibrarySetup(props) {
  const library = props.library;
  const commandGroups = library.commandGroups;

  const cmdGroup = commandGroups.find((cmdGroup) => cmdGroup.order === 0);

  const firstCmd = cmdGroup.commands[0];
  const firstCmdName = firstCmd.name;

  const [cmd, setCmd] = useState(firstCmdName);
  const [cmdValue, setCmdValue] = useState("");
  const [subCommandSet, setSubCommandSet] = useState("");
  const [subCommand, setSubCommand] = useState("");
  const [subCommandValue, setSubCommandValue] = useState("");

  const selectedCmds = cmdGroup.commands.find(
    (command) => command.name === cmd
  );

  const onValueChange = (event, setter) => {
    const value = event.target.value;
    setter(value);
  };

  const SubCommands = () => {
    if (subCommandSet !== "") {
      const cmdGroupCommands = commandGroups.find(
        (cmdGroup) => cmdGroup.groupName === subCommandSet
      ).commands;
      return (
        <>
          <Grid item xs={6}>
            <ToolForm
              id="cmd-sub-command"
              label="Sub-Command"
              collection={cmdGroupCommands.map((cmd) => cmd.name)}
              value={subCommand}
              onValueUpdate={(event) => onValueChange(event, setSubCommand)}
            />
          </Grid>
          {subCommand !== "" ? (
            <Grid item xs={6}>
              <ToolForm
                id="cmd-sub-command-value"
                label="Sub-Command value"
                collection={cmdGroupCommands
                  .find((cmd) => cmd.name === subCommand)
                  .allowedValues.map((str) => str)}
                value={subCommandValue}
                onValueUpdate={(event) =>
                  onValueChange(event, setSubCommandValue)
                }
              />
            </Grid>
          ) : (
            <></>
          )}
        </>
      );
    }
    return <></>;
  };

  const CommandSetup = () => (
    <>
      <Typography variant="h6">Command Setup</Typography>
      <Divider />
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <ToolForm
            id="cmd-type"
            label="Command"
            collection={cmdGroup.commands.map((cmd) => cmd.name)}
            value={cmd}
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
        <SubCommands />
      </Grid>
    </>
  );

  const Inputs = () => (
    <>
      <Typography variant="h6">Input</Typography>
      <Divider />
    </>
  );

  const Outputs = () => (
    <>
      <Typography variant="h6">Output</Typography>
      <Divider />
    </>
  );

  return (
    <Stack spacing={2}>
      <Inputs/>
      <Outputs/>
      <CommandSetup />
    </Stack>
  );
}
