import React from 'react';
import { EPAJsonRecord } from '../interfaces/epa-json';

const ChartWrapper = ({ title, data } : { title: string, data: EPAJsonRecord[] }) => {
    return (
      <div id="chart-wrapper">
        <h1 id="chart-title">{title}</h1>
        <div id="chart">
            <pre>{data}</pre>
        </div>
      </div>
    );
}

export default ChartWrapper;
