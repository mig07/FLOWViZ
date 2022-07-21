import * as React from "react";
import { useState } from "react";
import { Stack, Typography, TextField, Box } from "@mui/material";
import { Container } from "@mui/material";
import Endpoint from "./endpoint";
import onArrayCountUpdate from "./util";

export default function Endpoints({
  data = {},
  api,
  onApiUpdate = () => {},
  generateEndpoint,
}) {
  const endpoints = data;

  const [count, setCount] = useState(1);

  const onEndpointsCountUpdate = (event) => {
    onArrayCountUpdate(
      event,
      api,
      count,
      onApiUpdate,
      setCount,
      generateEndpoint
    );
  };

  const onEndpointUpdate = (index, endpoint) => {
    let endpoints = { ...api };
    endpoints[index] = endpoint;
    onApiUpdate(endpoints);
  };

  return (
    <Container sx={{ w: "100%" }}>
      <Stack spacing={2}>
        <Box display="flex" alignItems="center" justifyContent="center">
          <Typography variant="h6" sx={{ mr: 2 }}>
            Number of Endpoints
          </Typography>
          <TextField
            margin="normal"
            type="number"
            InputProps={{ inputProps: { min: 1, max: 10 } }}
            defaultValue={count}
            onChange={onEndpointsCountUpdate}
          />
        </Box>
        <Container sx={{ mt: 2 }}>
          {endpoints.map((endpoint, index) => (
            <Endpoint key={`endpoint-${index}`} data={endpoint} index={index} />
          ))}
        </Container>
      </Stack>
    </Container>
  );
}
