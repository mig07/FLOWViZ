import { Button, Grid, Toolbar, Typography } from "@mui/material";
import * as React from "react";
import BaseToolAccordion from "./baseToolAccordion";

export default function Rules({
  api,
  library,
  configMethod,
  onMethodChoice = () => {},
  onApiChange = () => {},
  onLibraryChange = () => {},
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
    <>
      <BaseToolAccordion onParentUpdate={onApiChange} data={api} />
    </>
  );

  const ApiConfig = () => (
    <>
      <BaseToolAccordion onParentUpdate={onLibraryChange} data={library} />
    </>
  );

  const RulesFragment = () => {
    switch (configMethod) {
      case "library":
        return <LibraryConfig />;
      case "api":
        return <ApiConfig />;
      default:
        return <MethodChoice />;
    }
  };

  return <RulesFragment />;
}
