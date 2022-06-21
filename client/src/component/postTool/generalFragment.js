import { Container, Stack, TextField, Typography } from "@mui/material";
import * as React from "react";

export default function General({
  onGeneralUpdate = () => {},
  setCanAdvance = () => {},
  name,
  description,
}) {
  React.useEffect(() => {
    const requiredFields = [name, description];
    const hasAllRequiredFields = requiredFields.every((field) => field !== "");
    setCanAdvance(hasAllRequiredFields);
    if (hasAllRequiredFields) {
      onGeneralUpdate({ name: name, description: description });
    }
  }, [name, description]);

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
