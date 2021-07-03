import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link, useLocation } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Toolbar from '@material-ui/core/Toolbar';
import Status from './Status';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  nav: {
    flexGrow: 1,
    marginLeft: theme.spacing(3),
  },
  toolbar: {
    paddingLeft: 0,
    paddingRight: 0,
  },
}));

function a11yProps(name: string) {
  return {
    'aria-label': `crontabs-tab-${name}`,
    'aria-controls': `crontabs-tabpanel-${name}`,
  };
}

const Nav = () => {
  const location = useLocation();
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Container fixed>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" noWrap>
            Crontabs
          </Typography>
          <Tabs
            value={location.pathname}
            aria-label="Crontabs tabs"
            className={classes.nav}
          >
            <Tab
              label="Time Management"
              component={Link}
              value="/"
              to={'/'}
              {...a11yProps('Time Management')}
            />
            <Tab
              label="Advanced"
              component={Link}
              value="/advanced"
              to={'/advanced'}
              {...a11yProps('Advanced')}
            />
          </Tabs>
          <Status />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Nav;
