import * as React from 'react';
import { FormControl, Select, MenuItem, Container, Button } from '@mui/material';

const data = [
    "test1",
    "test2",
    "test3",
]

const data1 = [
    "test4",
    "test5",
    "test6",
]

const data2 = [
    "test7",
    "test8",
    "test9",
]

function FormGroup() {

    const [forms, setForms] = React.useState([
        {
            id: 0,
            label: "test form",
            data: data
        }
    ])

    const onAddForm = (id, label, data) => {
        if (forms.find(form => form.id === id || form.label === label))
            return
        setForms([...forms, { id: id, label: label, data: data }])
    }

    const onRemoveForm = (id) => {
        setForms(forms => forms.filter(form => form.id !== id))
    }

    const onFormUpdate = (event) => {

    }

    return (
        <>
            {forms.map(f => {
                return (<Form key={f.id} id={f.id} label={f.label} data={f.data} />)
            })}
            <Button onClick={() => {onAddForm(forms.length, `test form ${forms.length}`, data1)}}>Add Form</Button>
        </>
    )

}

function Form({ id, label, data }) {
    return (
        <FormControl fullWidth>
            <Select
                id={id}
                label={label}
            >
                {data.map((elem, i) => {
                    return (
                        <MenuItem key={i} value={elem}>
                            {elem}
                        </MenuItem>
                    );
                })}
            </Select>
        </FormControl>
    )
}

export default function Test() {
    return (
        <Container maxWidth="xs">
            <FormGroup />
        </Container>
    )
}