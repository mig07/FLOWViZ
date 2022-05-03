import { useState, useEffect, useCallback } from 'react';
import { Handle, Position } from 'react-flow-renderer';
import config from '../../config/dev-config.json'
import { Button, Container, Typography, TextField } from '@mui/material';
import './toolNode.css';

export default function ToolNode({ data }) {

    const serverConf = config.server
    const uri = `${serverConf.appProtocol}://${serverConf.address}:${serverConf.port}/library/${data.label}`

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

    useEffect(()=>{
        fetch(uri)
          .then(response => response.json())
          .then(setTool);
    }, []);

    const librarySetup = () => {

    }    

    const apiSetup = () => {

    }

    const onChange = useCallback((evt) => {
        console.log(evt.target.value);
    }, []);

    return (
        <div className="tool-node">
            <Handle position={Position.Top} />
            <Container>
                <Typography variant='h6'>{tool.name} Node</Typography>                
                <TextField id="standard-basic" label="Step name" variant="outlined"/>
                <Typography variant='body1'>Setup</Typography>
                <Container>
                    <Button onClick={() => apiSetup() }>
                        API
                    </Button>
                    <Button onClick={() => librarySetup() }>
                        Library
                    </Button>
                </Container>
            </Container>
            <Handle position={Position.Bottom} />      
        </div>
    );
}