import * as React from "react";
import { memo } from "react";
import SettingsAccordion from "./settingsAccordion";
import { Stack } from "@mui/material";
import TextFieldMultiInput from "./textFieldMultiInput";
import TextFieldWithTooltip from "../common/textFieldWithTooltip";
import CommandsProvider, {
  CommandsContext,
} from "../../context/commandsProvider";

function Command({ command = {}, index = 0 }) {
  return (
    <SettingsAccordion>
      <CommandsContext.Consumer>
        {({ onNameUpdate, onDescriptionUpdate, onCollectionUpdate }) => (
          <Stack sx={{ m: 2 }}>
            <TextFieldWithTooltip
              id="commandName"
              name="commandName"
              label="Name"
              defaultValue={command.name}
              onChange={(event) => onNameUpdate(index, event)}
              tooltip={"The name of the command"}
            />
            <TextFieldWithTooltip
              id="commandDescription"
              name="commandDescription"
              label="Description"
              defaultValue={command.description}
              onChange={(event) => onDescriptionUpdate(index, event)}
              tooltip={
                "The description of the command. What does the command do?"
              }
            />
            <TextFieldMultiInput
              name="invocation"
              label="Invocation"
              data={command.invocation}
              onParentUpdate={(collection) =>
                onCollectionUpdate(index, "invocation", collection)
              }
              tooltip={"The invocation of the command"}
            />
            <TextFieldMultiInput
              name="allowedValues"
              label="Values"
              data={command.allowedValues}
              onParentUpdate={(collection) =>
                onCollectionUpdate(index, "allowedValues", collection)
              }
              tooltip={"The allowed values which can proceed the command"}
            />
            <TextFieldMultiInput
              name="allowedCommands"
              label="Allowed sub-commands"
              data={command.allowedCommands}
              onParentUpdate={(collection) =>
                onCollectionUpdate(index, "allowedCommands", collection)
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
                onCollectionUpdate(index, "allowedCommandSets", collection)
              }
              tooltip={
                "The allowed commands groups that can be invoked after this command"
              }
            />
          </Stack>
        )}
      </CommandsContext.Consumer>
    </SettingsAccordion>
  );
}

export default memo(Command);
