import * as React from "react";
import {
  Box,
  TextField,
  Typography,
  Container,
  Stack,
  Divider,
} from "@mui/material";

export default function AccordionGroup({ stackLabel = "", counterLabel = 0, minValue = 1, initialGroupState = {}, onAddAccordion = () => { }, onCounterChange = () => { } }) {
  const [counter, setCounter] = React.useState(1);
  const [groups, setGroups] = React.useState([initialGroupState]);

  const onValueChange = (event) => {
    const value = Number(event.target.value);

    // Don't allow numbers inferior to minValue
    if (value < minValue) return;

    setCounter(value);
    {
      () => onCounterChange(value);
    }

    // On group increase
    if (value > counter) {
      setGroups((oldGroups) => [...oldGroups, initialGroupState]);
    }

    // On group decrease
    if (value < counter) {
      let gs = groups;
      gs.pop();
      setGroups(gs);
    }
  };

  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="center">
        <Typography variant="h6" sx={{ mr: 2 }}>
          {counterLabel}
        </Typography>
        <TextField
          margin="normal"
          type="number"
          InputProps={{ inputProps: { min: minValue } }}
          defaultValue={counter}
          onChange={onValueChange}
        />
      </Box>
      <Typography variant="h6">{stackLabel}</Typography>
      <Divider />
      <Container sx={{ mt: 2 }}>
        {groups.map((group, index) => onAddAccordion(group, index))}
      </Container>
    </>
  );
}
