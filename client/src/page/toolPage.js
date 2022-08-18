import * as React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container } from "@material-ui/core";
import { Toolbar } from "@mui/material";
import ToolTitle from "../component/documentation/tool/toolTitle";
import ToolFunctions from "../component/documentation/tool/toolFunctions";
import ToolService from "../service/toolService";
import InfoBar from "../component/common/infoBar";
import Loading from "../component/common/loading";

export default function ToolPage(props) {
  let { toolName } = useParams();
  const toolService = new ToolService(props.config);

  const onSuccess = (tool) => {
    const general = tool.general;
    const access = tool.access;
    return (
      <Container>
        <Toolbar />
        <ToolTitle
          name={general.name}
          description={general.description}
          type={access._type}
        />
        <ToolFunctions tool={tool} />
      </Container>
    );
  };

  const onError = (error) => {
    return <InfoBar type="error" text={error} />;
  };

  return toolService.getTool(toolName, onError, onSuccess, <Loading />);
}
