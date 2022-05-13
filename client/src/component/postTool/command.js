import * as React from "react";
import { useState } from "react";
import SettingsAccordion from "./settingsAccordion";
import { Stack, TextField } from "@mui/material";
import TextFieldMultiInput from "./textFieldMultiInput";

export default function Command(props) {

  const [command, setCommand] = useState({
    name: "Command 0",
    invocation: [],
    values: [],
    subCommands: [],
    subCommandSets: [],
  });

  const onNameUpdate = (event) => {
    const name = event.target.value;
    setCommand({ name: name });
  };

  return (
    <SettingsAccordion>
      <Stack sx={{ m: 2 }}>
        <TextField
          margin="normal"
          id="commandName"
          name="commandName"
          label="Name"
          defaultValue={command.name}
          onChange={onNameUpdate}
        />
        <TextFieldMultiInput name="invocation" label="Invocation" />
        <TextFieldMultiInput name="allowedValues" label="Values" />
        <TextFieldMultiInput
          name="allowedCommands"
          label="Allowed sub-commands"
        />
        <TextFieldMultiInput
          name="allowedCommandSets"
          label="Allowed sub-command sets"
        />
      </Stack>
    </SettingsAccordion>
  );
}
