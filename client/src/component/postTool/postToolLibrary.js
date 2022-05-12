import * as React from "react";
import { Divider, Stack, Typography } from "@mui/material";
import SettingsAccordion from "./settingsAccordion";
import { Container } from "@mui/material";
import PostToolLibraryCommandGroup from "./postToolLibraryCommandGroup";
import Counter from "./counter";
import { ToolContext } from "../../page/postTool";

function PostToolLibrary(props) {
  const toolCtx = React.useContext(ToolContext);
  const tool = toolCtx.state;
  const cb = props.cb;

  const mainProp = tool.library.commandGroups;

  const onPropChange = (event, changePropAction) => {
    const value = Number(event.target.value);
    let mProp = mainProp;
    changePropAction(value, mProp);
    {() => cb(mProp);}
  };

  const numberOfGroups = mainProp.numberOfGroups;

  return (
    <SettingsAccordion id="Command Groups">
      <Container sx={{ w: "100%", m: 2 }}>
        <Stack spacing={2}>
          <Counter
            label="Number of command groups"
            id="cmdGroups"
            minValue={1}
            defaultValue={numberOfGroups}
            onValueChange={(event) => {
              onPropChange(event, (value, mainProp) => {
                mainProp.numberOfGroups = value;
              });
            }}
          />
          <Typography variant="h6">Groups</Typography>
          <Divider />
        </Stack>
        <Container sx={{ mt: 2 }}>
          {Array(numberOfGroups).fill(<PostToolLibraryCommandGroup cb={cb}/>)}
        </Container>
      </Container>
    </SettingsAccordion>
  );
}

export default PostToolLibrary;
