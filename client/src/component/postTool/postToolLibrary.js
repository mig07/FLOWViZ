import * as React from "react";
import { Divider, Stack, Typography } from "@mui/material";
import PostToolAccordion from "./postToolAccordion";
import SettingsAccordion from "./settingsAccordion";
import { Container } from "@mui/material";
import PostToolLibraryCommandGroup from "./postToolLibraryCommandGroup";
import Counter from "./counter";

export default function PostToolLibrary(props) {
  const cmdGroupsNumber = props.cmdGroupsNumber;
  const onChangeCmdGroupCounter = props.onChangeCmdGroupCounter;
  const cmdGroups = Array(cmdGroupsNumber);

  return (
    <PostToolAccordion>
      <SettingsAccordion id="Command Groups">
        <Container sx={{ w: "100%", m:2 }}>
          <Stack spacing={2}>            
            <Counter 
              label="Number of command groups"
              id="cmdGroups"
              minValue={1}
              defaultValue={cmdGroupsNumber}
              onValueChange={onChangeCmdGroupCounter}
            />
            <Typography variant="h6">Groups</Typography>
            <Divider />
          </Stack>
          <Container sx={{ mt: 2 }}>
            {cmdGroups.fill(<PostToolLibraryCommandGroup />)}
          </Container>
        </Container>
      </SettingsAccordion>
    </PostToolAccordion>
  );
}
