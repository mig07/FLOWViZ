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
import ToolSetupRow from "./toolSetupRow";
import ToolSetupStack from "./toolSetupStack";
import ToolSetupLibraryCommand from "./library/toolSetupLibraryCommand";
import Input from "../io/input";
import Output from "../io/output";

export default function ToolSetupDialog({
  open,
  tool,
  scroll,
  onSetupDialogApply,
  onSetupDialogClose,
  children,
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
        <DialogTitle id="scroll-dialog-title">Task Setup</DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
          <ToolSetupStack>
            <ToolSetupRow title="Input">
              <Input />
            </ToolSetupRow>
            <ToolSetupRow title="Output">
              <Output />
            </ToolSetupRow>
            <ToolSetupRow title="Setup">
              {commands.map((cmd, i) => (
                <ToolSetupLibraryCommand
                  key={i}
                  index={i}
                  commandGroups={commandGroups}
                  state={cmd}
                  onParentUpdate={onUpdateCommand}
                  onRemove={onRemoveCommand}
                />
              ))}
              <Button onClick={onAddCommand}>Add command</Button>
            </ToolSetupRow>
          </ToolSetupStack>
        </DialogContent>
        <DialogActions>
          {children}
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

  const commandGroups = library;
  const cmdGroup = commandGroups.find((cmdGroup) => cmdGroup.order === 0);
  const firstCmd = cmdGroup.commands[0];
  const firstCmdName = firstCmd.name;

  return [commandGroups, cmdGroup, firstCmdName];
}
