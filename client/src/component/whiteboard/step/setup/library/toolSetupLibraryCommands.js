import { Grid } from "@mui/material";
import * as React from "react";
import ToolSetupSelectField from "../toolSetupSelectField";

export default function ToolSetupLibraryCommands({
  library = {},
  librarySetup = {},
  onParentUpdate = () => {},
}) {
  const commandGroups = library.commandGroups;

  const cmdGroup = commandGroups.find((cmdGroup) => cmdGroup.order === 0);

  console.log(librarySetup);

  return (
    <Grid container spacing={2}>
      <ToolSetupSelectField
        id="cmd-type"
        label="Command"
        values={cmdGroup.commands.map((cmd) => cmd.name)}
        currValue={librarySetup.cmd}
        onCurrValueUpdate={(event) => onParentUpdate(event, "cmd")}
        stateDependency={librarySetup.cmd}
      />
      <ToolSetupSelectField
        id="cmd-value"
        label="Command Value"
        values={
          cmdGroup.commands.find((cmd) => cmd.name === librarySetup.cmd)
            .allowedValues
        }
        currValue={librarySetup.cmdValue}
        onCurrValueUpdate={(event) => onParentUpdate(event, "cmdValue")}
        stateDependency={librarySetup.cmd}
      />
      {/* <ToolSetupSelectField
        id="cmd-sub-command-set"
        label="Sub-Command Set"
        values={selectedCmd.allowedCommandSets}
        currValue={librarySetupState.subCommandSet}
        onCurrValueUpdate={(event) => {
          onValueUpdate(event, (libSetup, value) => {
            libSetup.commandValue = value;
          });
        }}
        stateDependency={librarySetupState.commandName}
      />
      <ToolSetupSelectField
        id="cmd-sub-command"
        label="Sub-Command"
        values={commandGroups.map((cmd) => cmd.name)}
        currValue={librarySetupState.subCommandName}
        onCurrValueUpdate={(event) => {
          onValueUpdate(event, (libSetup, value) => {
            libSetup.commandValue = value;
          });
        }}
        stateDependency={librarySetupState.subCommandSet}
      />
      <ToolSetupSelectField
        id="cmd-sub-command-value"
        label="Sub-Command value"
        values={[]}
        currValue={librarySetupState.subCommandValue}
        onCurrValueUpdate={(event) => {
          onValueUpdate(event, (libSetup, value) => {
            libSetup.commandValue = value;
          });
        }}
        stateDependency={librarySetupState.subCommandName}
      /> */}
    </Grid>
  );
}
