import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import { Box, Button } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import heroBackground from '../../images/heroBackground.jpg'

const styles = {
    paperContainer: {
        height: 350,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url(${heroBackground})`
    }
};

export default function Hero() {
    return (
        <Paper style={styles.paperContainer}>                    
            <Box sx={{p: 2, direction: 'column', justifyContent: 'center'}}>
                <Typography variant='h2'>
                    FLOWViZ
                </Typography>
                <Typography variant='h4'>
                    Build and execute your custom workflows
                </Typography>
                <Button variant='contained'>
                    Learn more
                </Button>
            </Box>
        </Paper>
    )
  }