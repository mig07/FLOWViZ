import * as React from "react";
import SettingsAccordion from "./settingsAccordion";
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

function CommandGroup(props) {
  const index = props.index;
  const group = props.data;
  const onGroupsUpdate = props.onParentUpdate;

  const [count, setCount] = React.useState(1)

  const freshCommand = (index) => {
    return {
      name: `Command ${index}`,
      invocation: [],
      values: [],
      subCommands: [],
      subCommandSets: [],
    };
  };

  const onCommandsCountUpdate = (event) => {
    const value = Number(event.target.value);
    if (value < 1) return;

    let commands = group.commands;
    if (value < commands.length) {
      commands.pop();
    } else {
      commands.push(freshCommand(commands.length));
    }

    setCount(value)
    onGroupsUpdate(index, group => group.commands = commands)
  };

  const onNameUpdate = (event) => {
    const value = event.target.value;
    let g = group
    g.name = value
    onGroupsUpdate(index, g)
  };

  const onOrderUpdate = (event) => {
    const value = Number(event.target.value);
    let g = group
    g.order = value
    onGroupsUpdate(index, g)
  };

  return (
    <SettingsAccordion>
      <Stack sx={{ p: 2 }} spacing={2}>
        <TextField
          margin="normal"
          id="groupName"
          name="groupName"
          label="Name"
          defaultValue={group.name}
          onChange={onNameUpdate}
        />
        <TextFieldMultiInput 
          name="invocation"
          label="Invocation"
          data={group.invocation}
          onParentUpdate={(collection) => {
            let g = group
            g.invocation = collection
            onGroupsUpdate(index, g)
          }} />
        <TextField
          margin="normal"
          id="order"
          name="order"
          label="order"
          InputProps={{ inputProps: { min: 1 } }}
          defaultValue={index}
          onChange={onOrderUpdate}
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
            defaultValue={count}
            onChange={onCommandsCountUpdate}
          />
        </Box>
        <Typography variant="h6">Commands</Typography>
        <Divider />
        <Container sx={{ mt: 2 }}>
          {group.commands.map((command, index) => (
            <Command key={`command-${index}`} data={command} index={index} />
          ))}
        </Container>
      </Stack>
    </SettingsAccordion>
  );
}

export default CommandGroup;
