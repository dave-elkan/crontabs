import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link, useLocation } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Toolbar from '@material-ui/core/Toolbar';
import Status from './Status';

const useStyles = makeStyles((theme) => ({
  nav: {
    flexGrow: 1,
    marginLeft: theme.spacing(3),
  },
}));

const Nav = () => {
  const location = useLocation();
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" noWrap>
          Crontabs
        </Typography>
        <Tabs
          value={location.pathname}
          aria-label="simple tabs example"
          className={classes.nav}
        >
          <Tab
            label="Time Management"
            component={Link}
            value="/"
            to={'/'}
          />
          <Tab
            label="Advanced"
            component={Link}
            value="/advanced"
            to={'/advanced'}
          />
        </Tabs>
        <Status />
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
