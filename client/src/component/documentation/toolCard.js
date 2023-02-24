import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ToolCard({ name, description, type, url }) {
  const navigate = useNavigate();
  return (
    <Card sx={{ width: 350 }}>
      <CardActionArea onClick={() => navigate(name)}>
        <CardContent>
          <Typography variant="button" color="text.secondary">
            {type}
          </Typography>
          <Typography sx={{ mb: 1 }} variant="h6" component="div">
            {name}
          </Typography>
          <Typography>{description}</Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {type === "library" ? "Docker URL:" : "URL:"} {url}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
