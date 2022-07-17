import { Grid, Toolbar } from "@mui/material";
import Typography from "@mui/material/Typography";
import * as React from "react";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";

export default function Submission({
  text,
  Icon = FactCheckOutlinedIcon,
  redirectPage = "",
}) {
  return (
    <>
      <Toolbar />
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Grid item sx={{ p: 2 }}>
          <Typography variant="h2">{text}</Typography>
        </Grid>
        <Grid item sx={{ mt: 3 }}>
          <Icon fontSize="large" />
        </Grid>
        <Grid item sx={{ mt: 3 }}>
          {!redirectPage && redirectPage === "" ? (
            <></>
          ) : (
            <>
              <Typography variant="h6">Go to: {redirectPage}</Typography>
            </>
          )}
        </Grid>
      </Grid>
    </>
  );
}
