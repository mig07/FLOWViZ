import { Toolbar } from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import * as React from "react";
import Loading from "../component/common/loading";
import Libraries from "../component/documentation/libraries";
import Apis from "../component/documentation/apis";
import ToolCard from "../component/documentation/toolCard";
import Tools from "../model/tools";
import Request from "../service/request";

export default function Documentation({ config }) {
  return (
    <>
      <Toolbar />
      <Libraries config={config} />
      <Apis />
    </>
  );
}
