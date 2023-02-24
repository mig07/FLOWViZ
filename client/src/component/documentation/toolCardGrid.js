import Grid from "@mui/material/Grid";
import * as React from "react";
import { Box, Typography } from "@mui/material";
import ToolCard from "./toolCard";

export default function ToolCardGrid(tools) {
  return !tools || tools.length === 0 ? (
    <Box sx={{ m: 3 }}>
      <Typography variant="overline">No tools available</Typography>
    </Box>
  ) : (
    <div align="center">
      <Grid container item marginTop={5} justifyContent="center" spacing={3}>
        {tools.map((tool) => {
          const name = tool.name;
          return (
            <Grid key={name} item>
              <ToolCard
                key={name}
                name={name}
                description={tool.description}
                type={tool.type}
                url={tool.url}
              />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}
