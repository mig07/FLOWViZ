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
  const [input, setInput] = React.useState("");
  const [chips, setChips] = React.useState([]);

  const onSetInput = React.useCallback((event) => {
    const value = event.target.value;
    setInput(value);
  });

  const onAddElement = (event) => {
    const inp = input;
    event.preventDefault;
    setInput("");
    const hasChip = data.find((chip) => chip === inp);
    if (!hasChip) {
      setChips([...chips, inp]);
      let col = data;
      col.push(inp);
      onParentUpdate(col);
    }
  };

  const onRemoveElement = (deletingChip) => {
    let col = data.filter((chip) => chip !== deletingChip);
    onParentUpdate(col);
    setChips((chips) => chips.filter((chip) => chip !== deletingChip));
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
                  onDelete={() => onRemoveElement(chip)}
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
