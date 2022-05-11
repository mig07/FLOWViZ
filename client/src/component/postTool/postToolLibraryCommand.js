import * as React from "react";
import SettingsAccordion from "./settingsAccordion";
import { Stack, TextField } from "@mui/material";
import TextFieldMultiInput from "./textFieldMultiInput";

export default function PostToolLibraryCommand() {
  const [commandName, setCommandName] = React.useState("");


  const onChangeCommandName = (event) => {
    const name = event.target.value;
    setCommandName(name);
  };

  return (
    <SettingsAccordion>
      <Stack sx={{ m: 2 }}>
        <TextField
          margin="normal"
          id="commandName"
          name="commandName"
          label="Command name"
          onChange={onChangeCommandName}
        />
        <TextFieldMultiInput
          name="invocation"
          label="Invocation"
        />
        <TextFieldMultiInput
          name="allowedValues"
          label="Values"
        />
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
