import * as React from 'react';
import {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { Container } from '@material-ui/core';
import { Toolbar } from '@mui/material';
import ToolTitle from '../component/documentation/toolTitle';
import ToolFunctions from '../component/documentation/toolFunctions';


export default function Library(props) {

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
        <Container>                
            <Toolbar />
            <ToolTitle tool={tool}/>
            <ToolFunctions tool={tool}/>
        </Container>
    )
}