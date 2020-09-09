import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Header from './header';
import ChartWrapper from './chart-wrapper';
import { getHttpRequestsByMethod } from '../actions/actions';
import { RequestsByMethod } from '../interfaces/request-by-method';
import UFirstGroupResponsivePie from './responsive-pie-chart';

/**
 * Functional component representing Requests per method chart
 * @function
 * @returns component Requests per method component
 */
const RequestsPerMethod = ({ renderHeader = true } :
  { renderHeader?: boolean }) : JSX.Element => {
  const [ data, setData ] = useState<RequestsByMethod[]>([]);

  useEffect(() => {
    (async () => {
      const data = await getHttpRequestsByMethod();
      const output: RequestsByMethod[] = (data) ? Object.values(data) : [];
      setData(output);
    })()
  }, []);

  return (
    <Grid container>
      <Header display={renderHeader}/>
      <ChartWrapper title="Requests per method">
        <UFirstGroupResponsivePie
          data={data}
        />
       </ChartWrapper>
    </Grid>
  );
}
export default RequestsPerMethod;
