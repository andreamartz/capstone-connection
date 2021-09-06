// import { createMuiTheme } from '@material-ui/core/styles';
import { createTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3949ab',
    },
    secondary: {
      main: '#ce93d8',
    },
    error: {
      main: '#ff4025',
    },
    warning: {
      main: '#ff9c2a',
    },
    success: {
      main: '#006400',
    },
  },
  status: {
    danger: 'orange',
  },
  typography: {
    // fontFamily: 'Roboto Mono, monospace',
    fontFamily: 'Montserrat, sans-serif',
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightBold: 600,
  },
});

export default theme;
