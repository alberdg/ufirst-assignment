import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ThemeProvider, createMuiTheme, Theme } from '@material-ui/core/styles';
import { THEME } from './constants';
import './index.css';
import App from './App';
import RequestsPerMinute from './components/requests-per-minute';
import RequestsPerMethod from './components/requests-per-method';
import RequestsPerAnswerCode from './components/requests-per-answer-code';

import * as serviceWorker from './serviceWorker';
const theme : Theme = createMuiTheme(THEME);

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={App}/>
          <Route exact path="/httpmethods" component={RequestsPerMethod}/>
          <Route exact path="/requests" component={RequestsPerMinute}/>
          <Route exact path="/answercodes" component={RequestsPerAnswerCode}/>
          <Route exact path="/answers-size" component={App}/>
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
