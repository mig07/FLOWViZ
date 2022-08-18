import TextFieldWithTooltip from "../../../common/textFieldWithTooltip";
import * as React from "react";
import { useState } from "react";
import { Container, Chip, Grid, IconButton, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ChipContainer from "../../../common/chipContainer";

export default function Input() {
  const [inputKey, setInputKey] = useState("");
  const [inputValue, setInputValue] = useState("");

  const [inputs, setInputs] = React.useState([]);

  const onAddElement = () => {
    const hasChip = inputs.find((input) => input === inputValue);
    if (!hasChip) {
      setInputs([...inputs, inputKey]);
    }
  };

  const onRemoveElement = (deletingInput) => () => {
    setInputs((inputs) => inputs.filter((input) => input !== deletingInput));
  };

  return (
    <>
      <Grid container>
        <Grid item xs={10}>
          <Stack>
            <TextFieldWithTooltip
              id="str-text-field-input-key"
              label="Input key"
              defaultValue={inputKey}
              onChange={(event) => setInputKey(event.target.value)}
              tooltip="The input variable key to assign a task input."
            />
            <TextFieldWithTooltip
              id="str-text-field-input-value"
              label="Input value"
              defaultValue={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              tooltip="The input variable value to assign a value to the key variable."
            />
          </Stack>
        </Grid>
        <Grid item xs={2}>
          <IconButton>
            <AddIcon onClick={() => onAddElement()} />
          </IconButton>
        </Grid>
      </Grid>
      <ChipContainer chips={inputs} onRemoveChip={onRemoveElement} />
    </>
  );
}
