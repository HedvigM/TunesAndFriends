import { createTheme, styled, Typography } from '@mui/material';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#F0F3EB',
      contrastText: '#AED67A'
    },
    secondary: {
      main: '#fff',
      contrastText: '#673929',
    },
   text: {
     primary: '#000',
     secondary: 'grey',
   },

  },
  typography: {
    fontSize: 16,
    h1: {
      fontSize: '2rem',
      fontWeight: 700
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: 700,
      paddingTop: '2rem'
    },
    h3: {
      fontSize: '1.2rem',
      fontWeight: 700
    },
    h4: {
      fontSize: '1.15rem',
      fontWeight: 700
    },
    h5: {
      fontSize: '1.07rem',
      fontWeight: 700
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 700
    },
    body1: {
      fontSize: '1rem'
    },
    body2: {
      fontSize: '1rem'
    },
    button: {
      textTransform: 'none'
    }
  }
});

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
