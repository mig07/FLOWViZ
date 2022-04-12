import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

export const Theme = createTheme({
    palette: {
        primary: {
            main: '#37c0fb',
            light: '#5FCCFB',
            dark: '#2686AF',
        },
        secondary: {
            main: '#FB7237',
            light: '#FB8E5F',
            dark: '#AF4F26'
        },
        light: {
            background: {
                main: '#fafafa',
                paper: '#fff'
            },
        },
        dark: {
            background: {
                main: '#303030',
                paper: '#424242'
            }
        }
    },
  });

export default Theme;