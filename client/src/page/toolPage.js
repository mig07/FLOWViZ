import * as React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container } from "@material-ui/core";
import { Toolbar } from "@mui/material";
import ToolTitle from "../component/documentation/tool/toolTitle";
import ToolFunctions from "../component/documentation/tool/toolFunctions";
import Tool from "../model/tool";

export default function ToolPage(props) {
  let { toolName } = useParams();

  return (
    <Tool config={props.config} toolName={toolName}>
      {(tool) => {
        console.log(tool);
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
      }}
    </Tool>
  );
}
