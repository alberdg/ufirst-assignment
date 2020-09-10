import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2)
    // minHeight: 50,
  },
  menuButton: {
    margin: theme.spacing(2),
    color: theme.palette.secondary.main,
  },
  grid: {
    padding: '8px'
  },
  logo: {
    maxWidth: '50px',
    marginLeft: theme.spacing(2)
  }
}));

/**
 * Functional component representing a header
 * @function
 * @returns element Header component
 */
const Header = ({ display = true } :
  { display?: boolean }) => {
  const classes = useStyles();
  const [ hiddenMenu, setHiddenMenu ] = useState(true);
  const matches = useMediaQuery('(max-width:414px)');
  if (!display) return null;
  /**
   * Renders mobile links
   * @function
   * @returns element Mobile links element
   */
  const renderMobileLinks = (): any => {
    if (!matches || hiddenMenu) return null;
    return (
      <Grid container>
        <Grid item xs={12} className={classes.grid}>
          <Link href="/" id="dashboard" className={classes.menuButton}>
          Dashboard
          </Link>
          <Link href="/requests" id="requests-per-minute" className={classes.menuButton}>
          Requests per minute
          </Link>
        </Grid>
        <Grid item xs={12} className={classes.grid}>
          <Link href="/httpmethods" id="http-methods" className={classes.menuButton}>
            Http Methods
          </Link>
        </Grid>
        <Grid item xs={12} className={classes.grid}>
          <Link href="/answercodes" id="http-answer-codes" className={classes.menuButton}>
            Http answer codes
          </Link>
        </Grid>
        <Grid item xs={12} className={classes.grid}>
          <Link href="/requestsbysize" id="answers-size" className={classes.menuButton}>
            Answers size
          </Link>
        </Grid>
      </Grid>
    )
  }

  /**
   * Renders desktop links
   * @function
   * @returns element Mobile links element
   */
  const renderDesktopLinks = (): any => {
    if (matches || hiddenMenu) return null;
    return (
      <Grid container>
        <Grid item xs={12} className={classes.grid}>
          <Link href="/" id="dashboard" className={classes.menuButton}>
          Dashboard
          </Link>
          <Link href="/requests" id="requests-per-minute" className={classes.menuButton}>
          Requests per minute
          </Link>

          <Link href="/httpmethods" id="http-methods" className={classes.menuButton}>
            Http Methods
          </Link>

          <Link href="/answercodes" id="http-answer-codes" className={classes.menuButton}>
            Http answer codes
          </Link>

          <Link href="/answerssize" id="answers-size" className={classes.menuButton}>
            Answers size
          </Link>
        </Grid>
      </Grid>
    )
  }

  return (
    <AppBar position="static" id="header" className={classes.root}>
      <Toolbar id="toolbar" onClick={() => setHiddenMenu(!hiddenMenu)}>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <MenuIcon />
          <img id="logo"
            src="https://media-exp1.licdn.com/dms/image/C4D0BAQHCNqBLdTfIPg/company-logo_200_200/0?e=2159024400&v=beta&t=EsxFcfuUCaLEU0n_8RALkfQoDCIbNo-vd0xvx6If308"
            className={classes.logo} alt="UFirst Group Assignment"
          />
        </IconButton>
      </Toolbar>
      {renderMobileLinks()}
      {renderDesktopLinks()}
    </AppBar>
  );
}
export default Header;
