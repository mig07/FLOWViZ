import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { 
    Typography,
    Divider,
    Card,
    Box
} from '@mui/material';
import './toolNode.css';
import CmdSelector from './cmdSelector';

export default function Command(props) {
        
    const commandGroups = props.commandGroups
    const firstCommandGroup = commandGroups.find((commandGroup) => 
        commandGroup.order == 0
    )
    const firstCommandGroupName = firstCommandGroup.groupName
    const firstCommandGroupCmdNames = firstCommandGroup.commands.map(command => command.name)

    const [command, setCommand] = React.useState({
        "name": "",
        "allowedValues": [],
        "allowedCommandSets": [],
        "selectedAllowedValue": "",
        "selectedCommandSet": ""
    });

    const onCommandSelectChange = (event) => {
        const commandName = event.target.value

        const selectedCmd = firstCommandGroup
                .commands
                .find(command => command.name === commandName)  


        const allowedValues = [...selectedCmd.allowedValues]
        const allowedCommandSets = [...selectedCmd.allowedCommandSets]

        setCommand({
                "name": commandName,
                "allowedValues": allowedValues,
                "allowedCommandSets": allowedCommandSets
        })
    };    

    const onCommandValueSelectChange = (event) => {
        const commandValueName = event.target.value
        let cmd = command
        cmd.selectedAllowedValue = commandValueName
        setCommand(cmd)
    }

    const onCommandSetSelectChange = (event) => {
        const commandSetName = event.target.value
        let cmd = command
        cmd.selectedCommandSet = commandSetName
        setCommand(cmd)
    }

    return (
        <Box width={500}>
            <Box mb={2}>
                <Typography variant='h6'>Commands</Typography>
                <Divider />
            </Box>
            <Card variant='outlined' sx={{p: 2}}>
                <CmdSelector 
                    id="cmd"
                    collection={firstCommandGroupCmdNames}
                    selectedElem={command.name}
                    cb={onCommandSelectChange}
                    label={firstCommandGroupName}
                />
                <CmdSelector
                    id="cmd-allowed-values"
                    collection={command.allowedValues}
                    selectedElem={command.selectedAllowedValue}
                    cb={onCommandValueSelectChange}
                    label="Allowed command values"
                />
                <CmdSelector
                    id="cmd-set"
                    collection={command.allowedCommandSets}
                    selectedElem={command.selectedCommandSet}
                    cb={onCommandSetSelectChange}
                    label="Allowed following command sets"
                />               
                
            </Card>         
        </Box>
    )
}