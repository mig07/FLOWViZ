import * as React from "react";
import { useState, useCallback } from "react";
import { Stack, Typography, TextField, Divider, Box } from "@mui/material";
import SettingsAccordion from "./settingsAccordion";
import { Container } from "@mui/material";
import CommandGroup from "./commandGroup";
import { ToolContext } from "../../page/postTool";

function CommandGroups(props) {
  const onCommandGroupsUpdate = props.onCommandGroupsUpdate;

  const freshCommandGroup = (index) => {
    return {
      name: `Command Set ${index}`,
      invocation: [],
      order: index,
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
    };
  };

  const [commandGroups, setCommandGroups] = useState({
    count: 1,
    groups: [
      {
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
      },
    ],
  });



  const onCommandGroupsCountUpdate = useCallback((event) => {
    const value = Number(event.target.value);
    if (value < 1) return;

    let groups = commandGroups.groups;
    if (value < commandGroups.count) {
      groups.pop()
    } else {
      groups.push(freshCommandGroup(commandGroups.count))
    }

    setCommandGroups({ count: value, groups: groups });
    onCommandGroupsUpdate(commandGroups);
  });

  const onCommandGroupUpdate = useCallback((index, group) => {
    let groups = commandGroups.groups;
    groups[index] = group;
    onCommandGroupsUpdate({ groups: groups });
  });

  console.log(commandGroups.groups);

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
              defaultValue={commandGroups.count}
              onChange={onCommandGroupsCountUpdate}
            />
          </Box>
          <Typography variant="h6">Groups</Typography>
          <Divider />
          <Container sx={{ mt: 2 }}>
            {commandGroups.groups.map((group, index) => (
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
