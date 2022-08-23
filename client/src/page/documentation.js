import React from "react";
import { useContext } from "react";
import { Toolbar } from "@mui/material";
import Typography from "@mui/material/Typography";
import Loading from "../component/common/loading";
import GenericError from "../component/common/genericError";
import ToolCardGrid from "../component/documentation/toolCardGrid";
import ToolService from "../service/toolService";
import PageTitle from "../component/common/pageTitle";

export default function Documentation({ toolService }) {
  return (
    <>
      <Toolbar />
      <Typography variant="h3" align="center">
        Available tools
        {toolService.getTools(GenericError, ToolCardGrid, <Loading />)}
      </Typography>
    </>
  );
}
