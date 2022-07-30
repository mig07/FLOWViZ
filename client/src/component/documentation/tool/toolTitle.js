import * as React from "react";
import Typography from "@mui/material/Typography";
import { Divider } from "@mui/material";

export default function ToolTitle({ name, type, description }) {
  return (
    <>
      <Typography variant="h3" align="left">
        {name}
      </Typography>
      <Divider />
      <Typography variant="h5" marginTop={5} align="left">
        Type: {type}
      </Typography>
      <Typography variant="body1" marginTop={5} align="left">
        Description: {description}
      </Typography>
    </>
  );
}
