import { Box, Container, Stack, TextField, Typography } from "@mui/material";
import * as React from "react";
import CommandGroup from "./commandGroup";

function CommandGroups({ props }) {
  const commandGroups = props.commandGroups;
  const onCommandGroupsCountUpdate = props.onCommandGroupsCountUpdate;

  const groupFunctions = {
    onNameUpdate: props.onNameUpdate,
    onInvocationUpdate: props.onInvocationUpdate,
    onOrderUpdate: props.onOrderUpdate,
    onAllowCommandRepUpdate: props.onAllowCommandRepUpdate,
    onCommandGroupsCountUpdate: props.onCommandGroupsCountUpdate,
    onCommandsCountUpdate: props.onCommandsCountUpdate,
    onCommandPropUpdate: props.onCommandPropUpdate,
    onCommandCollectionUpdate: props.onCommandCollectionUpdate,
  };

  return (
    <Container sx={{ w: "100%" }}>
      <Stack spacing={2}>
        <Box display="flex" alignItems="center" justifyContent="center">
          <Typography variant="h6" sx={{ mr: 2 }}>
            Number of commands groups
          </Typography>
          <TextField
            margin="normal"
            type="number"
            InputProps={{ inputProps: { min: 1, max: 10 } }}
            defaultValue={commandGroups.length}
            onChange={onCommandGroupsCountUpdate}
          />
        </Box>
        <Container sx={{ mt: 2 }}>
          {commandGroups.map((group, index) => (
            <CommandGroup
              key={`commandGroup-${index}`}
              index={index}
              group={group}
              groupFunctions={groupFunctions}
            />
          ))}
        </Container>
      </Stack>
    </Container>
  );
}

function arePropsEqual(oldProps, newProps) {
  return (
    oldProps.props.commandGroups.length === newProps.props.commandGroups.length
  );
}

export default React.memo(CommandGroups, arePropsEqual);
