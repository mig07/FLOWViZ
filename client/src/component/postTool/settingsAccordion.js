import * as React from "react";
import { Accordion, AccordionSummary, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function SettingsAccordion({ name, description, children }) {
  const id = `${name}-accordion`;

  const [expanded, setExpanded] = React.useState(true);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Accordion expanded={expanded === id} onChange={handleChange(id)}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`${id}-content`}
        id={`${id}-header`}
      >
        <Typography variant="h6" sx={{ width: "33%", flexShrink: 0 }}>
          {name}
        </Typography>
        <Typography sx={{ color: "text.secondary" }}>
          {description ? description : <></>}
        </Typography>
      </AccordionSummary>
      <>{children}</>
    </Accordion>
  );
}
