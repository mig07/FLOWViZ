import * as React from "react";
import {
  Accordion,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function SettingsAccordion(props) {
  const name = props.name;
  const id = `${name}-accordion`;
  const description = props.description;

  const [expanded, setExpanded] = React.useState(false);

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
          <Typography variant="h6" sx={{ width: "33%", flexShrink: 0 }}>{name}</Typography>
          <Typography sx={{ color: "text.secondary" }}>
            {description ? description : <></>}
          </Typography>
        </AccordionSummary>
        <>{props.children}</>
      </Accordion>    
  );
}
