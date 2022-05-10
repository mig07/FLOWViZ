import * as React from "react";
import { Handle, Position } from "react-flow-renderer";
import { Typography, TextField, Card } from "@mui/material";
import "./toolNode.css";
import { IconButton } from "@material-ui/core";
import SettingsIcon from "@mui/icons-material/Settings";

export default function ToolNode({ data }) {
  const tool = data.tool;

  const onToolSetupButtonOpen = data.onToolSetupButtonOpen;

  return (
    <Card className="tool-node">
      <Handle position={Position.Top} />
      <Typography variant="body1">{tool.name} Node</Typography>
      <TextField textAlign="center" label="Step name" variant="outlined" />
      <IconButton onClick={onToolSetupButtonOpen('paper')}>
        <SettingsIcon />
      </IconButton>      
      <Handle position={Position.Bottom} />
    </Card>
  );
}
