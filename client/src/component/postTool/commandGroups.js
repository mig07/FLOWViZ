import * as React from "react";
import { Stack, Typography, TextField, Divider, Box } from "@mui/material";
import SettingsAccordion from "./settingsAccordion";
import { Container } from "@mui/material";
import CommandGroup from "./commandGroup";

function CommandGroups(props) {
  const onLibraryUpdate = props.onParentUpdate;
  const library = props.data;
  const groups = library.groups;

  const [count, setCount] = React.useState(1)

  const freshCommandGroup = (index) => {
    return {
      name: `Command Set ${index}`,
      invocation: [],
      order: index,
      commands: [
        {
          name: "Command 0",
          invocation: [],
          values: [],
          subCommands: [],
          subCommandSets: [],
        },
      ],
    };
  };

  const onCommandGroupsCountUpdate = (event) => {
    const value = Number(event.target.value);
    if (value < 1) return;

    let gs = groups;
    if (value < gs.length) {
      gs.pop();
    } else {
      gs.push(freshCommandGroup(gs.length));
    }

    setCount(value)
    onLibraryUpdate({groups: gs})
  }

  const onCommandGroupUpdate = (index, group) => {
    let gs = groups;
    gs[index] = group;
    onLibraryUpdate({groups: gs})
  }

  return (
    <SettingsAccordion name="Command Groups">
      <Container sx={{ w: "100%", m: 2 }}>
        <Stack spacing={2}>
          <Box display="flex" alignItems="center" justifyContent="center">
            <Typography variant="h6" sx={{ mr: 2 }}>
              Number of commands groups
            </Typography>
            <TextField
              margin="normal"
              type="number"
              InputProps={{ inputProps: { min: 1 } }}
              defaultValue={count}
              onChange={onCommandGroupsCountUpdate}
            />
          </Box>
          <Typography variant="h6">Groups</Typography>
          <Divider />
          <Container sx={{ mt: 2 }}>
            {groups.map((group, index) => (
              <CommandGroup
                key={`commandGroup-${index}`}
                onCommandGroupUpdate={onCommandGroupUpdate}
                data={group}
                index={index}
              />
            ))}
          </Container>
        </Stack>
      </Container>
    </SettingsAccordion>
  );
}

export default CommandGroups;
