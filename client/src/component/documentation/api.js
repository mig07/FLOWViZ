import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';
import { Box } from '@mui/system';

export default function Api(props) {

    const api = props.api

    const noApi = (        
        <Typography variant='body1' marginTop={5} align='left'>No available API.</Typography>
    )

    //TODO
    const availableApi = (
        <></>
    )

    return (
        <>
            <Typography variant='h4' marginTop={5} align='left'>API</Typography>
            <Divider />
            { !api ? noApi : availableApi}
        </>  
    )
}

function isEmpty(array) {
    return !array || array.length == 0
}