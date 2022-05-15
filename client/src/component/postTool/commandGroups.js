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

  const [groups, setGroups] = useState([
    {
      name: "Command Set 0",
      invocation: [],
      order: 0,
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
  ]);

  const onCommandGroupsCountUpdate = (event) => {
    const value = Number(event.target.value);
    if (value < 1) return;

    const groupsLen = groups.length

    let gs = groups;
    if (value < groupsLen) {
      gs.pop();
    } else {
      gs.push(freshCommandGroup(groupsLen));
    }

    setGroups(gs);
    onCommandGroupsUpdate(gs)
  }

  const onCommandGroupUpdate = (index, group) => {
    let gs = groups;
    gs[index] = group;
    setGroups(gs);
    onCommandGroupsUpdate(gs)
  }

  console.log(groups);

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
              defaultValue={groups.length}
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

export default React.memo(CommandGroups);
