import React, { useEffect, useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import Header from './header';
import ChartWrapper from './chart-wrapper';
import { getHttpRequestsByMinute } from '../actions/actions';
import { RequestsByMinute } from '../interfaces/request-by-minute';
import UFirstGroupResponsiveBar from './responsive-bar-chart';
import { DashboardContext } from '../context/dashboard-context';
import { DashboardData } from '../interfaces/dashboard-data';
/**
 * Functional component representing Requests per minute chart
 * @function
 * @returns component Requests per minute component
 */
const RequestsPerMinute = ({ renderHeader = true } :
  { renderHeader?: boolean }) : JSX.Element => {
  const { data, setData } = useContext(DashboardContext);
  // const [ data, setData ] = useState<RequestsByMinute[]>([]);
  const keys: string[] = [ 'value' ];
  const contextData: DashboardData = { ...data };

  const storeData = (data: DashboardData) => {
    const output: RequestsByMinute[] = (data) ? Object.values(data) : [];
    setData({ ...contextData, recordsByMinute: output });
  }

  useEffect(() => {
    if (!data || !Array.isArray(data.recordsByMinute) || data.recordsByMinute.length === 0) {
      (async () => {
        const data = await getHttpRequestsByMinute();
        storeData(data);
      })()
    }
  }, []);

  return (
    <Grid container>
      <Header display={renderHeader}/>
      <ChartWrapper title="Requests per minute">
        <UFirstGroupResponsiveBar
          data={data.recordsByMinute || []}
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
