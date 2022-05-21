import { Grid, Stack, Typography, Divider } from "@mui/material";
import * as React from "react";
import ToolForm from "../toolForm";
import ToolSetupRow from "../toolSetupRow";
import ToolSetupStack from "../toolSetupStack";
import ToolSetupLibraryCommands from "./toolSetupLibraryCommands";

export default function ToolLibraryDialog({
  library = {},
  librarySetup = {},
  onParentUpdate = () => {},
}) {
  /* const SubCommands = () => {
    if (librarySetup.subCommandSet !== "") {
      const cmdGroupCommands = commandGroups.find(
        (cmdGroup) => cmdGroup.groupName === librarySetup.subCommandSet
      ).commands;
      return (
        <>
          <Grid item xs={6}>
            <ToolForm
              id="cmd-sub-command"
              label="Sub-Command"
              collection={cmdGroupCommands.map((cmd) => cmd.name)}
              value={librarySetup.subCommand}
              onSelectValueChange={(event) => onParentUpdate(event, "subCommand")}
            />
          </Grid>
          {librarySetup.subCommand !== "" ? (
            <Grid item xs={6}>
              <ToolForm
                id="cmd-sub-command-value"
                label="Sub-Command value"
                collection={
                  cmdGroupCommands.find((cmd) => cmd.name === librarySetup.subCommand)
                    .allowedValues
                }
                value={librarySetup.subCommandValue}
                onSelectValueChange={(event) => onParentUpdate(event, "subCommandValue")}
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
          collection={firstCmdGroup.commands.map((command) => command.name)}
          value={librarySetup.cmd}
          onSelectValueChange={(event) => onParentUpdate(event, "cmd")}
        />
      </Grid>
      <Grid item xs={6}>
        <ToolForm
          id="cmd-value"
          label="Command Value"
          collection={selectedCmds.allowedValues}
          value={librarySetup.cmdValue}
          onSelectValueChange={(event) => onParentUpdate(event, "cmdValue")}
        />
      </Grid>

      <Grid item xs={12}>
        <ToolForm
          id="cmd-subCmdSet"
          label="Sub-Command Set"
          collection={selectedCmds.allowedCommandSets}
          value={librarySetup.subCommandSet}
          onSelectValueChange={(event) => onParentUpdate(event, "subCommandSet")}
        />
      </Grid>
      <SubCommands />
    </Grid>
  ); */

  return (
    <ToolSetupStack>
      <ToolSetupRow title="Input"></ToolSetupRow>
      <ToolSetupRow title="Output"></ToolSetupRow>
      <ToolSetupRow title="Command Setup">
        <ToolSetupLibraryCommands
          library={library}
          librarySetup={librarySetup}
          onParentUpdate={onParentUpdate}
        />
        {/* <CommandSetup /> */}
      </ToolSetupRow>
    </ToolSetupStack>
  );
}
