import React from 'react';
import { EPAJsonRecord } from '../interfaces/epa-json';

/**
 * Functional component representing a header
 * @function
 * @param props Component props
 * @returns element Header component
 */
const ChartWrapper = ({ title, data } : { title: string, data: EPAJsonRecord[] }) : JSX.Element => {
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
