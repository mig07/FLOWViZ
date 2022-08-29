import { Button, Grid, Stack, Typography, useTheme } from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function WorkflowSubmission() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const appBarHeight = theme.mixins.toolbar.minHeight;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: `calc(100vh - ${appBarHeight * 2}px)`,
      }}
    >
      <Stack spacing={2} sx={{ alignItems: "center" }}>
        <Typography variant="h2">{state.text}</Typography>
        <Typography variant="h5">{`Go to:`}</Typography>
        <Grid
          container
          spacing={5}
          sx={{ alignItems: "center", justifyContent: "center" }}
        >
          <Grid item>
            <Button variant="outlined" onClick={() => navigate("/")}>
              Home
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              onClick={() => navigate(state.resourcePageUrl)}
            >
              {state.resourcePageLabel}
            </Button>
          </Grid>
        </Grid>
      </Stack>
    </div>
  );
}
