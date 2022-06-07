import Typography from "@mui/material/Typography";
import * as React from "react";
import Request from "../../service/request";
import Loading from "../common/loading";
import ResourceNotFound from "../common/resourceNotFound";
import ToolCardGrid from "./toolCardGrid";

export default function Libraries({ config }) {
  const url = `${config.appProtocol}://${config.address}:${config.port}/tool`;

  return (
    <>
      <Typography variant="h3" align="center">
        Available Libraries
        {Request(url, {}, ResourceNotFound, ToolCardGrid, <Loading />)}
      </Typography>
    </>
  );
}
