import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardActions } from "@mui/material";
import { Typography } from "@material-ui/core";
import { Button } from "@material-ui/core";

export default function FeaturedCard(props) {

    const navigate = useNavigate()

    return (
        <Card>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {props.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {props.description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button
                onClick={() => navigate(props.buttonUrl)} 
                size="small">
                    {props.buttonText}
                </Button>
            </CardActions>
        </Card>
    )
}