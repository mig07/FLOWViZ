import { Grid, Stack, Typography, Divider } from "@mui/material";
import * as React from "react";
import { useState } from "react";
import ToolForm from "../toolForm";
import ToolSetupRow from "../toolSetupRow";
import ToolSetupStack from "../toolSetupStack";
import ToolSetupLibraryCommands from "./toolSetupLibraryCommands";

export default function ToolLibraryDialog({ library, librarySetupState, onLibrarySetupUpdate }) {

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
    setter(oldVal => value);
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
                  .allowedValues}
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
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <ToolForm
          id="cmd-type"
          label="Command"
          collection={cmdGroup.commands.map(cmd => cmd.name)}
          value={cmd}
          onValueUpdate={(event) => onValueChange(event, setCmd)}
        />
      </Grid>
      <Grid item xs={6}>
        <ToolForm
          id="cmd-value"
          label="Command Value"
          collection={selectedCmds.allowedValues}
          value={cmdValue}
          onValueUpdate={(event) => onValueChange(event, setCmdValue)}
        />
      </Grid>

      <Grid item xs={12}>
        <ToolForm
          id="cmd-subCmdSet"
          label="Sub-Command Set"
          collection={selectedCmds.allowedCommandSets}
          value={subCommandSet}
          onValueUpdate={(event) => onValueChange(event, setSubCommandSet)}
        />
      </Grid>
      <SubCommands />
    </Grid>
  );

  return (
    <ToolSetupStack>
      <ToolSetupRow title="Input"></ToolSetupRow>
      <ToolSetupRow title="Output"></ToolSetupRow>
      <ToolSetupRow title="Command Setup">
        {/* <ToolSetupLibraryCommands
          library={library}
          librarySetupState={librarySetupState}
          onLibrarySetupUpdate={onLibrarySetupUpdate}
        /> */}
        <CommandSetup />
      </ToolSetupRow>
    </ToolSetupStack>
  );
}
