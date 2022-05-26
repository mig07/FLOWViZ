import * as React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container } from "@material-ui/core";
import { Toolbar } from "@mui/material";
import ToolTitle from "../component/documentation/toolTitle";
import ToolFunctions from "../component/documentation/toolFunctions";
import Tool from "../model/tool";

export default function ToolPage(props) {
  let { toolName } = useParams();

  return (
    <Tool config={props.config} toolName={toolName}>
      {(tool) => {
        return (
          <Container>
            <Toolbar />
            <ToolTitle tool={tool} />
            <ToolFunctions tool={tool} />
          </Container>
        );
      }}
    </Tool>
  );
}
