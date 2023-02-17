import {
  Box,
  Container,
  Divider,
  FormControlLabel,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import Switch from "@mui/material/Switch";
import * as React from "react";
import { useState, memo } from "react";
import TextFieldWithTooltip from "../common/textFieldWithTooltip";
import SettingsAccordion from "./settingsAccordion";
import TextFieldMultiInput from "./textFieldMultiInput";
import onArrayCountUpdate from "./util";
import Command from "./command";
import CommandGroupsProvider, {
  CommandGroupsContext,
} from "../../context/commandGroupsProvider";
import CommandsProvider, {
  CommandsContext,
} from "../../context/commandsProvider";

function CommandGroup({ index = 0, group = {} }) {
  return (
    <SettingsAccordion>
      <CommandGroupsContext.Consumer>
        {({
          onNameUpdate,
          onInvocationUpdate,
          onOrderUpdate,
          onAllowCommandRepUpdate,
        }) => (
          <Stack sx={{ p: 2 }} spacing={2}>
            <TextFieldWithTooltip
              id="groupName"
              label="Name"
              defaultValue={group.name}
              onChange={(event) => onNameUpdate(index, event)}
              tooltip={"The name of this command set"}
            />
            <TextFieldMultiInput
              name="invocation"
              label="Invocation"
              data={group.invocation}
              tooltip={"The invocation of the command group"}
              onParentUpdate={(event) => onInvocationUpdate(index, event)}
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
            <Tooltip
              title={
                "If the command can be invoked multiple times after the first invocation"
              }
            >
              <FormControlLabel
                control={
                  <Switch
                    checked={group["allowCommandRep"]}
                    onChange={(event) => onAllowCommandRepUpdate(index, event)}
                  />
                }
                label="Allow command repetition"
              />
            </Tooltip>
            <CommandsProvider>
              <CommandsContext.Consumer>
                {({ commands, onCommandsCountUpdate }) => (
                  <>
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Typography variant="h6" sx={{ mr: 2 }}>
                        Number of commands
                      </Typography>
                      <TextField
                        margin="normal"
                        type="number"
                        InputProps={{ inputProps: { min: 1, max: 20 } }}
                        defaultValue={commands.length}
                        onChange={onCommandsCountUpdate}
                      />
                    </Box>
                    <Typography variant="h6">Commands</Typography>
                    <Divider />
                    <Container sx={{ mt: 2 }}>
                      {commands.map((command, index) => (
                        <Command
                          key={`command-${index}`}
                          command={command}
                          index={index}
                        />
                      ))}
                    </Container>
                  </>
                )}
              </CommandsContext.Consumer>
            </CommandsProvider>
          </Stack>
        )}
      </CommandGroupsContext.Consumer>
    </SettingsAccordion>
  );
}

export default memo(CommandGroup);
