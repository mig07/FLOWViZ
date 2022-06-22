import { Box, Button, Grid, Toolbar, Typography } from "@mui/material";
import * as React from "react";
import CommandGroups from "./commandGroups";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState } from "react";
import onArrayCountUpdate from "./util";

export default function Rules({
  api,
  library,
  configMethod,
  onMethodChoice = () => {},
  onLibraryUpdate = () => {},
  generateCommandGroup,
}) {
  const MethodChoice = () => (
    <>
      <Typography variant="h6" textAlign="center" sx={{ mt: 2, mb: 2 }}>
        Choose your configuration method
      </Typography>
      <Grid
        container
        spacing={2}
        direction="row"
        alignItems="center"
        justifyContent="center"
      >
        <Grid item>
          <Button variant="outlined" onClick={() => onMethodChoice("api")}>
            API
          </Button>
        </Grid>
        <Grid item>
          <Button variant="outlined" onClick={() => onMethodChoice("library")}>
            Library
          </Button>
        </Grid>
      </Grid>
      <Toolbar />
    </>
  );

  const LibraryConfig = () => (
    <CommandGroups
      data={library}
      library={library}
      onLibraryUpdate={onLibraryUpdate}
      generateCommandGroup={generateCommandGroup}
    />
  );

  const ApiConfig = () => <></>;

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
      <MethodChoice />
      <Method />
      <Toolbar />
    </>
  );
}
