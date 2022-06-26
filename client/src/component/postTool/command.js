import * as React from "react";
import SettingsAccordion from "./settingsAccordion";
import { Stack, TextField } from "@mui/material";
import TextFieldMultiInput from "./textFieldMultiInput";

function Command({ data = {}, index = 0, onParentUpdate = () => {} }) {
  const command = data;
  const onGroupCommandsUpdate = onParentUpdate;

  const onPropUpdate = (event, prop) => {
    const value = event.target.value;
    let c = command;
    c[prop] = value;
    onGroupCommandsUpdate(index, c);
  };

  const onPropCollectionUpdate = (collection, prop) => {
    let c = { ...command };
    c[prop] = collection;
    onGroupCommandsUpdate(index, c);
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
          onChange={(event) => onPropUpdate(event, "name")}
        />
        <TextFieldMultiInput
          name="invocation"
          label="Invocation"
          data={command.invocation}
          onParentUpdate={(collection) =>
            onPropCollectionUpdate(collection, "invocation")
          }
        />
        <TextFieldMultiInput
          name="allowedValues"
          label="Values"
          data={command.values}
          onParentUpdate={(collection) =>
            onPropCollectionUpdate(collection, "values")
          }
        />
        <TextFieldMultiInput
          name="allowedCommands"
          label="Allowed sub-commands"
          data={command.subCommands}
          onParentUpdate={(collection) =>
            onPropCollectionUpdate(collection, "subCommands")
          }
        />
        <TextFieldMultiInput
          name="allowedCommandSets"
          label="Allowed sub-command sets"
          data={command.subCommandSets}
          onParentUpdate={(collection) =>
            onPropCollectionUpdate(collection, "subCommandSets")
          }
        />
      </Stack>
    </SettingsAccordion>
  );
}

export default Command;
