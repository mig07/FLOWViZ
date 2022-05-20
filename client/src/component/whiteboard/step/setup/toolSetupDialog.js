import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle, Typography
} from "@material-ui/core";
import * as React from "react";
import ToolLibraryDialog from "./library/toolLibraryDialog";

export default function ToolSetupDialog({ open, tool, scroll, onSetupDialogCancel, onSetupDialogApply, librarySetupState, onLibrarySetupUpdate }) {

  const descriptionElementRef = React.useRef(null);

  // For tools that provide both setup methods
  const [setupMethod, setSetupMethod] = React.useState("library");

  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <>
      <Dialog
        fullWidth
        maxWidth="sm"
        open={open}
        onClose={onSetupDialogCancel}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Workflow Step Setup</DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
          {tool.library && tool.api ? (
            <Container>
              <Typography variant="h6">Method</Typography>
              <Button onClick={(event) => setSetupMethod("api")}>API</Button>
              <Button onClick={(event) => setSetupMethod("library")}>Library</Button>
            </Container>
          ) : tool.library ? (
            <ToolLibraryDialog
              library={tool.library}
              librarySetupState={librarySetupState}
              onLibrarySetupUpdate={onLibrarySetupUpdate}
            />
          ) : (
            <></>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={onSetupDialogCancel}>Cancel</Button>
          <Button onClick={onSetupDialogApply}>Apply</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}