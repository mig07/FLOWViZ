import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@material-ui/core";
import * as React from "react";
import { useState } from "react";
import ToolLibraryDialog from "./library/toolLibraryDialog";

export default function ToolSetupDialog({
  open,
  tool,
  scroll,
  onSetupDialogApply,
  onSetupDialogClose,
}) {
  const descriptionElementRef = React.useRef(null);

  // For tools that provide both setup methods
  const [setupMethod, setSetupMethod] = useState("library");

  const [commandGroups, cmdGroup, firstCmdName] = getLibrary(tool);

  const command = {
    groupName: cmdGroup.name,
    name: "",
    value: "",
  };

  const [commands, setCommands] = useState([
    {
      groupName: cmdGroup.name,
      name: firstCmdName,
      value: "",
    },
  ]);

  const [endpoints, setEndpoints] = useState([
    {
      groupName: cmdGroup.name,
      name: firstCmdName,
      value: "",
    },
  ]);

  const onAddCommand = (event) => {
    setCommands([...commands, command]);
  };

  const onRemoveCommand = (event, i) => {
    if (commands.length <= 1 || i === 0) return;
    const cmds = [...commands];
    cmds.splice(i, 1);
    setCommands(cmds);
  };

  const onUpdateCommand = (event, i, prop) => {
    const value = event.target.value;
    const cmds = [...commands];
    cmds[i][prop] = value;
    setCommands(cmds);
  };

  const onCancel = (event) => {
    setCommands([command]);
    onSetupDialogClose();
  };

  const onApply = (config) => {
    onSetupDialogApply(!config.library ? { endpoints } : { commands });
    onSetupDialogClose();
  };

  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <>
      <Dialog
        fullWidth
        maxWidth="sm"
        open={open}
        onClose={onSetupDialogClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Workflow Step Setup</DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
          {tool.library && tool.api ? (
            <Container>
              <Typography variant="h6">Method</Typography>
              <Button onClick={(event) => setSetupMethod("api")}>API</Button>
              <Button onClick={(event) => setSetupMethod("library")}>
                Library
              </Button>
            </Container>
          ) : tool.library ? (
            <ToolLibraryDialog
              commands={commands}
              commandGroups={commandGroups}
              onAddCommand={onAddCommand}
              onRemoveCommand={onRemoveCommand}
              onUpdateCommand={onUpdateCommand}
            />
          ) : (
            <></>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancel}>Cancel</Button>
          <Button
            onClick={() => onApply({ library: commands, api: endpoints })}
          >
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

function getLibrary(tool) {
  const library = tool.library;

  if (!library) return [];

  const commandGroups = library.commandGroups;
  const cmdGroup = commandGroups.find((cmdGroup) => cmdGroup.order === 0);
  const firstCmd = cmdGroup.commands[0];
  const firstCmdName = firstCmd.name;

  return [commandGroups, cmdGroup, firstCmdName];
}
