import * as React from "react";
import Typography from "@mui/material/Typography";
import { Box, Divider } from "@mui/material";

export default function Api({ endpoints }) {
  const noApi = (
    <Typography variant="body1" marginTop={5} align="left">
      No available API.
    </Typography>
  );

  // Sort endpoints by method
  const sortedEndpoints = React.useCallback(
    endpoints.sort((a, b) => {
      a = a.method.toLowerCase();
      b = b.method.toLowerCase();

      return a < b ? -1 : a > b ? 1 : 0;
    })
  );

  const availableApi = sortedEndpoints.map((endpoint) => (
    <Box key={endpoint.name} sx={{ mt: 2 }}>
      <Typography variant="body1">Method: {endpoint.method}</Typography>
      <Typography variant="body1">Name: {endpoint.name}</Typography>
      <Typography variant="body1">
        Description: {endpoint.description}
      </Typography>
      <Typography sx={{ mb: 2 }} variant="body1">
        Path: {endpoint.path}
      </Typography>
      <Divider />
    </Box>
  ));

  return (
    <>
      <Typography variant="h4" marginTop={5} align="left">
        Endpoints
      </Typography>
      <Divider />
      {!endpoints || endpoints.length == 0 ? noApi : availableApi}
    </>
  );
}
