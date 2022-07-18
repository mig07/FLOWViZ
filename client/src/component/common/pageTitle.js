import React from "react";
import { Box, Divider, Typography } from "@mui/material";

export default function PageTitle({ name, variant = "h2", sx = {} }) {
  return (
    <Box sx={sx}>
      <Typography variant={variant} sx={sx}>
        {name}
      </Typography>
      <Divider />
    </Box>
  );
}
