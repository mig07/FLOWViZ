import * as React from "react";
import SettingsAccordion from "./settingsAccordion";
import { Stack, TextField } from "@mui/material";
import Switch from "@mui/material/Switch";
import TextFieldMultiInput from "./textFieldMultiInput";
import { FormControlLabel } from "@mui/material";
import Counter from "./counter";
import PostToolLibraryCommand from "./postToolLibraryCommand";

export default function PostToolLibraryCommandGroup() {

  const [numberOfCmds, setNumberOfCmds] = React.useState(1)

  const onValueChange = (event) => {
    const value = Number(event.target.value)
    if (value > 0) {
      setNumberOfCmds(() => value)
    }
  }

  console.log(numberOfCmds)

  return (
    <SettingsAccordion>
      <Stack sx={{ m: 2 }}>
        <TextField
          margin="normal"
          id="groupName"
          name="groupName"
          label="Group name"
        />
        <TextFieldMultiInput
          name="invocation"
          label="Invocation"
          onButtonClick={() => {}}
        />
        <TextField margin="normal" id="order" name="order" label="Order" />
        <FormControlLabel control={<Switch />} label="Allow command repetition" />
        <Counter
          label="Number of commands"
          id="cmds"
          minValue={1}
          defaultValue={numberOfCmds}
          onValueChange={onValueChange}
        />
        {Array(numberOfCmds).fill(
          <PostToolLibraryCommand />
        )}
      </Stack>
    </SettingsAccordion>
  );
}
