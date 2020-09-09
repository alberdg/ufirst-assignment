import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Header from './header';
import ChartWrapper from './chart-wrapper';
import { getHttpRequestsByMinute } from '../actions/actions';
import { RequestsByMinute } from '../interfaces/request-by-minute';
import UFirstGroupResponsiveBar from './responsive-bar-chart';
/**
 * Functional component representing Requests per minute chart
 * @function
 * @returns component Requests per minute component
 */
const RequestsPerMinute = () : JSX.Element => {
  const [ data, setData ] = useState<RequestsByMinute[]>([]);
  const keys: string[] = [ 'value' ];

  useEffect(() => {
    (async () => {
      const data = await getHttpRequestsByMinute();
      const output: RequestsByMinute[] = (data) ? Object.values(data) : [];
      setData(output);
    })()
  }, []);

  return (
    <Grid container>
      <Header />
      <ChartWrapper title="Requests per minute">
        <UFirstGroupResponsiveBar
          data={data}
          keys={keys}
          indexBy="minute"
          bottomLegend="Minutes"
          leftLegend="Requests"
        />
       </ChartWrapper>
    </Grid>
  );
}
export default RequestsPerMinute;
