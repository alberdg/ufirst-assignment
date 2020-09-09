import React, { useEffect, useState }  from 'react';
import Grid from '@material-ui/core/Grid';
import { getDashboardData } from '../actions/actions';
import RequestsPerMinute from './requests-per-minute';
import RequestsPerMethod from './requests-per-method';
import RequestsPerAnswerCode from './requests-per-answer-code';
import RequestsPerSize from './requests-per-size';

/**
 * Functional component to represent a dashboard
 * @function
 * @returns component Dashboard component
 */
const Dashboard = () => {
  const [ data, setData ] = useState<any>([]);
  const [ loading, setLoading ] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      const data = await getDashboardData();
      setData(data);
      setLoading(false);
    })();
  }, []);

  /**
   * Renders dashboard elements
   * @function
   * @returns elements dashboardElements
   */
  const renderDashboard = () => {
    if (loading) return null;
    return (
      <>
        <Grid item xs={12}>
          <RequestsPerMinute renderHeader={false}/>
        </Grid>
        <Grid item xs={12}>
          <RequestsPerMethod renderHeader={false}/>
        </Grid>
        <Grid item xs={12} md={6}>
          <RequestsPerAnswerCode renderHeader={false}/>
        </Grid>
        <Grid item xs={12} md={6}>
          <RequestsPerSize renderHeader={false}/>
        </Grid>
      </>
    )
  }

  return (
    <Grid item container>
      {renderDashboard()}
    </Grid>
  )
}
export default Dashboard;
