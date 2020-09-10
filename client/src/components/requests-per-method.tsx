import React, { useContext, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Header from './header';
import ChartWrapper from './chart-wrapper';
import { getHttpRequestsByMethod } from '../actions/actions';
import { RequestsByMethod } from '../interfaces/request-by-method';
import UFirstGroupResponsivePie from './responsive-pie-chart';
import { DashboardContext } from '../context/dashboard-context';

/**
 * Functional component representing Requests per method chart
 * @function
 * @returns component Requests per method component
 */
const RequestsPerMethod = ({ renderHeader = true } :
  { renderHeader?: boolean }) : JSX.Element => {
  const { data, setData } = useContext(DashboardContext);

  useEffect(() => {
    if (!data || !Array.isArray(data.recordsByMethod) || data.recordsByMethod.length === 0) {
      (async () => {
        const data = await getHttpRequestsByMethod();
        const output: RequestsByMethod[] = (data) ? Object.values(data) : [];
        setData({ ...data, recordsByMethod: output });
      })()
    }
  }, []);
  console.log(data.recordsByMethod);
  return (
    <Grid container>
      <Header display={renderHeader}/>
      <ChartWrapper title="Requests per method">
        <UFirstGroupResponsivePie
          data={data.recordsByMethod || []}
        />
       </ChartWrapper>
    </Grid>
  );
}
export default RequestsPerMethod;
