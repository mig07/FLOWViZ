import * as React from "react";
import { Container, Divider, Toolbar, Typography, Button } from "@mui/material";
import { Stack } from "@mui/material";
import SettingsAccordion from "../component/postTool/settingsAccordion";
import PostToolLibrary from "../component/postTool/postToolLibrary";
import PostToolAccordion from "../component/postTool/postToolAccordion";

export const ToolContext = React.createContext();

export default function PostTool() {
  const initialState = {
    api: {
      general: {
        name: "",
        description: "",
      },
      access: {
        address: "",
        port: "",
      },
    },
    library: {
      general: {
        name: "",
        description: "",
      },
      access: {
        address: "",
        port: "",
      },
      commandGroups: {
        numberOfGroups: 1,
        groups: [
          {
            name: "",
            invocation: [],
            order: 0,
            number: 1,
            commands: [
              {
                name: "",
                invocation: [],
                values: [],
                subCommands: [],
                subCommandSets: [],
              },
            ],
          },
        ],
      },
    },
  };

  const [tool, setTool] = React.useState(initialState);

  const onApiChange = React.useCallback((updatedApi) => {
    setTool({ api: updatedApi });
  }, []);

  const onLibraryChange = React.useCallback((updatedLib) => {
    setTool({ library: updatedLib });
  }, []);

  const onCommandGroupsChange = (updatedCmdGroups) => {
    setTool({ library: { commandGroups: updatedCmdGroups } });
  };

  return (
    <Container component="main" maxWidth="lg">
      <Toolbar />
      <Stack spacing={2}>
        <>
          <Typography variant="h2">Add a tool</Typography>
          <Divider />
        </>
        <div>
          <ToolContext.Provider
            value={{
              state: tool,
              onApiChange: onApiChange,
              onLibraryChange: onLibraryChange,
            }}
          >
            <SettingsAccordion
              id="API"
              description="Describe your tool's endpoints"
            >
              <PostToolAccordion cb={onApiChange} type="api" />
            </SettingsAccordion>
            <SettingsAccordion
              id="Library"
              description="Describe your tool's library commands"
            >
              <PostToolAccordion cb={onLibraryChange} type="library">
                <PostToolLibrary cb={onCommandGroupsChange} />
              </PostToolAccordion>
            </SettingsAccordion>
          </ToolContext.Provider>
        </div>
      </Stack>
      <Button
        alignSelf="right"
        onClick={() => {
          console.log(tool);
        }}
      >
        Submit
      </Button>
    </Container>
  );
}
