import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import { styled } from '@mui/material/styles';
import { Box, Button } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import FeaturedCard from './featuredCard';
import heroBackground from '../../../public/assets/heroBackground.jpg'

const styles = {
    paperContainer: {
        height: 350,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url(${heroBackground})`
    }
};

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

export default function Hero() {
    return (
        <Paper style={styles.paperContainer}>                    
            <Box sx={{m: 5, direction: 'column', justifyContent: 'center'}}>
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