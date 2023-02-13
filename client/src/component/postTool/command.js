import * as React from "react";
import { memo } from "react";
import SettingsAccordion from "./settingsAccordion";
import { Stack } from "@mui/material";
import TextFieldMultiInput from "./textFieldMultiInput";
import TextFieldWithTooltip from "../common/textFieldWithTooltip";

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
    let c = command;
    c[prop] = collection;
    onGroupCommandsUpdate(index, c);
  };

  return (
    <SettingsAccordion>
      <Stack sx={{ m: 2 }}>
        <TextFieldWithTooltip
          id="commandName"
          name="commandName"
          label="Name"
          defaultValue={command.name}
          onChange={(event) => onPropUpdate(event, "name")}
          tooltip={"The name of the command"}
        />
        <TextFieldWithTooltip
          id="commandDescription"
          name="commandDescription"
          label="Description"
          defaultValue={command.description}
          onChange={(event) => onPropUpdate(event, "description")}
          tooltip={"The description of the command. What does the command do?"}
        />
        <TextFieldMultiInput
          name="invocation"
          label="Invocation"
          data={command.invocation}
          onParentUpdate={(collection) =>
            onPropCollectionUpdate(collection, "invocation")
          }
          tooltip={"The invocation of the command"}
        />
        <TextFieldMultiInput
          name="allowedValues"
          label="Values"
          data={command.allowedValues}
          onParentUpdate={(collection) =>
            onPropCollectionUpdate(collection, "allowedValues")
          }
          tooltip={"The allowed values which can proceed the command"}
        />
        <TextFieldMultiInput
          name="allowedCommands"
          label="Allowed sub-commands"
          data={command.subCommands}
          onParentUpdate={(collection) =>
            onPropCollectionUpdate(collection, "subCommands")
          }
          tooltip={
            "The allowed commands that can be invoked after this command"
          }
        />
        <TextFieldMultiInput
          name="allowedCommandSets"
          label="Allowed sub-command sets"
          data={command.subCommandSets}
          onParentUpdate={(collection) =>
            onPropCollectionUpdate(collection, "subCommandSets")
          }
          tooltip={
            "The allowed commands groups that can be invoked after this command"
          }
        />
      </Stack>
    </SettingsAccordion>
  );
}

export default memo(Command);
