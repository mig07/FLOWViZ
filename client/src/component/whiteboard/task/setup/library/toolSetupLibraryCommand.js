import CloseIcon from "@mui/icons-material/Close";
import { Container, Grid, IconButton } from "@mui/material";
import * as React from "react";
import ToolSetupSelectField from "../toolSetupSelectField";
import {
  FormControl,
  Select,
  MenuItem,
  ListSubheader,
} from "@material-ui/core";

const reservedValues = ["file", "str"];

export default function ToolSetupLibraryCommand({
  index,
  commandGroups,
  state,
  onParentUpdate,
  onRemove,
  relayedOutputs,
  inputs,
  outputs,
}) {
  const commandGroupNames = commandGroups.map((cmdGroup) => cmdGroup.name);

  const currGroup = commandGroups.find(
    (cmdGroup) => cmdGroup.name === state.groupName
  );

  const cmdValues =
    state.name !== ""
      ? currGroup.commands.find((cmd) => cmd.name === state.name).allowedValues
      : [];

  const MenuListItem = (collection) => {
    return collection.map((elem) => {
      const key = elem.key;
      const value = elem.value;
      return (
        <MenuItem key={key} value={value}>
          {key}
        </MenuItem>
      );
    });
  };

  return (
    <Grid container direction="row" alignItems="center" justifyContent="center">
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
            onCurrValueUpdate={(ev) =>
              onParentUpdate(ev, index, "groupName", ["name", "value", "io"])
            }
          />
          <ToolSetupSelectField
            id={`cmd-name-${index}`}
            label="Command name"
            values={currGroup.commands.map((cmd) => cmd.name)}
            currValue={state.name}
            fieldWidth={6}
            onCurrValueUpdate={(ev) =>
              onParentUpdate(ev, index, "name", ["value", "io"])
            }
            stateDependency={state.groupName}
          />
          <ToolSetupSelectField
            id={`cmd-value-${index}`}
            label="Command value"
            values={cmdValues}
            currValue={state.value}
            fieldWidth={6}
            onCurrValueUpdate={(ev) =>
              onParentUpdate(ev, index, "value", ["io"])
            }
            stateDependency={state.name}
          />
          {reservedValues.includes(state.value) ? (
            <Grid item xs={12}>
              <FormControl fullWidth>
                <Select
                  id={`cmd-io-${index}`}
                  label={"Command I/O"}
                  value={state.io}
                  onChange={(ev) => onParentUpdate(ev, index, "io")}
                >
                  <ListSubheader>Inputs</ListSubheader>
                  {MenuListItem(inputs)}
                  {MenuListItem(relayedOutputs)}
                  <ListSubheader>Outputs</ListSubheader>
                  {MenuListItem(outputs)}
                </Select>
              </FormControl>
            </Grid>
          ) : (
            <></>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}
