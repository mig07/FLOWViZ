import React from "react";
import { Divider, Typography } from "@mui/material";

export default function PageTitle({ name }) {
  return (
    <>
      <Typography variant="h2">{name}</Typography>
      <Divider />
    </>
  );
}
