import { Container, Stack, TextField, Typography } from "@mui/material";
import * as React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import { validateInputs } from "./util";

export default function Access({
  onAccessUpdate = () => {},
  setCanAdvance = () => {},
  address,
  port,
  isContainer = true,
}) {
  const requiredFields = [address];
  React.useEffect(() => {
    validateInputs(requiredFields, setCanAdvance);
  }, requiredFields);

  return (
    <Container sx={{ p: 2 }}>
      <Stack sx={{ p: 2 }}>
        <Typography variant="h5">Access</Typography>
        <TextField
          margin="normal"
          required
          id="address"
          label="Tool address"
          name="address"
          autoComplete="address"
          value={address}
          onChange={(event) =>
            onAccessUpdate({
              address: event.target.value,
              port: port,
            })
          }
        />
        <TextField
          margin="normal"
          id="port"
          label="Tool port"
          name="port"
          autoComplete="port"
          value={port}
          onChange={(event) =>
            onAccessUpdate({
              address: address,
              port: event.target.value,
            })
          }
        />
        <FormGroup>
          <FormControlLabel
            control={<Checkbox value={isContainer} />}
            label="Container"
          />
        </FormGroup>
        {isContainer ? (
          <>
            <TextField
              required
              margin="normal"
              id="image"
              label="Docker image"
              name="image"
              autoComplete="image"
              value={""}
            />
            <TextField
              margin="normal"
              id="container"
              label="Docker container"
              name="container"
              autoComplete="container"
              value={""}
            />
            <TextField
              margin="normal"
              id="volumes"
              label="Volumes"
              name="volumes"
              autoComplete="volumes"
              value={""}
            />
          </>
        ) : (
          <></>
        )}
      </Stack>
    </Container>
  );
}
