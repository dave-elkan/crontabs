import React from 'react';
import { Switch, Route } from 'react-router-dom';
import TimeManagementPage from './pages/TimeManagementPage';
import AdvancedPage from './pages/AdvancedPage';
import Nav from './components/nav/Nav';
import Container from '@material-ui/core/Container';

function App() {
  return (
    <Container>
      <Nav />
      <Switch>
        <Route path="/advanced">
          <AdvancedPage />
        </Route>
        <Route path="/">
          <TimeManagementPage />
        </Route>
      </Switch>
    </Container>
  );
}

export default App;
