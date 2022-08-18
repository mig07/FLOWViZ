import * as React from "react";
import { useState } from "react";
import { Handle, Position } from "react-flow-renderer";
import { Typography, TextField, Card, Stack } from "@mui/material";
import "./toolNode.css";
import { IconButton } from "@material-ui/core";
import SettingsIcon from "@mui/icons-material/Settings";
import ToolSetupDialog from "./setup/toolSetupDialog";

function ToolNode({ id, data }) {
  const tool = data.tool;

  const inputColor = "#ff0000";
  const outputColor = "#00ff22";

  const [nodeColor, setNodeColor] = useState("#000");

  const onChangeNodeColor = (event) => {
    const color = event.target.value;
    setNodeColor(color);
  };

  // Tool setup dialog state hooks
  const [openToolSetup, setOpenToolSetup] = useState(false);
  const [toolSetupScroll, setToolSetupScroll] = useState("paper");

  // Opening the setup dialog
  const onSetupDialogOpen = (scrollType) => () => {
    setOpenToolSetup(true);
    setToolSetupScroll(scrollType);
  };

  // Closing the setup dialog
  const onSetupDialogClose = () => {
    setOpenToolSetup(false);
  };

  const onSetupDialogApply = (config) => {
    const nodeSetup = data.setup;
    nodeSetup.config = config;
    data.onNodeUpdate(id, nodeSetup);
  };

  const onStepNameUpdate = (event) => {
    const value = event.target.value;
    const nodeSetup = data.setup;
    nodeSetup.stepName = value;
    data.onNodeUpdate(id, nodeSetup);
  };

  const ToolSetupDialog2 = ({ children }) => {};

  return (
    <div className="tool-node" style={{ "border-color": nodeColor }}>
      <ToolSetupDialog
        open={openToolSetup}
        tool={tool}
        scroll={toolSetupScroll}
        onSetupDialogApply={onSetupDialogApply}
        onSetupDialogClose={onSetupDialogClose}
      />
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: inputColor }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ background: outputColor }}
      />
      <div>{tool.general.name} Node</div>
      <div>
        <input placeholder="Step name" onChange={onStepNameUpdate} />
        <IconButton onClick={onSetupDialogOpen("paper")}>
          <SettingsIcon />
        </IconButton>
        <input
          className="nodrag"
          type="color"
          onChange={onChangeNodeColor}
          defaultValue={nodeColor}
          style={{ width: 30 }}
        />
      </div>
    </div>
  );
}

export default React.memo(ToolNode);
