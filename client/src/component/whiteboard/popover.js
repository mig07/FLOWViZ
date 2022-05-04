import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { 
    Button,
    Popover,
    Grid
} from '@mui/material';
import Command from './command';

export default function PopoverButton(props) {
    
    const tool = props.tool
    const commandGroups = tool.library.commandGroups

    const [popper, setPopper] = React.useState(null);

    const onOpen = (event) => {
        setPopper(popper ? null : event.currentTarget);
    };

    const onClose = () => {
        setPopper(null);
    };

    const open = Boolean(popper);
    const id = open ? `${props.type}-popover` : undefined;

    const librarySetup = () => {
        return (
            <div>
                <Popover id={id} 
                anchorEl={popper}
                open={open}
                onClose={onClose}
                anchorOrigin={{vertical: 'bottom'}}
                width='flex'>
                    <Grid container padding={2}>     
                        <Command commandGroups={commandGroups}/>                        
                    </Grid>                    
                </Popover>
            </div>
        )
    }

    const apiSetup = () => {
        //TODO
    }

    const getSetupType = () => {
        switch(props.type) {
            case 'api':
                return apiSetup();
            case 'library':
                return librarySetup();
        }
    }

    return (
        <>
            <Button onClick={onOpen}>
                { props.type }
            </Button>
            { getSetupType() }
        </>
    )
}