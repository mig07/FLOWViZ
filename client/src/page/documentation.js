import * as React from 'react';
import {useState, useEffect} from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ToolCard from '../component/toolCard'
import { createTheme, ThemeProvider } from '@mui/material/styles';


export default function Documentation(props) {

    const uri = `${props.config.appProtocol}://${props.config.address}:${props.config.port}/library`

    // Libraries and APIs state hook
    const [list, setList] = useState([])
    
    useEffect(()=>{
        fetch(uri)
          .then(response => response.json())
          .then(setList);
    }, []);

    console.log(list)

    return (
        <>
            <Typography variant='h3' marginTop={5} align='center'>Available Libraries</Typography>
            <div align='center'>
                <Grid container item  marginTop={5} justifyContent="center" spacing={3}>
                    {list.map(item => { 
                        const name = item.name;
                        const description = item.description;
                        return (
                            <Grid key={name} item>
                                <ToolCard name={name} description={description} />
                            </Grid>
                        );
                    })}
                </Grid>
            </div>
            <Typography variant='h3' marginTop={5} align='center'>Available APIs</Typography>
        </>        
    )
}