import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@material-ui/core";
import { Stack } from "@mui/material";
import * as React from "react";
import { useState } from "react";
import ToolSetupRow from "./toolSetupRow";
import ToolSetupStack from "./toolSetupStack";
import ToolSetupLibraryCommand from "./library/toolSetupLibraryCommand";
import VariableContainer from "../io/variable";
import ChipContainer from "../../../common/chipContainer";
import TextFieldWithTooltip from "../../../common/textFieldWithTooltip";

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

  const [inputKey, setInputKey] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [outputKey, setOutputKey] = useState("");
  const [inputs, setInputs] = useState([]);
  const [outputs, setOutputs] = useState([]);
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

  const onAddElement = (collection, value, setter, prop = "") => {
    const hasChip = collection.find((elem) => elem === value);
    if (!hasChip) {
      setter((collection) => [...collection, value]);
    }
  };

  const onRemoveElement = (value, setter) => {
    setter((col) => col.filter((elem) => elem !== value));
  };

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
              <VariableContainer
                onAddElement={(e) => onAddElement(inputs, inputKey, setInputs)}
              >
                <Stack>
                  <TextFieldWithTooltip
                    id="str-text-field-input-key"
                    label="Input key"
                    defaultValue={inputKey}
                    onChange={(event) => setInputKey(event.target.value)}
                    tooltip="The input variable key to assign a task input."
                  />
                  <TextFieldWithTooltip
                    id="str-text-field-input-value"
                    label="Input value"
                    defaultValue={inputValue}
                    onChange={(event) => setInputValue(event.target.value)}
                    tooltip="The input variable value to assign a value to the key variable."
                  />
                </Stack>
                <ChipContainer
                  chips={inputs}
                  onRemoveChip={(value) => onRemoveElement(value, setInputs)}
                />
              </VariableContainer>
            </ToolSetupRow>
            <ToolSetupRow title="Output">
              <VariableContainer
                onAddElement={(e) =>
                  onAddElement(outputs, outputKey, setOutputs)
                }
              >
                <Stack>
                  <TextFieldWithTooltip
                    id="str-text-field-output-key"
                    label="Output key"
                    defaultValue={outputKey}
                    onChange={(event) => setOutputKey(event.target.value)}
                    tooltip="The output key variable to assign the output of this task. This key will be used by the next task to get the result of this one."
                  />
                </Stack>
                <ChipContainer
                  chips={outputs}
                  onRemoveChip={(value) => onRemoveElement(value, setOutputs)}
                />
              </VariableContainer>
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
