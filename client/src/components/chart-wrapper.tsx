import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  chart: {
    height: 500,
    padding: theme.spacing(2)
  }
}));

/**
 * Functional component representing a header
 * @function
 * @param props Component props
 * @returns element Header component
 */
const ChartWrapper = ({
    title,
    children,
  } :
  {
    title: string,
    children: JSX.Element
  }) : JSX.Element => {
  const classes = useStyles();
    return (
      <Grid item xs={12} id="chart-wrapper">
        <Grid item xs={12} id="chart" className={classes.chart}>
          <Typography id="chart-title" variant="h4" component="h1">{title}</Typography>
          {children}
        </Grid>
      </Grid>
    );
}

export default ChartWrapper;
