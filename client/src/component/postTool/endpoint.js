import React from "react";
import { Stack } from "@mui/material";
import TextFieldWithTooltip from "../common/textFieldWithTooltip";
import SettingsAccordion from "./settingsAccordion";

function Endpoint({ data = {}, index = 0, onParentUpdate = () => {} }) {
  const endpoint = data;
  const onGroupCommandsUpdate = onParentUpdate;

  const onPropUpdate = (event, prop) => {
    const value = event.target.value;
    let c = endpoint;
    c[prop] = value;
    onGroupCommandsUpdate(index, c);
  };

  return (
    <SettingsAccordion>
      <Stack sx={{ m: 2 }}>
        <TextFieldWithTooltip
          id="endpointName"
          label="Name"
          defaultValue={endpoint.name}
          onChange={(event) => onPropUpdate(event, "name")}
          tooltip={"The name of the endpoint"}
        />
        <TextFieldWithTooltip
          id="endpointDescription"
          label="Description"
          defaultValue={endpoint.description}
          onChange={(event) => onPropUpdate(event, "description")}
          tooltip={"Describe what this endpoint does"}
        />
        <TextFieldWithTooltip
          id="endpointMethod"
          label="HTTP Method"
          defaultValue={endpoint.method}
          onChange={(event) => onPropUpdate(event, "method")}
          tooltip={"The endpoint's HTTP Method"}
        />
        <TextFieldWithTooltip
          id="endpointPath"
          label="URL Path"
          defaultValue={endpoint.path}
          onChange={(event) => onPropUpdate(event, "path")}
          tooltip={
            "What is the path of this endpoint (not including the API's base address)"
          }
        />
        <TextFieldWithTooltip
          id="endpointHeaders"
          label="HTTP Headers"
          defaultValue={endpoint.headers}
          onChange={(event) => onPropUpdate(event, "headers")}
          tooltip={"Describe which HTTP headers are allowed by this endpoint"}
        />
        <TextFieldWithTooltip
          id="endpointBody"
          label="HTTP Body"
          defaultValue={endpoint.body}
          onChange={(event) => onPropUpdate(event, "body")}
          tooltip={"Describe the HTTP body that is allowed by this endpoint"}
        />
      </Stack>
    </SettingsAccordion>
  );
}

export default Endpoint;
