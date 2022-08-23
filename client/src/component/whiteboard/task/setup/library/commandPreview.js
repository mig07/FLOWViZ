import React from "react";
import { Paper, Typography } from "@mui/material";

export default function CommandPreview({ toolName, library, inputCommands }) {
  let args = inputCommands.map((cmd, index) => {
    return `${index > 0 ? " " : ""}${getInvocationFromCmd(
      library,
      cmd.groupName,
      cmd.name
    )} ${cmd.value}`;
  });

  // TODO
  const tName = toolName.toLowerCase();

  return (
    <>
      <Typography>
        <b>Command preview</b>
      </Typography>
      <Paper sx={{ p: 2 }}>
        <pre>
          {tName} {args}
        </pre>
      </Paper>
    </>
  );
}

const getInvocationFromCmd = (library, cmdGroup, cmdName) => {
  const cmdGroupCommands = library.find(
    (commandGroup) => commandGroup.name === cmdGroup
  ).commands;

  const cmd =
    cmdName !== ""
      ? cmdGroupCommands.find((cmd) => cmd.name === cmdName)
      : cmdGroupCommands[0];

  return cmd.invocation[0];
};
