import * as React from "react";
import { useState, useEffect } from "react";
import ToolDrawer from "../component/whiteboard/toolDrawer";
import ToolSetupDrawer from "../component/whiteboard/toolSetupDrawer";
import Workflow from "../component/workflow/workflow";

export default function Whiteboard(props) {
  const config = props.config;
  const uri = `${config.appProtocol}://${config.address}:${config.port}/library`;

  // Libraries and APIs state hook
  const [list, setList] = useState([]);

  useEffect(() => {
    fetch(uri)
      .then((response) => response.json())
      .then(setList);
  }, []);

  return (
    <>
      <ToolDrawer tools={list} />
      <Workflow config={config} />
    </>
  );
}
