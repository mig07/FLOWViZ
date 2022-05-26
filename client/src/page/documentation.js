import { Toolbar } from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import * as React from "react";
import ToolCard from "../component/documentation/toolCard";
import Tools from "../model/tools";

export default function Documentation(props) {
  return (
    <>
      <Toolbar />
      <Typography variant="h3" align="center">
        Available Libraries
      </Typography>
      <Tools config={props.config}>
        {(list) => {
          return (
            <div align="center">
              <Grid
                container
                item
                marginTop={5}
                justifyContent="center"
                spacing={3}
              >
                {list.map((item) => {
                  const name = item.name;
                  const description = item.description;
                  return (
                    <Grid key={name} item>
                      <ToolCard name={name} description={description} />
                    </Grid>
                  );
                })}
              </Grid>
            </div>
          );
        }}
      </Tools>
      <Typography variant="h3" marginTop={5} align="center">
        Available APIs
      </Typography>
    </>
  );
}
