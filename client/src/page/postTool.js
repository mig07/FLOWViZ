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

export const ToolContext = React.createContext();

export default function PostTool() {
  const [tool, setTool] = React.useState(toolSetupInitialState);

  const onApiChange = React.useCallback((updatedApi) => {
    setTool({ api: updatedApi });
  }, []);

  const onLibraryChange = React.useCallback((updatedLib) => {
    setTool({ library: updatedLib });
  }, []);

  const onCommandGroupsUpdate = React.useCallback((updatedCmdGroups) => {
    setTool({ library: { commandGroups: updatedCmdGroups } });
  }, []);

  return (
    <Container component="main" maxWidth="lg">
      <Toolbar />
      <>
        <Typography variant="h2">Add a tool</Typography>
        <Divider />
      </>
      <Paper elevation={0} sx={{ p: 2, maxHeight: 800, overflow: "auto" }}>
        <Stack spacing={2}>
          <ToolContext.Provider value={{ state: tool }}>
            <SettingsAccordion
              name="API"
              description="Describe your tool's endpoints"
            >
              <BaseToolAccordion onToolUpdate={onApiChange} type="api" />
            </SettingsAccordion>
            <SettingsAccordion
              name="Library"
              description="Describe your tool's library commands"
            >
              <BaseToolAccordion onToolUpdate={onLibraryChange} type="library">
                <CommandGroups onCommandGroupsUpdate={onCommandGroupsUpdate} />
              </BaseToolAccordion>
            </SettingsAccordion>
          </ToolContext.Provider>
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
