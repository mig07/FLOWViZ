import React from "react";
import { Toolbar } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Theme from "../../config/theme";

export default function UserForm({ name, icon, handleSubmit, children }) {
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Toolbar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: Theme.palette.secondary.main }}>
          {icon}
        </Avatar>
        <Typography component="h1" variant="h5">
          {name}
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          {children}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, bgcolor: Theme.palette.primary.dark }}
          >
            {name}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
