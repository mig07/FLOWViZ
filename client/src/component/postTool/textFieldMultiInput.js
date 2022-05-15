import * as React from "react";
import { Box, Container, Stack, TextField, Chip } from "@mui/material";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

function TextFieldMultiInput(props) {
  const name = props.name;
  const label = props.label;
  const onUpdateParent = props.onUpdateParent

  const [input, setInput] = React.useState("");
  const [chips, setChips] = React.useState([]);

  const onSetInput = (event) => {
    const value = event.target.value;
    setInput(value);
  };

  const onAddElement = () => {
    const hasChip = chips.find((chip) => chip === input);
    if (!hasChip) {      
      setChips([...chips, input]);
      setInput("")
      onUpdateParent(chips)
    }
  };

  const onRemoveElement = (deletingChip) => () => {
    setChips((chips) => chips.filter(chip => chip !== deletingChip));
    onUpdateParent(chips)
  };

  return (
    <>
      <Box display="flex" alignItems="center">
        <TextField
          margin="normal"
          autoFocus={false}
          id={name}
          name={name}
          label={label}
          value={input}
          onChange={onSetInput}
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

export default React.memo(TextFieldMultiInput)