import { Stack } from "@mui/material";
import * as React from "react";
import { memo } from "react";
import { LibraryRulesContext } from "../../context/libraryRulesProvider";
import TextFieldWithTooltip from "../common/textFieldWithTooltip";
import SettingsAccordion from "./settingsAccordion";
import TextFieldMultiInput from "./textFieldMultiInput";

function Command({ command = {}, groupIndex = 0, index = 0 }) {
  return (
    <SettingsAccordion>
      <LibraryRulesContext.Consumer>
        {({ onCommandPropUpdate, onCommandCollectionUpdate }) => (
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
              tooltip={
                "The description of the command. What does the command do?"
              }
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
        )}
      </LibraryRulesContext.Consumer>
    </SettingsAccordion>
  );
}

export default memo(Command);
