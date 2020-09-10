import React, { useContext, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Header from './header';
import ChartWrapper from './chart-wrapper';
import { getHttpRequestsByAnswerCode } from '../actions/actions';
import { RequestsByAnswerCode } from '../interfaces/request-by-answer-code';
import UFirstGroupResponsiveBar from './responsive-bar-chart';
import { DashboardContext } from '../context/dashboard-context';

/**
 * Functional component representing Requests per answer code chart
 * @function
 * @returns component Requests per answer code component
 */
const RequestsPerAnswerCode = ({ renderHeader = true } :
  { renderHeader?: boolean }) => {
  const { data, setData } = useContext(DashboardContext);
  const keys: string[] = [ 'value' ];

  useEffect(() => {
    if (!data || !Array.isArray(data.recordsByAnswerCode) || data.recordsByAnswerCode.length === 0) {
      (async () => {
        const data = await getHttpRequestsByAnswerCode();
        const recordsByAnswerCode: RequestsByAnswerCode[] = (data) ? Object.values(data) : [];
        setData({ ...data, recordsByAnswerCode });
      })()
    }
  }, []);

  return (
    <Grid container>
      <Header display={renderHeader}/>
      <ChartWrapper title="Requests per answer code">
        <UFirstGroupResponsiveBar
          data={data.recordsByAnswerCode || []}
          keys={keys}
          indexBy="id"
          bottomLegend="Answer code"
          leftLegend="Requests"
        />
       </ChartWrapper>
    </Grid>
  );
}
export default RequestsPerAnswerCode;
