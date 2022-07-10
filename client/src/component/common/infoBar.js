import * as React from "react";
import Alert from "@mui/material/Alert";

export default function InfoBar(type, text) {
  return <Alert severity={type}>{text}</Alert>;
}
