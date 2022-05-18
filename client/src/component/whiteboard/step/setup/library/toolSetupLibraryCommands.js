import { Grid } from "@mui/material";
import * as React from "react";
import ToolSetupSelectField from "../toolSetupSelectField";

export default function ToolSetupLibraryCommands(props) {
  const library = props.library;
  const librarySetupState = props.librarySetupState;
  const onLibrarySetupUpdate = props.onLibrarySetupUpdate;

  const commandGroups = library.commandGroups;
  const cmdGroup = commandGroups.find((cmdGroup) => cmdGroup.order === 0);

  const onCurrValueUpdate = (event, mainProp, consumer) => {
    const value = event.target.value;
    let mProp = mainProp;
    consumer(mProp, value);
    onLibrarySetupUpdate(mProp);
  };

  console.log(librarySetupState)

  const onValueUpdate = (event, consumer) => {
    onCurrValueUpdate(event, librarySetupState, consumer);
  };

  return (
    <Grid container spacing={2}>
      <ToolSetupSelectField
        id="cmd-type"
        label="Command"
        values={cmdGroup.commands.map((cmd) => cmd.name)}
        currValue={librarySetupState.commandName}
        onCurrValueUpdate={(event) =>
          onValueUpdate(event, (libSetup, value) => {
            libSetup.commandName = value;            
          })
        }
        stateDependency={librarySetupState.commandName}
      />
      {/* <ToolSetupSelectField
        id="cmd-value"
        label="Command Value"
        values={selectedCmd.allowedValues}
        currValue={librarySetupState.commandValue}
        onCurrValueUpdate={(event) => {
          onValueUpdate(event, (libSetup, value) => {
            libSetup.commandValue = value;
          });
        }}
        stateDependency={librarySetupState.commandName}
      />
      <ToolSetupSelectField
        id="cmd-subCmdSet"
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
