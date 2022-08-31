import React from "react";
import { Grid } from "@mui/material";

export default function ToolInfo({ tool }) {
  const general = Object.entries(tool.general);
  const type = tool.access._type;
  const access = Object.entries(
    type === "api" ? tool.access.api : tool.access.library
  );

  const GridItem = (collection) => {
    return collection.map(([key, value]) => {
      if (Array.isArray(value)) return <></>;
      return (
        <Grid key={key} item xs={6}>
          <b>{key}</b> : {value}
        </Grid>
      );
    });
  };

  return (
    <Grid container>
      {general.map(([key, value]) => (
        <Grid key={key} item xs={6}>
          <b>{key}</b>: {value}
        </Grid>
      ))}
      {access.map(([key, value]) => {
        if (Array.isArray(value)) return <></>;
        return (
          <Grid key={key} item xs={6}>
            <b>{key}</b>: {value}
          </Grid>
        );
      })}
    </Grid>
  );
}
