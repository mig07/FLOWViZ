import * as React from "react";
import SettingsAccordion from "./settingsAccordion";
import { Stack, TextField } from "@mui/material";
import TextFieldMultiInput from "./textFieldMultiInput";

function Command(props) {
  
  const command = props.data
  const index = props.index
  const onGroupCommandsUpdate = props.onParentUpdate

  return (
    <SettingsAccordion>
      <Stack sx={{ m: 2 }}>
        <TextField
          margin="normal"
          id="commandName"
          name="commandName"
          label="Name"
          defaultValue={command.name}
          onChange={(event) => {
            let c = command
            c.name = event.target.value
            onGroupCommandsUpdate(index, c)
          }}
        />
        <TextFieldMultiInput
          name="invocation"
          label="Invocation"
          data={command.invocation}
          onParentUpdate={(collection) => {
            let c = command
            c.invocation = collection
            onGroupCommandsUpdate(index, c)
          }}
        />
        <TextFieldMultiInput
          name="allowedValues"
          label="Values"
          data={command.values}
          onParentUpdate={(collection) => {
            let c = command
            c.values = collection
            onGroupCommandsUpdate(index, c)
          }}
        />
        <TextFieldMultiInput
          name="allowedCommands"
          label="Allowed sub-commands"
          data={command.subCommands}
          onParentUpdate={(collection) => {
            let c = command
            c.values = collection
            onGroupCommandsUpdate(index, c)
          }}
        />
        <TextFieldMultiInput
          name="allowedCommandSets"
          label="Allowed sub-command sets"
          data={command.subCommandSets}
          onParentUpdate={(collection) => {
            let c = command
            c.values = collection
            onGroupCommandsUpdate(index, c)
          }}
        />
      </Stack>
    </SettingsAccordion>
  );
}

export default Command;
