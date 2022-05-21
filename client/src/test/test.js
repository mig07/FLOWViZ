import * as React from "react";
import {
  FormControl,
  Select,
  MenuItem,
  Container,
  Button,
} from "@mui/material";

const data = ["test1", "test2", "test3"];

const data1 = ["test4", "test5", "test6"];

const data2 = ["test7", "test8", "test9"];

function FormGroup({ tool, forms }) {
  console.log(forms);
  return (
    <>
      {forms.map((f) => {
        return <Form key={f.id} id={f.id} label={f.label} data={f.data} />;
      })}
    </>
  );
}

function Form({ id, label, data }) {
  return (
    <FormControl fullWidth>
      <Select id={id} label={label}>
        {data.map((elem, i) => {
          return (
            <MenuItem key={i} value={elem}>
              {elem}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}

export default function Test({ config }) {
  const [tool, setTool] = React.useState(null);

  const [forms, setForms] = React.useState([]);

  React.useEffect(() => {
    fetch(
      `${config.appProtocol}://${config.address}:${config.port}/library/Phylolib`
    )
      .then((response) => response.json())
      .then((response) => {
        const commands = response.library.commandGroups[0].commands.map(
          (cmd) => cmd.name
        );
        const initialValue = {
          id: 0,
          label: "Commands",
          currentValue: "",
          data: commands,
        };
        setForms(initialValue);
      })
      .then(setTool);
  }, []);

  return (
    <Container maxWidth="xs">
      <FormGroup tool={tool} forms={forms} />
    </Container>
  );
}
