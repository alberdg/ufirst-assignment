import React from 'react';
import './App.css';
import ChartWrapper from './components/chart-wrapper';

function App() {
  return (
    <div className="App">
      <ChartWrapper title="Test chart" data={[]} />
    </div>
  );
}

export default App;
