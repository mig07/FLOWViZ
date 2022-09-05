import { Paper, Typography } from "@mui/material";
import React from "react";

export default function CommandPreview({ cmdPreview }) {
  return (
    <>
      <Typography>
        <b>Command preview</b>
      </Typography>
      <Paper sx={{ p: 2 }}>
        <pre>{cmdPreview}</pre>
      </Paper>
    </>
  );
}
