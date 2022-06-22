import { Container, Stack, TextField, Typography } from "@mui/material";
import * as React from "react";
import { validateInputs } from "./util";

export default function General({
  onGeneralUpdate = () => {},
  setCanAdvance = () => {},
  name,
  description,
}) {
  const requiredFields = [name, description];

  React.useEffect(() => {
    validateInputs(requiredFields, setCanAdvance, onGeneralUpdate, {
      name: name,
      description: description,
    });
  }, requiredFields);

  return (
    <Container sx={{ p: 2 }}>
      <Stack sx={{ p: 2 }}>
        <Typography variant="h5">General</Typography>
        <TextField
          margin="normal"
          required
          id="name"
          label="Tool name"
          name="name"
          autoComplete="name"
          defaultValue={name}
          value={name}
          onChange={(event) =>
            onGeneralUpdate({
              name: event.target.value,
              description: description,
            })
          }
        />
        <TextField
          margin="normal"
          required
          id="description"
          label="Tool description"
          name="description"
          autoComplete="description"
          defaultValue={description}
          value={description}
          onChange={(event) =>
            onGeneralUpdate({
              name: name,
              description: event.target.value,
            })
          }
        />
      </Stack>
    </Container>
  );
}
