import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#3949ab'
    },
    secondary: purple,
    error: {
      main: '#ff4025'
    },
    warning: {
      main: '#ff9c2a'
    },
    success: {
      main: '#006400'
    }
  },
  status: {
    danger: 'orange',
  },
  typography: {
    fontFamily: 'Roboto Mono, monospace',
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightBold: 600
  }
});


export default theme;
