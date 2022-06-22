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
import onArrayCountUpdate from "./util";

function CommandGroup({ index = 0, data = {}, onParentUpdate = () => {} }) {
  const group = data;
  const onCommandGroupUpdate = onParentUpdate;

  const [count, setCount] = React.useState(1);
  const [checked, setChecked] = React.useState(false);

  const generateCommand = (index) => {
    return {
      name: `Command ${index}`,
      invocation: [],
      values: [],
      subCommands: [],
      subCommandSets: [],
    };
  };

  const onCommandsCountUpdate = (event) => {
    onArrayCountUpdate(
      event,
      group.commands,
      count,
      onCommandGroupUpdate,
      setCount,
      generateCommand
    );
  };

  console.log(group);

  return (
    <SettingsAccordion>
      <Stack sx={{ p: 2 }} spacing={2}>
        <TextField
          margin="normal"
          id="groupName"
          name="groupName"
          label="Name"
          defaultValue={group.name}
          onChange={(event) => {
            const value = event.target.value;
            let g = group;
            g.name = value;
            onCommandGroupUpdate(index, g);
          }}
        />
        <TextFieldMultiInput
          name="invocation"
          label="Invocation"
          data={group.invocation}
          onParentUpdate={(collection) => {
            let g = group;
            g.invocation = collection;
            onCommandGroupUpdate(index, g);
          }}
        />
        <TextField
          margin="normal"
          id="order"
          name="order"
          label="order"
          InputProps={{ inputProps: { min: 1, max: 10 } }}
          defaultValue={index}
          onChange={(event) => {
            const value = Number(event.target.value);
            let g = group;
            g.order = value;
            onCommandGroupUpdate(index, g);
          }}
        />
        <FormControlLabel
          control={
            <Switch
              checked={checked}
              onChange={(event) => {
                const value = event.target.checked;
                setChecked(value);
                let g = group;
                g.allowCommandRep = value;
                onCommandGroupUpdate(index, g);
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
            InputProps={{ inputProps: { min: 1, max: 20 } }}
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
