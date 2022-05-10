import * as React from "react";
import { Container, Divider, Toolbar, Typography } from "@mui/material";
import { Stack } from "@mui/material";
import SettingsAccordion from "../component/postTool/settingsAccordion";
import PostToolLibrary from "../component/postTool/postToolLibrary";
import PostToolAccordion from "../component/postTool/postToolAccordion";

export default function PostTool() {
  const [cmdGroupsNumber, setCmdGroupsNumber] = React.useState(1);
  const [state, setState] = React.useState([
    {
      name: "",
      invocation: "",
      allowedValues: [],
      allowedCommands: [],
      allowedCommandSets: [],
    },
  ]);

  const onChangeCmdGroupCounter = (event) => {
    const value = Number(event.target.value)
    if (value > 0) {
      setCmdGroupsNumber(() => value)
    }
  }

  return (
    <Container component="main" maxWidth="lg">
      <Toolbar />
      <Stack spacing={2}>
        <>
          <Typography variant="h2">Add a tool</Typography>
          <Divider />
        </>
        <div>
          <SettingsAccordion
            id="API"
            description="Describe your tool's endpoints"
          >
            <PostToolAccordion />
          </SettingsAccordion>
          <SettingsAccordion
            id="Library"
            description="Describe your tool's library commands"
          >
            <PostToolLibrary
              state={state}
              cmdGroupsNumber={cmdGroupsNumber}
              onChangeCmdGroupCounter={onChangeCmdGroupCounter}
            />
          </SettingsAccordion>
        </div>
      </Stack>
    </Container>
  );
}
