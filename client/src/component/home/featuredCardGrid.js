import * as React from 'react';
import { Grid } from '@material-ui/core';
import { Box } from '@material-ui/core';
import FeaturedCard from './featuredCard';

export default function FeaturedCardGrid() {
    return (
        <Box sx={{mt: 2}}>
            <Grid container spacing={5}>
                <Grid item xs={4}>
                    <FeaturedCard 
                        title="Templated workflows" 
                        description="Use the available provided tools to build workflows."
                        buttonText="Learn more"
                    />
                </Grid>
                <Grid item xs={4}>
                    <FeaturedCard 
                        title="Custom workflows" 
                        description="Provide new tools to build 
                        your custom workflow, along with the available ones."
                        buttonText="Learn more"
                        buttonUrl="/whiteboard"
                    />
                </Grid>
                <Grid item xs={4}>
                    <FeaturedCard 
                        title="What we have" 
                        description="Check the documentation to see the available tools."
                        buttonText="Learn more"
                        buttonUrl="/documentation"
                    />
                </Grid>
            </Grid>                    
        </Box>
    )
}