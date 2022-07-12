import Typography from "@mui/material/Typography";
import * as React from "react";
import Request from "../../service/request";
import Loading from "../common/loading";
import ResourceNotFound from "../common/resourceNotFound";
import ToolCardGrid from "./toolCardGrid";

export default function Apis({ config }) {
  const url = `${config.appProtocol}://${config.address}:${config.port}/tool`;

  return (
    <>
      <Typography variant="h3" marginTop={5} align="center">
        Available APIs
        {Request(url, {}, ResourceNotFound, ToolCardGrid, <Loading />)}
      </Typography>
    </>
  );
}
