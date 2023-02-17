import * as React from "react";
import { useState } from "react";
import { Stack, Typography, TextField, Divider, Box } from "@mui/material";
import { Container } from "@mui/material";
import CommandGroupsProvider, {
  CommandGroupsContext,
} from "../../context/commandGroupsProvider";
import CommandGroup from "./commandGroup";
import onArrayCountUpdate from "./util";

export default function CommandGroups({
  groups,
  commandGroupsSetter,
  commandsSetter,
  generateCommandGroup,
}) {
  return (
    <CommandGroupsContext.Consumer>
      {({ commandGroups, onCommandsCountUpdate }) => (
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
                onChange={onCommandsCountUpdate}
              />
            </Box>
            <Container sx={{ mt: 2 }}>
              {commandGroups.map((group, index) => (
                <CommandGroup
                  key={`commandGroup-${index}`}
                  index={index}
                  group={group}
                />
              ))}
            </Container>
          </Stack>
        </Container>
      )}
    </CommandGroupsContext.Consumer>
  );
}
