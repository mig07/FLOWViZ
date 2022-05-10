import * as React from "react";
import {
  Accordion,
  AccordionSummary,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@material-ui/core";
import Command from "./command";

export default function ToolSetupDialog(props) {
  const open = props.openToolSetup;
  const scroll = props.toolSetupScroll;
  const handleClose = props.onToolSetupButtonClose;

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

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

  

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Tool Setup</DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Apply</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
