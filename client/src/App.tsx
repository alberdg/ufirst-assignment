import React from 'react';

import './App.css';
import Header from './components/header';
import ChartWrapper from './components/chart-wrapper';


function App() {
  return (
    <div className="App">
      <Header />
      <ChartWrapper title="Test chart" data={[]} />
    </div>
  );
}

export default App;
