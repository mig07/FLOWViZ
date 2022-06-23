import * as React from "react";
import { Stack, Typography, TextField, Divider, Box } from "@mui/material";
import { Container } from "@mui/material";
import CommandGroup from "./commandGroup";
import onArrayCountUpdate from "./util";

export default function CommandGroups({
  data = {},
  library,
  onLibraryUpdate = () => {},
  generateCommandGroup,
  commandCount,
  setCommandCount = () => {},
}) {
  const groups = data;

  const onCommandGroupsCountUpdate = (event) => {
    onArrayCountUpdate(
      event,
      library,
      commandCount,
      onLibraryUpdate,
      setCommandCount,
      generateCommandGroup
    );
  };

  const onCommandGroupUpdate = (index, group) => {
    let gs = { ...library };
    gs[index] = group;
    onLibraryUpdate(gs);
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
            value={commandCount}
            onChange={onCommandGroupsCountUpdate}
          />
        </Box>
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
  );
}
