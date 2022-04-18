import * as React from 'react';
import {useState, useEffect} from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ToolCard from '../component/toolCard'
import { createTheme, ThemeProvider } from '@mui/material/styles';


export default function Library(props) {

    const theme = createTheme()
    const library = props.libraryName
    const uri = `${props.config.appProtocol}://${props.config.address}:${props.config.port}/library/${library}`

    // Library state hook
    const [list, setList] = useState(null)
    
    useEffect(()=>{
        fetch(uri)
          .then(response => response.json())
          .then(setList);
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <Typography variant='h3' marginTop={5} align='left'>{library}</Typography>
            <div align='center'>
                
            </div>
        </ThemeProvider>
    )
}