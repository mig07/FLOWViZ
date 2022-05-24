import * as React from "react";
import { Grid } from "@mui/material";
import ToolSetupSelectField from "../toolSetupSelectField";

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

  return (
    <Grid container spacing={2}>
      <ToolSetupSelectField
        id={`cmd-group-${index}`}
        label="Command group"
        values={commandGroupNames}
        currValue={state.groupName}
        fieldValue={12}
        onCurrValueUpdate={(ev) => onParentUpdate(ev, index, "groupName")}
      />
      <ToolSetupSelectField
        id={`cmd-name-${index}`}
        label="Command name"
        values={currGroup.commands.map((cmd) => cmd.name)}
        currValue={state.name}
        fieldValue={6}
        onCurrValueUpdate={(ev) => onParentUpdate(ev, index, "name")}
        stateDependency={state.groupName}
      />
      <ToolSetupSelectField
        id={`cmd-value-${index}`}
        label="Command value"
        values={ 
          [] // TODO
        }
        currValue={state.value}
        fieldValue={6}
        onCurrValueUpdate={(ev) => onParentUpdate(ev, index, "value")}
        stateDependency={state.name}
      />
    </Grid>
  );
}
