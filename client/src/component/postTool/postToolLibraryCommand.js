import * as React from "react";
import SettingsAccordion from "./settingsAccordion";
import { Stack, TextField } from "@mui/material";
import TextFieldMultiInput from "./textFieldMultiInput";

export default function PostToolLibraryCommand() {



  return (
    <SettingsAccordion>
      <Stack sx={{ m: 2 }}>
        <TextField
          margin="normal"
          id="commandName"
          name="commandName"
          label="Command name"
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
