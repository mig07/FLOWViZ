import * as React from "react";
import Hero from "../component/home/hero";
import FeaturedCardGrid from "../component/home/featuredCardGrid";
import { Box } from "@material-ui/core";
import { Container } from "@material-ui/core";
import { Toolbar } from "@mui/material";

export default function Home() {
  return (
    <>
      <Toolbar />
      <Container maxWidth="lg">
        <Box>
          <Hero />
          <FeaturedCardGrid />
        </Box>
      </Container>
    </>
  );
}
