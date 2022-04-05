import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import { Box, Button } from '@material-ui/core';

export default function Hero() {
    return (
        <Card sx={{display: 'static'}}>
            <CardContent sx={{ flex: 1}}>
                <Box>
                    <Typography variant="h1">
                        FLOWViZ
                    </Typography>
                    <Typography variant="h5">
                        Build your phylogenetic workflows, using our tools or yours. 
                        You choose!
                    </Typography>
                    <Button
                        variant="contained"
                        key={"Start Here!"}
                        onClick={() => { } }>
                        {"Start Here"}
                    </Button>
                </Box>
            </CardContent>                         
        </Card>
    )
  }