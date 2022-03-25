import * as React from 'react';
import NavBar from '../component/home/navBar';
import Hero from '../component/home/hero';
import { Container } from '@material-ui/core';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

export default function Home() {
    return (
        <>
            <Hero/>
        </>
    )
}