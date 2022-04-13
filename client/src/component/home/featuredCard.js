import * as React from 'react';
import { Card, CardContent, CardActions } from "@mui/material";
import { Typography } from "@material-ui/core";
import { Button } from "@material-ui/core";

export default function FeaturedCard(props) {
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
                <Button size="small">{props.buttonText}</Button>
            </CardActions>
        </Card>
    )
}