import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';
import { Box } from '@mui/system';

export default function ToolFunctions(props) {

    return (
        <>
            <Typography variant='h5' marginTop={5} align='left'>Arguments</Typography>
            <Divider />
            <Box sx={{mt: 2}}>
                { props.tool.library.arguments.map(argument => {
                    return (<Typography variant='body1' align='left'>{props.tool.library.name} {argument.name} [options]</Typography>)
                })}
            </Box>                
            <Typography variant='h5' marginTop={5} align='left'>Options</Typography>
            <Divider />
            <Box sx={{mt: 2}}>
                { props.tool.library.options.map(option => {
                    return (<Typography variant='body1' align='left'>{option.name}</Typography>)
                })}
            </Box>            
        </> 
    )
}