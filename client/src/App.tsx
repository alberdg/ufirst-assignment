import React from 'react';
import { ThemeProvider, createMuiTheme, Theme } from '@material-ui/core/styles';
import { THEME } from './constants';
import './App.css';
import Header from './components/header';
import ChartWrapper from './components/chart-wrapper';
const theme : Theme = createMuiTheme(THEME)

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Header />
        <ChartWrapper title="Test chart" data={[]} />
      </div>
    </ThemeProvider>
  );
}

export default App;
