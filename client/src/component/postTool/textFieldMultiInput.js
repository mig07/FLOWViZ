import * as React from "react";
import { Box, Container, Stack, TextField, Chip } from "@mui/material";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import TextFieldWithTooltip from "../common/textFieldWithTooltip";

function TextFieldMultiInput({
  name = "",
  label = "",
  data = [],
  tooltip,
  onParentUpdate = () => {},
}) {
  const collection = data;

  const [input, setInput] = React.useState("");
  const [chips, setChips] = React.useState([]);

  const onSetInput = (event) => {
    const value = event.target.value;
    setInput(value);
  };

  const onAddElement = () => {
    const hasChip = collection.find((chip) => chip === input);
    if (!hasChip) {
      setChips([...chips, input]);
      let col = collection;
      col.push(input);
      onParentUpdate(col);
      setInput("");
    }
  };

  const onRemoveElement = (deletingChip) => () => {
    setChips((chips) => chips.filter((chip) => chip !== deletingChip));
    let col = collection.filter((chip) => chip !== deletingChip);
    onParentUpdate(col);
  };

  return (
    <>
      <Box display="flex" alignItems="center">
        <TextFieldWithTooltip
          id={name}
          label={label}
          value={input}
          onChange={onSetInput}
          tooltip={tooltip}
        />
        <IconButton onClick={onAddElement}>
          <AddIcon />
        </IconButton>
      </Box>
      <Container>
        {chips && chips.length > 0 ? (
          <Stack direction="row" spacing={1}>
            {chips.map((chip) => {
              return (
                <Chip
                  key={chip}
                  label={chip}
                  variant="outlined"
                  onDelete={onRemoveElement(chip)}
                />
              );
            })}
          </Stack>
        ) : (
          <></>
        )}
      </Container>
    </>
  );
}

export default TextFieldMultiInput;
