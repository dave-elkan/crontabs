import React from 'react';
import { Switch, Route } from 'react-router-dom';
import TimeManagementPage from './pages/TimeManagementPage';
import AdvancedPage from './pages/AdvancedPage';
import Nav from './components/nav/Nav';
import Box from '@material-ui/core/Box';

function App() {
  return (
    <Box>
      <Nav />
      <Switch>
        <Route path="/advanced">
          <AdvancedPage />
        </Route>
        <Route path="/">
          <TimeManagementPage />
        </Route>
      </Switch>
    </Box>
  );
}

export default App;
