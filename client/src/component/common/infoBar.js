import * as React from "react";
import { Alert, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Snackbar from "@mui/material/Snackbar";

export default function InfoBar({ type, text }) {
  const [open, setOpen] = React.useState(true);

  console.log(text);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={type} sx={{ width: "100%" }}>
        {text}
      </Alert>
    </Snackbar>
  );
}
