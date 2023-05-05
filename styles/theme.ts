import { createTheme, styled, Typography } from '@mui/material';

type ColorsProps = {
  first: string;
  second: string;
  third: string;
  fourth: string; 
}

export const colors: ColorsProps = {
  first: '#D8F508', // yellow
  second: '#9BBABB', // blue
  third: '#111F22', // dark blus
  fourth: '#D7D2BF', // light
  
}


export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#D8F508', // yellow
      contrastText: '#F0F3EB'
    },
    secondary: {
      main: '#9BBABB', // blue
      contrastText: '#fff',
    },
   text: {
     primary: '#000',
     secondary: 'grey',
   },
  },
  typography: {
    fontSize: 16,
    fontFamily: 'Oxygen',
    h1: {
      fontSize: '2rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: 700,
      paddingTop: '2rem',
    },
    h3: {
      fontSize: '1.2rem',
      fontWeight: 700,
    },
    h4: {
      fontSize: '1.15rem',
      fontWeight: 700,
    },
    h5: {
      fontSize: '1.07rem',
      fontWeight: 700,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 700,
    },
    body1: {
      fontSize: '1rem',
    },
    body2: {
      fontSize: '1rem',
    },
    button: {
      textTransform: 'none',
    }
  }
});
/* A style for body1 with linkes. tex friends on the friendslist and tunes everywhere. */

export const A = styled(Typography)((props) => ({
  fontSize: '1rem',
  fontWeight: 300,
  color: props.theme.palette.text.primary,
  display: 'inline',
  textAlign: 'center',
  fontFamily: 'Roboto',
  margin: '1px',


  '&:hover': {
    color: props.theme.palette.secondary.contrastText,
    backgroundColor: props.theme.palette.primary.contrastText,
    cursor: 'pointer',
  },
}))
