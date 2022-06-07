import Typography from "@mui/material/Typography";
import * as React from "react";
import Request from "../../service/request";
import Loading from "../common/loading";
import ResourceNotFound from "../common/resourceNotFound";
import ToolCardGrid from "./toolCardGrid";

export default function Apis() {
  return (
    <>
      <Typography variant="h3" marginTop={5} align="center">
        Available Apis
        {/* {Request("", {}, ResourceNotFound, ToolCardGrid, <Loading />)} */}
      </Typography>
    </>
  );
}
