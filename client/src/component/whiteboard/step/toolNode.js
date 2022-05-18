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

  // Library hooks
  /* const [cmd, setCmd] = useState(firstCmdName);
  const [cmdValue, setCmdValue] = useState("");
  const [subCommandSet, setSubCommandSet] = useState("");
  const [subCommand, setSubCommand] = useState("");
  const [subCommandValue, setSubCommandValue] = useState(""); */

  // Library setup hook
  const [librarySetup, setLibrarySetup] = useState({
    commandName: "",
    commandValue: "",
    subCommandSet: "",
    subCommandName: "",
    subCommandValue: "",
  });

  const onLibrarySetupUpdate = (updatedLibSetup) => {
    setLibrarySetup(updatedLibSetup);
  };

  // API setup hook
  const [apiSetup, setApiSetup] = useState({});

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
        onSetupDialogCancel={onSetupDialogCancel}
        onSetupDialogApply={(onAddStep)}
        toolSetupScroll={toolSetupScroll}
        librarySetupState={librarySetup}
        onLibrarySetupUpdate={onLibrarySetupUpdate}
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
