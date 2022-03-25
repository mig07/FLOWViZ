import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';

export default class Hero extends React.Component {
    render() {
        return (
            <Card sx={{ display: 'flex' , textAlign: "center"}}>
                <CardContent sx={{ flex: 1 }}>
                    <Typography variant="h1">
                        FLOWViZ
                    </Typography>                            
                </CardContent>                         
              </Card>
        )
    }
  }