import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';


export default function ToolCard(props) {
  const navigate = useNavigate()
  return (
    <Card sx={{ width: 350 }}>
      <CardActionArea onClick={ () => navigate(props.name)}>
        <CardContent>
          <Typography variant="h5" component="div">
              {props.name}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {props.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
