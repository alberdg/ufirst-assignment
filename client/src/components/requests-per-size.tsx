import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Header from './header';
import ChartWrapper from './chart-wrapper';
import { getHttpRequestsBySize } from '../actions/actions';
import { RequestsBySize } from '../interfaces/request-by-size';
import UFirstGroupResponsiveBar from './responsive-bar-chart';
/**
 * Functional component representing Requests per size chart
 * @function
 * @returns component Requests per size component
 */
const RequestsPerSize = () => {
  const [ data, setData ] = useState<RequestsBySize[]>([]);
  const keys: string[] = [ 'value' ];

  useEffect(() => {
    (async () => {
      const data = await getHttpRequestsBySize();
      const output: RequestsBySize[] = (data) ? Object.values(data) : [];
      setData(output);
    })()
  }, []);

  return (
    <Grid container>
      <Header />
      <ChartWrapper title="Requests per size with status code 200 and less than 1000 bytes">
        <UFirstGroupResponsiveBar
          data={data}
          keys={keys}
          indexBy="id"
          bottomLegend="Size"
          leftLegend="Requests"
        />
       </ChartWrapper>
    </Grid>
  );
}
export default RequestsPerSize;
