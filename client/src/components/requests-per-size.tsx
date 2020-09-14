import React, { useContext, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Header from './header';
import ChartWrapper from './chart-wrapper';
import { getHttpRequestsBySize } from '../actions/actions';
import { RequestsBySize } from '../interfaces/request-by-size';
import UFirstGroupResponsiveBar from './responsive-bar-chart';
import { DashboardContext } from '../context/dashboard-context';

/**
 * Functional component representing Requests per size chart
 * @function
 * @returns component Requests per size component
 */
const RequestsPerSize = ({ renderHeader = true } :
  { renderHeader?: boolean }) => {
  const { data, setData } = useContext(DashboardContext);
  const keys: string[] = [ 'value' ];

  useEffect(() => {
    if (!data || !Array.isArray(data.recordsBySize) || data.recordsBySize.length === 0) {
      (async () => {
        const data = await getHttpRequestsBySize();
        const recordsBySize: RequestsBySize[] = (data) ? Object.values(data) : [];
        setData({ ...data, recordsBySize });
      })()
    }
  }, []);
  return (
    <Grid container>
      <Header display={renderHeader} />
      <ChartWrapper title="Requests per size with status code 200 and less than 1000 bytes">
        <UFirstGroupResponsiveBar
          data={data.recordsBySize || []}
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
