import * as React from "react";
import { useState } from "react";
import { Handle, Position } from "react-flow-renderer";
import { Typography, TextField, Card } from "@mui/material";
import "./toolNode.css";
import { IconButton } from "@material-ui/core";
import SettingsIcon from "@mui/icons-material/Settings";
import ToolSetupDialog from "./setup/toolSetupDialog";

export default function ToolNode({ data }) {
  const tool = data.tool;
  const onAddStep = data.onAddStep;

  // Tool setup dialog state hooks
  const [openToolSetup, setOpenToolSetup] = useState(false);
  const [toolSetupScroll, setToolSetupScroll] = useState("paper");

  const [librarySetup, setLibrarySetup] = useState({})
  const [apiSetup, setApiSetup] = useState({})

  // Opening the setup dialog
  const onSetupDialogOpen = (scrollType) => () => {
    setOpenToolSetup(true);
    setToolSetupScroll(scrollType);
  };

  // Closing the setup dialog
  const onSetupDialogCancel = () => {
    setOpenToolSetup(false);
  };

  return (
    <Card className="tool-node">
      <ToolSetupDialog
        open={openToolSetup}
        tool={tool}
        toolSetupScroll={toolSetupScroll}
        onSetupDialogCancel={onSetupDialogCancel}
        onSetupDialogApply={onAddStep}
      />
      <Handle position={Position.Top} />
      <Typography variant="body1">{tool.name} Node</Typography>
      <TextField textAlign="center" label="Step name" variant="outlined" />
      <IconButton onClick={onSetupDialogOpen("paper")}>
        <SettingsIcon />
      </IconButton>
      <Handle position={Position.Bottom} />
    </Card>
  );
}
