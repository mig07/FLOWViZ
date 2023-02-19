import {
  Box,
  Container,
  Divider,
  FormControlLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Switch from "@mui/material/Switch";
import * as React from "react";
import { memo } from "react";
import { LibraryRulesContext } from "../../context/libraryRulesProvider";
import TextFieldWithTooltip from "../common/textFieldWithTooltip";
import Command from "./command";
import SettingsAccordion from "./settingsAccordion";
import TextFieldMultiInput from "./textFieldMultiInput";

function CommandGroup({ index = 0, group = {}, groupFunctions = {} }) {
  const onNameUpdate = groupFunctions.onNameUpdate;
  const onInvocationUpdate = groupFunctions.onInvocationUpdate;
  const onOrderUpdate = groupFunctions.onOrderUpdate;
  const onAllowCommandRepUpdate = groupFunctions.onAllowCommandRepUpdate;
  const onCommandsCountUpdate = groupFunctions.onCommandsCountUpdate;

  const commandFunctions = {
    onCommandPropUpdate: groupFunctions.onCommandPropUpdate,
    onCommandCollectionUpdate: groupFunctions.onCommandCollectionUpdate,
  };

  return (
    <SettingsAccordion>
      <Stack sx={{ p: 2 }} spacing={2}>
        <LibraryRulesContext.Consumer>
          {({ commandGroups }) => {
            return (
              <>
                <TextFieldWithTooltip
                  id="groupName"
                  label="Name"
                  defaultValue={commandGroups[index].name}
                  onChange={(event) => onNameUpdate(index, event)}
                  tooltip={"The name of this command set"}
                />
                <TextFieldMultiInput
                  name="invocation"
                  label="Invocation"
                  data={commandGroups[index].invocation}
                  tooltip={"The invocation of the command group"}
                  onParentUpdate={(col) => onInvocationUpdate(index, col)}
                />
                <TextFieldWithTooltip
                  id="order"
                  label="order"
                  InputProps={{ inputProps: { min: 1, max: 10 } }}
                  defaultValue={index}
                  onChange={(event) => onOrderUpdate(index, event)}
                  tooltip={
                    "The order of this command group inside the command tree"
                  }
                />
                <FormControlLabel
                  checked={commandGroups[index].allowCommandRep}
                  control={<Switch />}
                  onChange={(event) => onAllowCommandRepUpdate(index, event)}
                  label="Allow command repetition"
                />
                <Box display="flex" alignItems="center" justifyContent="center">
                  <Typography variant="h6" sx={{ mr: 2 }}>
                    Number of commands
                  </Typography>
                  <TextField
                    margin="normal"
                    type="number"
                    InputProps={{ inputProps: { min: 1, max: 20 } }}
                    defaultValue={commandGroups[index].commands.length}
                    onChange={(event) => onCommandsCountUpdate(event, index)}
                  />
                </Box>
                <Typography variant="h6">Commands</Typography>
                <Divider />
                <Container sx={{ mt: 2 }}>
                  {commandGroups[index].commands.map((command, _index) => (
                    <Command
                      key={`command-${_index}`}
                      command={command}
                      index={_index}
                      groupIndex={index}
                      commandFunctions={commandFunctions}
                    />
                  ))}
                </Container>
              </>
            );
          }}
        </LibraryRulesContext.Consumer>
      </Stack>
    </SettingsAccordion>
  );
}

function arePropsEqual(oldProps, newProps) {
  return (
    oldProps.group.name === newProps.group.name &&
    oldProps.group.invocation.length === newProps.group.invocation.length &&
    oldProps.group.order === newProps.group.order &&
    oldProps.group.allowCommandRep === newProps.group.allowCommandRep
  );
}

export default memo(CommandGroup, arePropsEqual);
