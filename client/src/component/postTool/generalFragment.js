import { Container, Stack, TextField, Typography } from "@mui/material";
import * as React from "react";
import TextFieldWithTooltip from "../common/textFieldWithTooltip";
import { validateInputs } from "./util";

export default function General({
  onGeneralUpdate = () => {},
  setCanAdvance = () => {},
  general,
}) {
  const name = general.name;
  const description = general.description;

  const requiredFields = [name, description];

  React.useEffect(() => {
    validateInputs(requiredFields, setCanAdvance);
  }, requiredFields);

  return (
    <Container sx={{ p: 2 }}>
      <Stack sx={{ p: 2 }}>
        <Typography variant="h5">General</Typography>
        <TextFieldWithTooltip
          id="name"
          label="Tool name"
          name="name"
          value={name}
          onChange={(event) =>
            onGeneralUpdate((prevState) => ({
              ...prevState,
              name: event.target.value,
            }))
          }
          tooltip={"The tool's unique name."}
        />
        <TextFieldWithTooltip
          id="description"
          label="Tool description"
          name="description"
          value={description}
          onChange={(event) =>
            onGeneralUpdate((prevState) => ({
              ...prevState,
              description: event.target.value,
            }))
          }
          tooltip={"The tool's description. What does the tool do?"}
        />
      </Stack>
    </Container>
  );
}
