import TextFieldWithTooltip from "../../../common/textFieldWithTooltip";
import * as React from "react";
import { useState } from "react";
import { Container, Chip, Grid, IconButton, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ChipContainer from "../../../common/chipContainer";

export default function VariableContainer({
  id,
  keyTooltip,
  valueTooltip,
  collection,
  collectionSetter,
  onAddElement,
  onRemoveElement,
}) {
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");

  return (
    <>
      <Grid
        container
        spacing={1}
        direction="row"
        alignItems="center"
        justifyContent="center"
      >
        <Grid item xs={10}>
          <Stack>
            <TextFieldWithTooltip
              id={`str-text-field-${id}-key`}
              label={`${id} key`}
              defaultValue={key}
              onChange={(event) => setKey(event.target.value)}
              tooltip={keyTooltip}
            />
            <TextFieldWithTooltip
              id={`str-text-field-${id}-value`}
              label={`${id} value`}
              defaultValue={value}
              onChange={(event) => setValue(event.target.value)}
              tooltip={valueTooltip}
            />
          </Stack>
        </Grid>
        <Grid item xs={2}>
          <IconButton>
            <AddIcon
              onClick={() =>
                onAddElement(
                  collection,
                  { key: key, value: value },
                  collectionSetter
                )
              }
            />
          </IconButton>
        </Grid>
      </Grid>
      <ChipContainer
        chips={collection.map((elem) => elem.key)}
        onRemoveChip={(key) => onRemoveElement(key, collectionSetter)}
      />
    </>
  );
}
