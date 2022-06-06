import * as React from "react";
import { useState } from "react";
import { Handle, Position } from "react-flow-renderer";
import { Typography, TextField, Card, Stack } from "@mui/material";
import "./toolNode.css";
import { IconButton } from "@material-ui/core";
import SettingsIcon from "@mui/icons-material/Settings";
import ToolSetupDialog from "./setup/toolSetupDialog";

function ToolNode({ data }) {
  const tool = data.tool;
  const onAddStep = data.onAddStep;

  const inputColor = "#ff0000";
  const outputColor = "#00ff22";

  // Tool setup dialog state hooks
  const [stepName, setStepName] = useState("");
  const [openToolSetup, setOpenToolSetup] = useState(false);
  const [toolSetupScroll, setToolSetupScroll] = useState("paper");

  // Opening the setup dialog
  const onSetupDialogOpen = (scrollType) => () => {
    setOpenToolSetup(true);
    setToolSetupScroll(scrollType);
  };

  // Closing the setup dialog
  const onSetupDialogCancel = () => {
    setOpenToolSetup(false);
  };

  const onStepNameUpdate = (event) => {
    const value = event.target.value;
    setStepName(value);
  };

  return (
    <div className="tool-node">
      <ToolSetupDialog
        open={openToolSetup}
        tool={tool}
        toolSetupScroll={toolSetupScroll}
        onSetupDialogCancel={onSetupDialogCancel}
        onSetupDialogApply={(setup) =>
          onAddStep({ name: stepName, setup: setup })
        }
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
      <Stack spacing>
        <Typography variant="caption">{tool.name} Node</Typography>
        <div>
          <input placeholder="Step name" onChange={onStepNameUpdate} />
          <IconButton onClick={onSetupDialogOpen("paper")}>
            <SettingsIcon />
          </IconButton>
        </div>
      </Stack>
    </div>
  );
}

export default React.memo(ToolNode);
