import * as React from "react";
import {
  Container,
  Divider,
  Toolbar,
  Typography,
  Button,
  Paper,
} from "@mui/material";
import { Stack } from "@mui/material";
import SettingsAccordion from "../component/postTool/settingsAccordion";
import CommandGroups from "../component/postTool/commandGroups";
import BaseToolAccordion from "../component/postTool/baseToolAccordion";
import SendIcon from "@mui/icons-material/Send";
import { Box } from "@mui/system";
import toolSetupInitialState from "../util/constants";

export default function PostTool() {
  const [tool, setTool] = React.useState(toolSetupInitialState);
  const [api, setApi] = React.useState(toolSetupInitialState);
  const [library, setLibrary] = React.useState(toolSetupInitialState);

  const onApiChange = (updatedApi) => {
    setApi(updatedApi);
  };

  const onLibraryChange = (updatedLib) => {
    setLibrary(updatedLib);
  };

  return (
    <Container component="main" maxWidth="lg">
      <Toolbar />
      <>
        <Typography variant="h2">Add a tool</Typography>
        <Divider />
      </>
      <Paper elevation={0} sx={{ p: 2, maxHeight: 800, overflow: "auto" }}>
        <Stack spacing={2}>
          <SettingsAccordion
            name="API"
            description="Describe your tool's endpoints"            
          >
            <BaseToolAccordion onToolUpdate={onApiChange} data={api} />
          </SettingsAccordion>
          <SettingsAccordion
            name="Library"
            description="Describe your tool's library commands"
          >
            <BaseToolAccordion onToolUpdate={onLibraryChange} data={library}>
              <CommandGroups onCommandGroupsUpdate={onLibraryChange} />
            </BaseToolAccordion>
          </SettingsAccordion>
        </Stack>
      </Paper>
      <Box sx={{ mt: 2 }} textAlign="right">
        <Button
          variant="outlined"
          endIcon={<SendIcon />}
          onClick={() => {
            console.log(tool);
          }}
        >
          Submit
        </Button>
      </Box>
    </Container>
  );
}
