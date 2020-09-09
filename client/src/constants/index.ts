import { ThemeOptions } from '@material-ui/core/styles';
const BASE_URL = 'http://localhost:3001';
export const EPA_URL: string = 'http://localhost:3001/json';
export const HTTP_REQUEST_BY_MINUTE_URL: string = `${BASE_URL}/requestsbyminute`;
export const HTTP_REQUEST_BY_METHOD_URL: string = `${BASE_URL}/httpmethods`;
export const HTTP_REQUEST_BY_ANSWER_CODE_URL: string = `${BASE_URL}/answercodes`;
export const HTTP_REQUEST_BY_SIZE_URL: string = `${BASE_URL}/requestsbysize`;
export const DASHBOARD_DATA_URL: string = `${BASE_URL}/dashboard`;

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
