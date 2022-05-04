import * as React from 'react';
import { Select, MenuItem, InputLabel, FormControl, IconButton, Box, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import './toolNode.css';

export default function CmdSelector(props) {
    
    const id = props.id
    const labelId = `${id}-label`
    const collection = props.collection
    const selectedElem = props.selectedElem
    const cb = props.cb
    const label = props.label

    return collection && collection.length > 0 
        ?
        <FormControl fullWidth sx={{mt: 2}}>
            <InputLabel id={labelId}>{label}</InputLabel>
            <Grid container alignItems="center" justifyContent="center" columns={16}>
                <Grid item xs={12}>
                    <Select
                        fullWidth
                        labelId={labelId}
                        id={id}
                        value={selectedElem}
                        onChange={cb}
                        label={label}
                    >
                    { collection.map(elem => {
                        return (
                            <MenuItem
                                key={elem}
                                value={elem}
                            >
                            { elem }
                            </MenuItem>
                        )
                    }
                    )}            
                    </Select>                    
                </Grid>
                <Grid item xs={4}>
                    <IconButton>
                        <RemoveIcon />
                    </IconButton>
                    <IconButton>
                        <AddIcon />
                    </IconButton>                             

                </Grid>
            </Grid>
        </FormControl>
        :
        <></>
}