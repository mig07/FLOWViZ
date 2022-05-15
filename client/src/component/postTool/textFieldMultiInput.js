import * as React from "react";
import { Box, Container, Stack, TextField, Chip } from "@mui/material";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

function TextFieldMultiInput(props) {
  const name = props.name;
  const label = props.label;
  const collection = props.data
  const onParentUpdate = props.onParentUpdate

  const [input, setInput] = React.useState("");

  const onSetInput = (event) => {
    const value = event.target.value;
    setInput(value);
  };

  const onAddElement = () => {
    const hasChip = collection.find((chip) => chip === input);
    if (!hasChip) {      
      let col = collection
      col.push(input)
      onParentUpdate(col)
      setInput("")
    }
  };

  const onRemoveElement = (deletingChip) => () => {
    let col = collection
    col.filter(chip => chip !== deletingChip)
    onParentUpdate(col)
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
        {collection && collection.length > 0 ? (
          <Stack direction="row" spacing={1}>
            {collection.map((chip) => {
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