import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { Typography } from "@mui/material";
import * as React from "react";

export default function NavBarTitle({ navigateTo }) {
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: { xs: "block", md: "flex" },
        justifyContent: "left",
      }}
    >
      <Button
        key={"FLOWViZ"}
        sx={{ my: 2, display: "block" }}
        onClick={() => navigateTo("/")}
      >
        <Typography variant="h5">FLOWViZ</Typography>
      </Button>
    </Box>
  );
}
