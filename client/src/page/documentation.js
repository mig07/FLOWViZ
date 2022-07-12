import React from "react";
import { Toolbar } from "@mui/material";
import Apis from "../component/documentation/apis";
import Libraries from "../component/documentation/libraries";

export default function Documentation({ config }) {
  return (
    <>
      <Toolbar />
      <Libraries config={config} />
      <Apis config={config} />
    </>
  );
}
