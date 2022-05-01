import * as React from 'react';
import {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { Container } from '@material-ui/core';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ToolTitle from '../component/documentation/toolTitle';
import ToolFunctions from '../component/documentation/toolFunctions';


export default function Library(props) {

    const theme = createTheme()
    let { libraryName } = useParams();
    const uri = `${props.config.appProtocol}://${props.config.address}:${props.config.port}/library/${libraryName}`

    // Library state hook
    const [tool, setTool] = useState({ 
        name: "",
        description: "",
        library: { 
            name: "",
            commandGroups: [],
        },
        api: []
    })
    
    useEffect(() => {
        fetch(uri)
            .then(response => response.json())
            .then(setTool)
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <Container>                
                <ToolTitle tool={tool}/>
                <ToolFunctions tool={tool}/>
            </Container>
        </ThemeProvider>
    )
}