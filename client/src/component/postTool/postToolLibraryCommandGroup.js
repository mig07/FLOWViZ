import * as React from "react";
import { useState, useCallback, useMemo } from "react";
import SettingsAccordion from "./settingsAccordion";
import { Divider, Stack, TextField, Typography } from "@mui/material";
import Switch from "@mui/material/Switch";
import TextFieldMultiInput from "./textFieldMultiInput";
import { FormControlLabel } from "@mui/material";
import Counter from "./counter";
import PostToolLibraryCommand from "./postToolLibraryCommand";
import { ToolContext } from "../../page/postTool";

export default function PostToolLibraryCommandGroup(props) {
  const toolCtx = React.useContext(ToolContext);
  const tool = toolCtx.state;
  const cb = props.cb;

  const mainProp = tool.library.commandGroups.groups;

  const onPropChange = (event, changePropAction) => {
    const value = event.target.value;
    let mProp = mainProp;
    changePropAction(value, mProp);
    {() => cb(mProp);}
  };

  return (
    <SettingsAccordion>
      <Stack sx={{ p: 2 }} spacing={2}>
        <TextField
          margin="normal"
          id="groupName"
          name="groupName"
          label="Group name"
          onChange={(event) => {
            onPropChange(event, (value, mProp) => {
              mProp.name = value;
            });
          }}
        />
        <TextFieldMultiInput
          name="invocation"
          label="Invocation"
          onButtonClick={(data) => {
            let mProp = mainProp;
            mProp.invocation.push(data);
          }}
        />
        <TextField
          margin="normal"
          id="order"
          name="order"
          label="Order"
          onChange={(event) => {
            onPropChange(event, (value, mProp) => {
              mProp.invocation = Number(value);
            });
          }}
        />
        <FormControlLabel
          control={<Switch />}
          label="Allow command repetition"
        />
        <CommandsSection />
      </Stack>
    </SettingsAccordion>
  );
}

function CommandsSection() {
  const [numberOfCmds, setNumberOfCmds] = useState(1);

  const onValueChange = (event) => {
    const value = Number(event.target.value);
    if (value > 0) {
      setNumberOfCmds(() => value);
    }
  };

  return (
    <>
      <Counter
        label="Number of commands"
        id="cmds"
        minValue={1}
        defaultValue={numberOfCmds}
        onValueChange={onValueChange}
      />
      <Typography variant="h6">Commands</Typography>
      <Divider />
      {Array(numberOfCmds).fill(<PostToolLibraryCommand />)}
    </>
  );
}
