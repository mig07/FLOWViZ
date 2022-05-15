import * as React from "react";
import { useState, useCallback } from "react";
import SettingsAccordion from "./settingsAccordion";
import { Stack, TextField } from "@mui/material";
import TextFieldMultiInput from "./textFieldMultiInput";

function Command(props) {
  const [name, setName] = useState("");
  const [invocation, setInvocation] = useState([]);
  const [values, setValues] = useState([]);
  const [subCommands, setSubCommands] = useState([]);
  const [subCommandSets, setSubCommandSets] = useState([]);

  const onNameUpdate = useCallback((event) => {
    const name = event.target.value;
    setName(name);
  },[name]);

  console.log(name)
  console.log(invocation)
  console.log(values)
  console.log(subCommands)
  console.log(subCommandSets)

  return (
    <SettingsAccordion>
      <Stack sx={{ m: 2 }}>
        <TextField
          margin="normal"
          id="commandName"
          name="commandName"
          label="Name"
          defaultValue={name}
          onChange={(event) => onNameUpdate(event)}
        />
        <TextFieldMultiInput
          name="invocation"
          label="Invocation"
          onParentUpdate={(collection) => setInvocation(collection)}
        />
        <TextFieldMultiInput
          name="allowedValues"
          label="Values"
          onParentUpdate={(collection) => setValues(collection)}
        />
        <TextFieldMultiInput
          name="allowedCommands"
          label="Allowed sub-commands"
          onParentUpdate={(collection) => setSubCommands(collection)}
        />
        <TextFieldMultiInput
          name="allowedCommandSets"
          label="Allowed sub-command sets"
          onParentUpdate={(collection) => setSubCommandSets(collection)}
        />
      </Stack>
    </SettingsAccordion>
  );
}

export default React.memo(Command);
