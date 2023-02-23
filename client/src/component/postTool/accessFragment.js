import {
  Container,
  Grid,
  IconButton,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import * as React from "react";
import { useState } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Checkbox from "@mui/material/Checkbox";
import ChipContainer from "../common/chipContainer";
import AddIcon from "@mui/icons-material/Add";
import CenteredContainer from "../common/centeredContainer";
import TextFieldWithTooltip from "../common/textFieldWithTooltip";

import { validateInputs } from "./util";

export default function Access({
  apiAccess,
  libraryAccess,
  configMethod,
  onLibraryAccessUpdate = () => {},
  onApiAccessUpdate = () => {},
  setCanAdvance = () => {},
  onMethodChoice = () => {},
}) {
  const url = apiAccess.url;
  const apiKey = apiAccess.apiKey;
  const address = libraryAccess.address;
  const port = libraryAccess.port;
  const isContainer = libraryAccess.isContainer;
  const dockerDaemon = libraryAccess.dockerDaemon;
  const dockerImage = libraryAccess.dockerImage;
  const dockerContainer = libraryAccess.dockerContainer;
  const dockerVolumes = libraryAccess.dockerVolumes;

  // const requiredFields = configMethod === "api" ? [url, apiKey] : [address];
  const requiredFields = [dockerDaemon, dockerImage];

  const [volumeSource, setVolumeSource] = useState("");
  const [volumeTarget, setVolumeTarget] = useState("");

  React.useEffect(() => {
    validateInputs(requiredFields, setCanAdvance);
  }, requiredFields);

  const MethodChoice = () => {
    return (
      <CenteredContainer>
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
      </CenteredContainer>
    );
  };

  const DockerForm = () => {
    return (
      <>
        <TextFieldWithTooltip
          id="dockerUrl"
          label="Docker URL"
          name="docker url"
          value={dockerDaemon}
          onChange={(event) =>
            onLibraryAccessUpdate((prevState) => ({
              ...prevState,
              dockerDaemon: event.target.value,
            }))
          }
          tooltip={"The Docker daemon's URL where the container is hosted."}
        />
        <TextFieldWithTooltip
          id="image"
          label="Docker image"
          name="image"
          value={dockerImage}
          onChange={(event) =>
            onLibraryAccessUpdate((prevState) => ({
              ...prevState,
              dockerImage: event.target.value,
            }))
          }
          tooltip={"The Docker image of the container that hosts the tool."}
        />
        <TextFieldWithTooltip
          id="container"
          label="Docker container"
          name="container"
          value={dockerContainer}
          onChange={(event) =>
            onLibraryAccessUpdate((prevState) => ({
              ...prevState,
              dockerContainer: event.target.value,
            }))
          }
          tooltip={"The Docker container that hosts the tool."}
        />
        <CenteredContainer>
          <TextFieldWithTooltip
            id="volume source"
            label="Volume source"
            name="volume source"
            value={volumeSource}
            onChange={(e) => setVolumeSource(e.target.value)}
            tooltip={
              "The Docker's volume source: the directory of the file system in which the Docker's daemon is executed."
            }
          />
          <TextFieldWithTooltip
            id="volume target"
            label="Volume target"
            name="volume target"
            value={volumeTarget}
            onChange={(e) => setVolumeTarget(e.target.value)}
            tooltip={
              "The Docker's volume destination: the directory inside the container's file system."
            }
          />
          <IconButton>
            <AddIcon
              onClick={() =>
                onLibraryAccessUpdate((prevState) => {
                  const prevDockerVolumes = [...prevState.dockerVolumes];

                  const hasChip = prevDockerVolumes.find(
                    (elem) => elem.source === volumeSource
                  );

                  if (!hasChip) {
                    prevDockerVolumes.push({
                      source: volumeSource,
                      target: volumeTarget,
                    });
                  }

                  return {
                    ...prevState,
                    dockerVolumes: prevDockerVolumes,
                  };
                })
              }
            />
          </IconButton>
        </CenteredContainer>
        <CenteredContainer>
          <ChipContainer
            chips={dockerVolumes.map((elem) => elem.source)}
            onRemoveChip={(source) =>
              onLibraryAccessUpdate((prevState) => ({
                ...prevState,
                dockerVolumes: prevState.dockerVolumes.filter(
                  (elem) => elem.source !== source
                ),
              }))
            }
          />
        </CenteredContainer>
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
          inputProps={{ maxLength: 5 }}
          onChange={(event) => {
            const p = event.target.value;
            if (typeof p != "string") return;
            if (!isNaN(p) && !isNaN(parseFloat(p))) {
              return onLibraryAccessUpdate((prevState) => ({
                ...prevState,
                port: event.target.value,
              }));
            }
          }}
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
        {/* <MethodChoice /> */}
        <Typography variant="h5">Access</Typography>
        {/* {AccessForm()} */}
        {DockerForm()}
      </Stack>
    </Container>
  );
}
