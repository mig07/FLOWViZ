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
  onLibraryUpdate = () => {},
  generateCommandGroup,
  onApiUpdate = () => {},
  generateEndpoint,
}) {
  const LibraryConfig = () => (
    <CommandGroups
      data={library}
      library={library}
      onLibraryUpdate={onLibraryUpdate}
      generateCommandGroup={generateCommandGroup}
    />
  );

  const ApiConfig = () => (
    <Endpoints
      data={api}
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
