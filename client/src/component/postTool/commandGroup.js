import * as React from "react";
import SettingsAccordion from "./settingsAccordion";
import { useState, useCallback } from "react";
import {
  Stack,
  TextField,
  Box,
  Typography,
  Divider,
  Container,
} from "@mui/material";
import Switch from "@mui/material/Switch";
import TextFieldMultiInput from "./textFieldMultiInput";
import { FormControlLabel } from "@mui/material";
import Command from "./command";

export default function CommandGroup(props) {
  const index = props.index;
  const onCommandGroupUpdate = props.onCommandGroupUpdate;

  const freshCommand = (index) => {
    return {
      name: `Command ${index}`,
      invocation: [],
      values: [],
      subCommands: [],
      subCommandSets: [],
    };
  };

  const [commandGroup, setCommandGroup] = useState({
    name: "Command Set 0",
    invocation: [],
    order: 0,
    count: 1,
    commands: [
      {
        name: "Command 0",
        invocation: [],
        values: [],
        subCommands: [],
        subCommandSets: [],
      },
    ],
  });

  const onCommandsCountUpdate = (event) => {
    const value = Number(event.target.value);
    if (value < 1) return;

    let commands = commandGroup.commands;
    if (value < commandGroup.count) {
      commands.pop();
    } else {
      commands.push(freshCommand(commandGroup.count));
    }

    setCommandGroup({ count: value, commands: commands });
    //onCommandGroupUpdate(commandGroup);
  };

  const onNameUpdate = useCallback((event) => {
    const value = event.target.value;
    setCommandGroup({ name: value });
  });

  return (
    <SettingsAccordion>
      <Stack sx={{ p: 2 }} spacing={2}>
        <TextField
          margin="normal"
          id="groupName"
          name="groupName"
          label="Name"
          defaultValue={commandGroup.name}
          onChange={onNameUpdate}
        />
        <TextFieldMultiInput name="invocation" label="Invocation" />
        <TextField
          margin="normal"
          id="order"
          name="order"
          label="order"
          defaultValue={index}
        />
        <FormControlLabel
          control={
            <Switch
              onChange={(event) => {
                // TODO
              }}
            />
          }
          label="Allow command repetition"
        />
        <Box display="flex" alignItems="center" justifyContent="center">
          <Typography variant="h6" sx={{ mr: 2 }}>
            Number of commands
          </Typography>
          <TextField
            margin="normal"
            type="number"
            InputProps={{ inputProps: { min: 1 } }}
            defaultValue={commandGroup.count}
            onChange={onCommandsCountUpdate}
          />
        </Box>
        <Typography variant="h6">Commands</Typography>
        <Divider />
        <Container sx={{ mt: 2 }}>
          {commandGroup.commands.map((command, index) => (
            <Command key={`command-${index}`} data={command} index={index} />
          ))}
        </Container>
      </Stack>
    </SettingsAccordion>
  );
}
