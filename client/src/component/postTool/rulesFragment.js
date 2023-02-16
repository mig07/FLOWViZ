import { Box, Button, Grid, Toolbar, Typography } from "@mui/material";
import * as React from "react";
import CommandGroups from "./commandGroups";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState } from "react";
import onArrayCountUpdate from "./util";
import Endpoints from "./endpoints";

export default function Rules({
  api,
  library,
  configMethod,
  commandGroupsSetter,
  commandsSetter,
  onApiUpdate = () => {},
  generateEndpoint,
}) {
  const LibraryConfig = () => (
    <CommandGroups
      groups={library}
      commandGroupsSetter={commandGroupsSetter}
      commandsSetter={commandsSetter}
    />
  );

  const ApiConfig = () => (
    <Endpoints
      api={api}
      onApiUpdate={onApiUpdate}
      generateEndpoint={generateEndpoint}
    />
  );

  const Method = () => {
    switch (configMethod) {
      case "library":
        return <LibraryConfig />;
      case "api":
        return <ApiConfig />;
      default:
        return <></>;
    }
  };

  return (
    <>
      <Method />
      <Toolbar />
    </>
  );
}
