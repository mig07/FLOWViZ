import * as React from 'react';
import Hero from '../component/home/hero';
import FeaturedCardGrid from '../component/home/featuredCardGrid';
import { Box } from '@material-ui/core';
import { Container } from '@material-ui/core';
import { createTheme } from '@mui/material/styles';

const theme = createTheme();

export default function Home() {
    return (
        <Container maxWidth="xl">
            <Box sx={{m: 5}}>
                <Hero />
                <FeaturedCardGrid />
            </Box>        
        </Container>
    )
}