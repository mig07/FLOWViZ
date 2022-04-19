import * as React from 'react';
import {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';


export default function Library(props) {

    const theme = createTheme()
    let { libraryName } = useParams();
    const uri = `${props.config.appProtocol}://${props.config.address}:${props.config.port}/library/${libraryName}`

    // Library state hook
    const [lib, setLib] = useState({})
    
    useEffect(()=>{
        fetch(uri)
          .then(response => response.json())
          .then(setLib);
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <Typography variant='h3' marginTop={5} align='left'>{lib.name}</Typography>
            <Typography variant='body1' marginTop={5} align='left'>{lib.description}</Typography>
            <Typography variant='h5' marginTop={5} align='left'>Type: { lib.library ? "Library" : "API" }</Typography>
        </ThemeProvider>
    )
}