import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Header from './header';
import ChartWrapper from './chart-wrapper';
import { getHttpRequestsByAnswerCode } from '../actions/actions';
import { RequestsByAnswerCode } from '../interfaces/request-by-answer-code';
import UFirstGroupResponsiveBar from './responsive-bar-chart';

/**
 * Functional component representing Requests per answer code chart
 * @function
 * @returns component Requests per answer code component
 */
const RequestsPerAnswerCode = () => {
  const [ data, setData ] = useState<RequestsByAnswerCode[]>([]);
  const keys: string[] = [ 'value' ];

  useEffect(() => {
    (async () => {
      const data = await getHttpRequestsByAnswerCode();
      const output: RequestsByAnswerCode[] = (data) ? Object.values(data) : [];
      setData(output);
    })()
  }, []);

  return (
    <Grid container>
      <Header />
      <ChartWrapper title="Requests per answer code">
        <UFirstGroupResponsiveBar
          data={data}
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
