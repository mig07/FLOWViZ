import { Stack } from "@mui/material";
import * as React from "react";
import { memo } from "react";
import TextFieldWithTooltip from "../common/textFieldWithTooltip";
import SettingsAccordion from "./settingsAccordion";
import TextFieldMultiInput from "./textFieldMultiInput";

function Command({
  command = {},
  commandFunctions = {},
  groupIndex = 0,
  index = 0,
}) {
  const onCommandPropUpdate = commandFunctions.onCommandPropUpdate;
  const onCommandCollectionUpdate = commandFunctions.onCommandCollectionUpdate;

  return (
    <SettingsAccordion>
      <Stack sx={{ m: 2 }}>
        <TextFieldWithTooltip
          id="commandName"
          name="commandName"
          label="Name"
          defaultValue={command.name}
          onChange={(event) =>
            onCommandPropUpdate(groupIndex, index, "name", event)
          }
          tooltip={"The name of the command"}
        />
        <TextFieldWithTooltip
          id="commandDescription"
          name="commandDescription"
          label="Description"
          defaultValue={command.description}
          onChange={(event) =>
            onCommandPropUpdate(groupIndex, index, "description", event)
          }
          tooltip={"The description of the command. What does the command do?"}
        />
        <TextFieldMultiInput
          name="invocation"
          label="Invocation"
          data={command.invocation}
          onParentUpdate={(collection) =>
            onCommandCollectionUpdate(
              groupIndex,
              index,
              "invocation",
              collection
            )
          }
          tooltip={"The invocation of the command"}
        />
        <TextFieldMultiInput
          name="allowedValues"
          label="Values"
          data={command.allowedValues}
          onParentUpdate={(collection) =>
            onCommandCollectionUpdate(
              groupIndex,
              index,
              "allowedValues",
              collection
            )
          }
          tooltip={"The allowed values which can proceed the command"}
        />
        <TextFieldMultiInput
          name="allowedCommands"
          label="Allowed sub-commands"
          data={command.allowedCommands}
          onParentUpdate={(collection) =>
            onCommandCollectionUpdate(
              groupIndex,
              index,
              "allowedCommands",
              collection
            )
          }
          tooltip={
            "The allowed commands that can be invoked after this command"
          }
        />
        <TextFieldMultiInput
          name="allowedCommandSets"
          label="Allowed sub-command sets"
          data={command.allowedCommandSets}
          onParentUpdate={(collection) =>
            onCommandCollectionUpdate(
              groupIndex,
              index,
              "allowedCommandSets",
              collection
            )
          }
          tooltip={
            "The allowed commands groups that can be invoked after this command"
          }
        />
      </Stack>
    </SettingsAccordion>
  );
}

function arePropsEqual(oldProps, newProps) {
  return (
    oldProps.command.name === newProps.command.name &&
    oldProps.command.description === newProps.command.description &&
    oldProps.command.allowedValues.length ===
      newProps.command.allowedValues.length &&
    oldProps.command.allowedCommands.length ===
      newProps.command.allowedCommands.length &&
    oldProps.command.allowedCommandSets.length ===
      newProps.command.allowedCommandSets.length
  );
}

export default memo(Command, arePropsEqual);
