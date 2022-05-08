import * as React from "react";
import { Typography, Divider, Card, Box } from "@mui/material";
import "./toolNode.css";
import CmdSelector from "./cmdSelector";
import SubCmdSelector from "./subCmdSelector";

export default function Command(props) {
  const commandGroups = props.commandGroups;
  const firstCommandGroup = commandGroups.find(
    (commandGroup) => commandGroup.order == 0
  );
  const firstCommandGroupName = firstCommandGroup.groupName;
  const firstCommandGroupCmdNames = firstCommandGroup.commands.map(
    (command) => command.name
  );

  const [commandName, setCommandName] = React.useState("");
  const [allowedValues, setAllowedValues] = React.useState([]);
  const [selectedAllowedValue, setSelectedAllowedValue] = React.useState("");
  const [allowedCommandSets, setAllowedCommandSets] = React.useState([]);
  const [cmdSetSeletors, setCmdSetSelectors] = React.useState(1);

  const onAddSelect = () => {
    setCmdSetSelectors((val) => val + 1);
  };

  const onRemoveSelect = () => {
    if (cmdSetSeletors > 1) {
      setCmdSetSelectors((val) => val - 1);
    }
  };

  const onCommandSelectChange = (event) => {
    const commandName = event.target.value;

    const selectedCmd = firstCommandGroup.commands.find(
      (command) => command.name === commandName
    );

    setAllowedValues([...selectedCmd.allowedValues]);
    setAllowedCommandSets([...selectedCmd.allowedCommandSets]);
    setCommandName(commandName);
  };

  const onCommandValueSelectChange = (event) => {
    const commandValueName = event.target.value;
    setSelectedAllowedValue(commandValueName);
  };

  return (
    <Box>
      <Box mb={2}>
        <Typography variant="h6">Commands</Typography>
        <Divider />
      </Box>
      <Card variant="outlined" sx={{ p: 1 }}>
        <CmdSelector
          id="cmd"
          collection={firstCommandGroupCmdNames}
          selectedElem={commandName}
          cb={onCommandSelectChange}
          label={firstCommandGroupName}
        />
        <CmdSelector
          id="cmd-allowed-values"
          collection={allowedValues}
          selectedElem={selectedAllowedValue}
          cb={onCommandValueSelectChange}
          label="Allowed command values"
        />
        {Array(cmdSetSeletors).fill(
          <SubCmdSelector
            label="Sub-command"
            collection={allowedCommandSets}
            onAdd={onAddSelect}
            onRemove={onRemoveSelect}
            canMultiply={true}
          />
        )}
      </Card>
    </Box>
  );
}
