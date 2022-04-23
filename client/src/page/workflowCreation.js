import * as React from 'react';
import {useState, useEffect} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import StepCard from '../component/workflow/stepCard';
import { Container } from '@mui/material';
import { Divider } from '@mui/material';

const style = {
    Container: {
        alignItems: "center",
        justifyContent: "center"
    }
}

export default function WorkflowCreation() {

    const [steps, setSteps] = React.useState(1)
    const [tools, setTools] = React.useState([]);

    useEffect(()=>{
        fetch('')
          .then(response => response.json())
          .then(setTools);
    }, []);

    return (
        <React.Fragment>
        <CssBaseline />
            <Container>
                <Container maxWidth="lg" alignItems="center" justifyContent="center" sx={{m: 5}}>
                    <StepCard tools={tools}/>
                </Container>
            </Container>
            <Divider />
        </React.Fragment>
    ); 
}