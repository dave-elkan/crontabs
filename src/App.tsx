import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import TimeManagementPage from './pages/TimeManagementPage';
import CronPage from './pages/CronPage';
import Nav from './components/nav/Nav';
import Container from '@material-ui/core/Container';

function App() {
  return (
    <Container>
      <Router>
        <Nav />
        <Switch>
          <Route path="/cron">
            <CronPage />
          </Route>
          <Route path="/">
            <TimeManagementPage />
          </Route>
        </Switch>
      </Router>
    </Container>
  );
}

export default App;
