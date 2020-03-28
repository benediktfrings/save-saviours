import { createMuiTheme } from '@material-ui/core/styles'

export const theme = createMuiTheme({
 overrides: {
  MuiFormControlLabel:{
    label:{
      textAlign:"left"
      },
    },
  },
  mixins:{
    toolbar:{
      minHeight:90,
      [`@media (min-width: 0px) and (orientation:landscape)`]: {
        minHeight: 90,
       },
      [`@media (min-width: 600px)`]: {
        minHeight: 110,
       },
    }
  },
  palette: {
    primary: {
      main: '#FA2B86',
    },
    secondary: {
      main: '#32C3B8',
    },
    text: {
      primary: '#171717',
      secondary: '#999999',
    },
    background: {
      default: '#fff',
      paper: '#fff'
    },
  },
  shape: {
    borderRadius: 8,
  },
  typography:{
    fontFamily: [
      '"Helvetica Neue"',
      'sans-serif',
      '"Open Sans"',
      'Helvetica',
      'Roboto'
    ],
    fontSize:16,
    h1:{
      fontSize:'4rem',
      '@media (max-width:600px)': {
        fontSize: '2.5rem',
      },
    },
    h2:{
      fontSize:'3rem',
      '@media (max-width:600px)': {
        fontSize: '2rem',
      },
    },
    h3:{
      fontSize:'2.5rem',
      '@media (max-width:600px)': {
        fontSize: '1.5rem',
      },
    },
  }
  
})
export default theme