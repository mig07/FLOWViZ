import * as React from "react";
import { Container, Chip, Grid, IconButton, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function ChipContainer({ chips, onRemoveChip }) {
  return (
    <Container>
      {chips && chips.length > 0 ? (
        <Stack direction="row" spacing={1}>
          {chips.map((chip) => {
            return (
              <Chip
                key={chip}
                label={chip}
                variant="outlined"
                onDelete={onRemoveChip(chip)}
              />
            );
          })}
        </Stack>
      ) : (
        <></>
      )}
    </Container>
  );
}
