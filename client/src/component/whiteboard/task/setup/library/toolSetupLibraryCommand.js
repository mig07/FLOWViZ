import CloseIcon from "@mui/icons-material/Close";
import { Container, Grid, IconButton } from "@mui/material";
import * as React from "react";
import ToolSetupSelectField from "../toolSetupSelectField";

export default function ToolSetupLibraryCommand({
  index,
  commandGroups,
  state,
  onParentUpdate,
  onRemove,
}) {
  const commandGroupNames = commandGroups.map((cmdGroup) => cmdGroup.name);

  const currGroup = commandGroups.find(
    (cmdGroup) => cmdGroup.name === state.groupName
  );

  const cmdValues =
    state.name !== ""
      ? currGroup.commands.find((cmd) => cmd.name === state.name).allowedValues
      : [];

  return (
    <Grid container>
      <Grid item xs={1}>
        <IconButton onClick={(ev) => onRemove(ev, index)}>
          <CloseIcon />
        </IconButton>
      </Grid>
      <Grid item xs={11}>
        <Grid container>
          <ToolSetupSelectField
            id={`cmd-group-${index}`}
            label="Command group"
            values={commandGroupNames}
            currValue={state.groupName}
            fieldWidth={12}
            onCurrValueUpdate={(ev) => onParentUpdate(ev, index, "groupName")}
          />
          <ToolSetupSelectField
            id={`cmd-name-${index}`}
            label="Command name"
            values={currGroup.commands.map((cmd) => cmd.name)}
            currValue={state.name}
            fieldWidth={6}
            onCurrValueUpdate={(ev) => onParentUpdate(ev, index, "name")}
            stateDependency={state.groupName}
          />
          <ToolSetupSelectField
            id={`cmd-value-${index}`}
            label="Command value"
            values={cmdValues}
            currValue={state.value}
            fieldWidth={6}
            onCurrValueUpdate={(ev) => onParentUpdate(ev, index, "value")}
            stateDependency={state.name}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
