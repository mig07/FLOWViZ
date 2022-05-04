import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { Handle, Position } from 'react-flow-renderer';
import config from '../../config/dev-config.json'
import { Button, Container, Typography, TextField, Popover, Box } from '@mui/material';
import PopoverButton from './popover';
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

    return (
        <div className="tool-node">
            <Handle position={Position.Top} />
            <Container>
                <Typography variant='h6'>{tool.name} Node</Typography>                
                <TextField id="standard-basic" label="Step name" variant="outlined"/>
                <Typography variant='body1'>Setup</Typography>
                <Container>
                    <PopoverButton type="api" tool={tool} width={250}/>
                    <PopoverButton type="library" tool={tool} width={250}/>
                </Container>
            </Container>
            <Handle position={Position.Bottom} />      
        </div>
    );
}