import React, { ComponentType } from 'react';
import {
  render,
  screen,
  waitFor,
  fireEvent,
} from '@testing-library/react';
import App from './App';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import store from './store';

function Wrapper({ children }: { children: any }) {
  const history = createMemoryHistory();

  return (
    <Provider store={store}>
      <Router history={history}>{children}</Router>
    </Provider>
  );
}

test('renders the Time Mangement screen by default', async () => {
  const history = createMemoryHistory();

  render(<App />, { wrapper: Wrapper as ComponentType });

  await waitFor(() => screen.findByRole('heading', { level: 1 }));
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
    'Time management',
  );
});

test('renders the Advanced screen when clicked', async () => {
  const history = createMemoryHistory();

  render(
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>,
  );

  fireEvent.click(
    screen.getByRole('tab', { name: 'crontabs-tab-Advanced' }),
  );
  await waitFor(() =>
    screen.findByRole('heading', { name: 'Advanced' }),
  );
});
