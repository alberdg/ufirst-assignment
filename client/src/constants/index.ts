import { ThemeOptions } from '@material-ui/core/styles';
export const EPA_URL: string = 'http://localhost:3001/json';

export const THEME: ThemeOptions = {
  overrides: {
    MuiInputBase: {
      input: {
        borderBottomColor: '#FFFFFF !important'
        // .. other styling that you want
      }
    }
  },
  palette: {
    primary: {
      main: '#0096c7' //8AC926
    },
    secondary: {
      main: '#FFFFFF',
    },
    error: {
      main: '#ED254E'
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
};