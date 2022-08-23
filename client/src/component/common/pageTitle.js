import React from "react";
import { Box, Divider, Typography } from "@mui/material";

export default function PageTitle({ variant = "h2", sx = {}, children }) {
  return (
    <Box sx={sx}>
      <Typography variant={variant} sx={sx}>
        {children}
      </Typography>
      <Divider />
    </Box>
  );
}
