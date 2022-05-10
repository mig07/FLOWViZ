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
          onButtonClick={() => {}}
        />
        <TextFieldMultiInput
          name="allowedValues"
          label="Values"
          onButtonClick={() => {}}
        />
        <TextFieldMultiInput
          name="allowedCommands"
          label="Allowed sub-commands"
          onButtonClick={() => {}}
        />
        <TextFieldMultiInput
          name="allowedCommandSets"
          label="Allowed sub-command sets"
          onButtonClick={() => {}}
        />
      </Stack>
    </SettingsAccordion>
  );
}
