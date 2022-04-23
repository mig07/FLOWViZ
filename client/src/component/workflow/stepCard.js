import * as React from 'react';
import { Card, CardContent, Box, Container } from "@mui/material";
import { Button } from '@mui/material';
import { TextField } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { IconButton } from '@mui/material';
import { Select } from '@mui/material';
import { Grid } from '@mui/material';

export default function StepCard(props) {

    const [tool, setTool] = React.useState([]);

    const onToolChange = (event) => {
      setTool(event.target.value);
    };
  
    return (
        <Grid container direction="column" item xs={4} align="center">
            <Grid item justify="center">
                <Card sx={{width: 300}}>
                    <CardContent>
                        <TextField sx={{width: "100%"}} id="step-title" label="Title" variant="standard" />
                        <Select
                            sx={{width: "100%", mt: 5}}
                            labelId="tool-selector"
                            id="tool-selector"
                            value={ tool }
                            onChange={ onToolChange }
                            label="Phylogenetic tool"
                        >                    
                        </Select>
                    </CardContent>            
                </Card>            
            </Grid>
            <Grid item direction="column" justify="center" >
                <IconButton aria-label="delete" alignItems="center">
                    <AddCircleIcon />
                </IconButton>
            </Grid>            
        </Grid>
    )
}