import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import { Grid } from "@mui/material";
import * as React from "react";
import { useEffect, useState } from "react";
import ToolInfo from "../info/toolInfo";
import VariableContainer from "../io/variable";
import CommandPreview from "./library/commandPreview";
import ToolSetupLibraryCommand from "./library/toolSetupLibraryCommand";
import RelayedData from "./relayedData";
import ToolSetupRow from "./toolSetupRow";
import ToolSetupStack from "./toolSetupStack";

const reservedValues = ["file", "str"];

export default function ToolSetupDialog({
  nodeId,
  open,
  tool,
  relayedOuts,
  scroll,
  onSetupDialogApply,
  onSetupDialogClose,
  children,
}) {
  const descriptionElementRef = React.useRef(null);

  // For tools that provide both setup methods
  // const [setupMethod, setSetupMethod] = useState("library");

  const relayedOutputs = relayedOuts.flatMap((elem) => elem);

  const [inputs, setInputs] = useState(relayedOutputs);
  const [outputs, setOutputs] = useState([]);

  // Obtains the first command group name and name to fill the selectors
  const [commandGroups, cmdGroup, firstCmdName] = getLibrary(tool);

  // A clean command when adding new commands inside the task
  const cleanCommand = {
    groupName: cmdGroup.name,
    name: cmdGroup.commands[0].name,
    value: "",
    io: "",
  };

  // The library configuration state
  const [inputCommands, setInputCommands] = useState([cleanCommand]);

  const getCmdAttribute = (str) => (str && str !== "" ? ` ${str}` : "");

  const getCommandPreview = () =>
    inputCommands
      .map((cmd) => {
        return `${getInvocationFromCmd(tool.library, cmd.groupName, cmd.name)}${
          reservedValues.includes(cmd.value) ? "" : getCmdAttribute(cmd.value)
        }${getCmdAttribute(cmd.io)}`;
      })
      .toString()
      .replaceAll(",", " ")
      .replaceAll("  ", " ")
      .trim();

  const [isPreviewEditable, setIsPreviewEditable] = useState(false);
  const [commandPreview, setCommandPreview] = useState("");

  const onEditButtonPress = (event) =>
    setIsPreviewEditable((value) => (!value ? true : false));

  const onAddElement = (collection, keyValuePair, setter) => {
    const key = keyValuePair.key;
    const hasChip = collection.find((elem) => elem === key);
    if (!hasChip) {
      setter((collection) => [
        ...collection,
        { name: nodeId, key: key, value: keyValuePair.value },
      ]);
    }
  };

  const onRemoveElement = (key, setter) => {
    setter((col) => col.filter((elem) => elem.key !== key));
  };

  const onAddCommand = (event) => {
    setInputCommands([...inputCommands, cleanCommand]);
  };

  const onRemoveCommand = (event, i) => {
    if (inputCommands.length <= 1 || i === 0) return;
    const cmds = [...inputCommands];
    cmds.splice(i, 1);
    setInputCommands(cmds);
  };

  const onUpdateCommand = (event, i, prop, nextProps) => {
    const value = event.target.value;
    const cmds = [...inputCommands];
    cmds[i][prop] = value;
    // Clean next dependent properties if they exist
    if (nextProps && nextProps.length > 0) {
      nextProps.forEach((nextProp) => {
        cmds[i][nextProp] = "";
      });
    }
    setInputCommands(cmds);
  };

  const onCommandPreviewUpdate = (event) => {
    if (!isPreviewEditable) return;
    setCommandPreview(event.target.value);
  };

  useEffect(() => {
    if (isPreviewEditable) return;
    return setCommandPreview(getCommandPreview());
  }, [onAddElement, onRemoveElement, onUpdateCommand]);

  const onCancel = (event) => {
    setInputCommands([cleanCommand]);
    onSetupDialogClose();
  };

  const onApply = (config) => {
    onSetupDialogApply(config);
    onSetupDialogClose();
  };

  useEffect(() => {
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
        maxWidth="lg"
        open={open}
        onClose={onSetupDialogClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Task Setup</DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
          <ToolSetupStack>
            {relayedOutputs && relayedOutputs.length > 0 ? (
              <ToolSetupRow title={`Relayed data`}>
                <RelayedData relayedOutputs={relayedOutputs} />
              </ToolSetupRow>
            ) : (
              <></>
            )}
            <ToolSetupRow title="Tool information">
              <ToolInfo tool={tool} />
            </ToolSetupRow>
            <ToolSetupRow title="I/O variables">
              <Grid fullWidth container>
                <Grid container item xs={6}>
                  <ToolSetupRow title="Input">
                    <VariableContainer
                      id="Input"
                      keyTooltip="The input variable key to assign a task input."
                      valueTooltip="The input variable value to assign a value to the key variable."
                      collection={inputs}
                      collectionSetter={setInputs}
                      onAddElement={onAddElement}
                      onRemoveElement={onRemoveElement}
                    />
                  </ToolSetupRow>
                </Grid>
                <Grid container item xs={6}>
                  <ToolSetupRow title="Output">
                    <VariableContainer
                      id="Output"
                      keyTooltip="The output key variable to assign the output of this task. This key will be used by the next task to get the result of this one."
                      valueTooltip="The output variable value to assign a value to the key variable."
                      collection={outputs}
                      collectionSetter={setOutputs}
                      onAddElement={onAddElement}
                      onRemoveElement={onRemoveElement}
                    />
                  </ToolSetupRow>
                </Grid>
              </Grid>
            </ToolSetupRow>
            <ToolSetupRow title="Setup">
              <CommandPreview
                cmdPreview={commandPreview}
                onCommandEdit={onCommandPreviewUpdate}
                isEditable={isPreviewEditable}
                onEditButtonPress={onEditButtonPress}
              />
              {inputCommands.map((cmd, i) => (
                <ToolSetupLibraryCommand
                  key={i}
                  index={i}
                  commandGroups={commandGroups}
                  state={cmd}
                  onParentUpdate={onUpdateCommand}
                  onRemove={onRemoveCommand}
                  relayedOutputs={relayedOutputs}
                  inputs={inputs}
                  outputs={outputs}
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
            onClick={() =>
              onApply({
                inputs: inputs,
                outputs: outputs,
                setup: inputCommands,
                action: commandPreview,
              })
            }
          >
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

const getInvocationFromCmd = (library, cmdGroupName, cmdName) => {
  const cmdGroup = library.find(
    (commandGroup) => commandGroup.name === cmdGroupName
  );

  const cmdGroupCommands = cmdGroup.commands;
  const cmd =
    cmdName !== ""
      ? cmdGroupCommands.find((cmd) => cmd.name === cmdName)
      : cmdGroupCommands[0];

  const cmdGroupInvocation = cmdGroup.invocation[0] || "";
  const cmdInvocation = cmd.invocation[0] || "";

  return `${cmdGroupInvocation} ${cmdInvocation}`;
};

function getLibrary(tool) {
  const library = tool.library;

  if (!library) return [];

  const commandGroups = library;
  const cmdGroup = commandGroups.find((cmdGroup) => cmdGroup.order === 0);
  const firstCmd = cmdGroup.commands[0];
  const firstCmdName = firstCmd.name;

  return [commandGroups, cmdGroup, firstCmdName];
}
