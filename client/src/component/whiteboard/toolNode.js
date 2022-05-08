import * as React from "react";
import { Handle, Position } from "react-flow-renderer";
import { Typography, TextField, Card, Container } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Command from "./command";
import "./toolNode.css";

export default function ToolNode({ data }) {
  const tool = data.tool;

  const type = !tool.library ? "API" : "Library";

  const accordion = (action) => (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="library-accordion"
      >
        <Typography>{type}</Typography>
      </AccordionSummary>
      <AccordionDetails>{action()}</AccordionDetails>
    </Accordion>
  );

  const setupOptions = [];

  switch (type) {
    case "API":
      setupOptions.push(accordion(() => {}));
      break;
    case "Library":
      setupOptions.push(
        accordion(() => <Command commandGroups={tool.library.commandGroups} />)
      );
      break;
  }
  return (
    <Card className="tool-node">
      <Handle position={Position.Top} />
      <Typography variant="body1">{tool.name} Node</Typography>
      <Card variant="outlined" sx={{ p: 1, mt: 2 }}>
        <TextField textAlign="center" label="Step name" variant="outlined" />
        <Typography textAlign="center" variant="body1">
          Setup
        </Typography>
        <Container>{setupOptions.map((option) => option)}</Container>
      </Card>
      <Handle position={Position.Bottom} />
    </Card>
  );
}
