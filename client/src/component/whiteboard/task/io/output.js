import { Grid, IconButton, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import * as React from "react";
import { useState } from "react";
import TextFieldWithTooltip from "../../../common/textFieldWithTooltip";
import ChipContainer from "../../../common/chipContainer";

export default function Output() {
  const [outputKey, setOutputKey] = useState("");

  const [outputs, setOutputs] = React.useState([]);

  const onAddElement = () => {
    const hasChip = outputs.find((output) => output === outputKey);
    if (!hasChip) {
      setOutputs([...outputs, outputKey]);
    }
  };

  const onRemoveElement = (deletingOutput) => () => {
    setOutputs((outputs) =>
      outputs.filter((output) => output !== deletingOutput)
    );
  };

  return (
    <Grid container>
      <Grid item xs={10}>
        <Stack>
          <TextFieldWithTooltip
            id="str-text-field-output-key"
            label="Output key"
            defaultValue={outputKey}
            onChange={(event) => setOutputKey(event.target.value)}
            tooltip="The output key variable to assign the output of this task. This key will be used by the next task to get the result of this one."
          />
        </Stack>
      </Grid>
      <Grid item xs={2}>
        <IconButton>
          <AddIcon onClick={() => onAddElement()} />
        </IconButton>
      </Grid>
      <ChipContainer chips={outputs} onRemoveChip={onRemoveElement} />
    </Grid>
  );
}
