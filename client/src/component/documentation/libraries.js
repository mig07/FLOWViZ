import Typography from "@mui/material/Typography";
import * as React from "react";
import Loading from "../common/loading";
import ResourceNotFound from "../common/resourceNotFound";
import ToolCardGrid from "./toolCardGrid";
import ToolService from "../../service/toolService";

export default function Libraries({ config }) {
  const toolService = new ToolService(config);

  return (
    <>
      <Typography variant="h3" align="center">
        Available Libraries
        {toolService.getTools(ResourceNotFound, ToolCardGrid, <Loading />)}
      </Typography>
    </>
  );
}
