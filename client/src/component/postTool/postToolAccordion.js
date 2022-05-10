import * as React from "react";
import { Container } from "@mui/material";
import { Stack } from "@mui/material";
import { TextField } from "@mui/material";
import SettingsAccordion from "./settingsAccordion";

export default function PostToolAccordion(props) {
  return (
    <Container sx={{ p: 2 }}>
      <Stack spacing={2}>
        <SettingsAccordion id="General">
          <Stack sx={{ p: 2 }}>
            <TextField
              margin="normal"
              required
              id="name"
              label="Tool name"
              name="name"
              autoComplete="name"
            />
            <TextField
              margin="normal"
              required
              id="description"
              label="Tool description"
              name="description"
              autoComplete="description"
            />
          </Stack>
        </SettingsAccordion>

        <SettingsAccordion id="Access">
          <Container sx={{ p: 2 }}>
            <TextField
              margin="normal"
              required
              id="ip"
              label="Host IP"
              name="ip"
              autoComplete="ip"
            />
            <TextField
              margin="normal"
              id="port"
              label="Host port"
              name="port"
              autoComplete="port"
            />
          </Container>
        </SettingsAccordion>
        {props.children}
      </Stack>
    </Container>
  );
}
