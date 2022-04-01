import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function ToolCard(props) {
  return (
    <Card sx={{ width: 350 }}>
      <CardContent>
        <Typography variant="h5" component="div">
            {props.name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {props.description}
        </Typography>
      </CardContent>
    </Card>
  );
}
