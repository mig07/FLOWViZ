import {
  Container,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import * as React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Checkbox from "@mui/material/Checkbox";

import { validateInputs } from "./util";

export default function Access({
  url,
  apiKey,
  address,
  port,
  isContainer,
  dockerDaemon,
  dockerImage,
  dockerContainer,
  dockerVolumes,
  configMethod,
  onLibraryAccessUpdate = () => {},
  onApiAccessUpdate = () => {},
  setCanAdvance = () => {},
  onMethodChoice = () => {},
}) {
  const requiredFields = configMethod === "api" ? [url, apiKey] : [address];

  React.useEffect(() => {
    validateInputs(requiredFields, setCanAdvance);
  }, requiredFields);

  const MethodChoice = () => {
    return (
      <>
        <FormControl>
          <FormLabel id="config-method-label">
            Choose your configuration method
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="config-method-buttons-group-label"
            defaultValue="api"
            value={configMethod}
            name="radio-buttons-group"
          >
            <FormControlLabel
              value="api"
              control={<Radio />}
              label="API"
              onChange={() => onMethodChoice("api")}
            />
            <FormControlLabel
              value="library"
              control={<Radio />}
              label="Library"
              onChange={() => onMethodChoice("library")}
            />
          </RadioGroup>
        </FormControl>
        <Toolbar />
      </>
    );
  };

  const DockerForm = () => {
    return (
      <>
        <TextField
          required
          margin="normal"
          id="image"
          label="Docker image"
          name="image"
          autoComplete="image"
          value={dockerImage}
          onChange={(event) =>
            onLibraryAccessUpdate((prevState) => ({
              ...prevState,
              dockerImage: event.target.value,
            }))
          }
        />
        <TextField
          margin="normal"
          id="container"
          label="Docker container"
          name="container"
          autoComplete="container"
          value={dockerContainer}
          onChange={(event) =>
            onLibraryAccessUpdate((prevState) => ({
              ...prevState,
              dockerContainer: event.target.value,
            }))
          }
        />
        <TextField
          margin="normal"
          id="volumes"
          label="Volumes"
          name="volumes"
          autoComplete="volumes"
          value={dockerContainer}
          onChange={(event) =>
            onLibraryAccessUpdate((prevState) => ({
              ...prevState,
              dockerContainer: event.target.value,
            }))
          }
        />
      </>
    );
  };

  const LibraryAccessForm = () => {
    return (
      <>
        <TextField
          margin="normal"
          required
          id="address"
          label="Tool address"
          name="address"
          autoComplete="address"
          value={address}
          onChange={(event) =>
            onLibraryAccessUpdate((prevState) => ({
              ...prevState,
              address: event.target.value,
            }))
          }
        />
        <TextField
          margin="normal"
          id="port"
          label="Tool port"
          name="port"
          autoComplete="port"
          defaultValue={port}
          value={port}
          onChange={(event) =>
            onLibraryAccessUpdate((prevState) => ({
              ...prevState,
              port: event.target.value,
            }))
          }
        />
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                value={isContainer}
                onChange={(event) =>
                  onLibraryAccessUpdate((prevState) => ({
                    ...prevState,
                    isContainer: event.target.checked,
                  }))
                }
              />
            }
            label="Container"
          />
        </FormGroup>
        {isContainer ? DockerForm() : <></>}
      </>
    );
  };

  const ApiAccessForm = () => {
    return (
      <>
        <TextField
          margin="normal"
          required
          id="url"
          label="URL"
          name="url"
          autoComplete="url"
          value={url}
          onChange={(event) =>
            onApiAccessUpdate((prevState) => ({
              ...prevState,
              url: event.target.value,
            }))
          }
        />
        <TextField
          margin="normal"
          id="key"
          label="API key"
          name="key"
          autoComplete="api key"
          value={apiKey}
          onChange={(event) =>
            onApiAccessUpdate((prevState) => ({
              ...prevState,
              apiKey: event.target.value,
            }))
          }
        />
      </>
    );
  };

  const AccessForm = () => {
    switch (configMethod) {
      case "api":
        return ApiAccessForm();
      case "library":
        return LibraryAccessForm(
          address,
          port,
          isContainer,
          onLibraryAccessUpdate
        );

      default:
        return <></>;
    }
  };

  return (
    <Container sx={{ p: 2 }}>
      <Stack sx={{ p: 2 }}>
        <MethodChoice />
        <Typography variant="h5">Access</Typography>
        {AccessForm()}
      </Stack>
    </Container>
  );
}
