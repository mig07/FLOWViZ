import * as React from "react";
import { Grid, IconButton } from "@mui/material";
import ToolSetupSelectField from "../toolSetupSelectField";
import CloseIcon from "@mui/icons-material/Close";

export default function ToolSetupLibraryCommand({
  index,
  commandGroups,
  state,
  onParentUpdate,
  onRemove,
}) {
  const commandGroupNames = commandGroups.map((cmdGroup) => cmdGroup.groupName);

  const currGroup = commandGroups.find(
    (cmdGroup) => cmdGroup.groupName === state.groupName
  );

  const cmdValues =
    state.name !== ""
      ? currGroup.commands.find((cmd) => cmd.name === state.name).allowedValues
      : [];

  return (
    <Grid container spacing={2}>
      <ToolSetupSelectField
        id={`cmd-group-${index}`}
        label="Command group"
        values={commandGroupNames}
        currValue={state.groupName}
        test={12}
        onCurrValueUpdate={(ev) => onParentUpdate(ev, index, "groupName", ["name", "value"])}
      />
      <ToolSetupSelectField
        id={`cmd-name-${index}`}
        label="Command name"
        values={currGroup.commands.map((cmd) => cmd.name)}
        currValue={state.name}
        test={6}
        onCurrValueUpdate={(ev) => onParentUpdate(ev, index, "name", ["value"])}
        stateDependency={state.groupName}
      />
      <ToolSetupSelectField
        id={`cmd-value-${index}`}
        label="Command value"
        values={cmdValues}
        currValue={state.value}
        test={6}
        onCurrValueUpdate={(ev) => onParentUpdate(ev, index, "value")}
        stateDependency={state.name}
      />
      <IconButton onClick={(ev) => onRemove(ev, index)}>
        <CloseIcon />
      </IconButton>
    </Grid>
  );
}
