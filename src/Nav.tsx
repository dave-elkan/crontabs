import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const Nav = () => {
  const location = useLocation();
  return (
    <AppBar position="static">
      <Tabs
        value={location.pathname}
        aria-label="simple tabs example"
      >
        <Tab
          label="Time Management"
          component={Link}
          value="/"
          to={'/'}
        />
        <Tab
          label="Cron"
          component={Link}
          value="/cron"
          to={'/cron'}
        />
      </Tabs>
    </AppBar>
  );
};

export default Nav;
