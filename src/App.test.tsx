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
  render(<App />, { wrapper: Wrapper as ComponentType });

  await waitFor(() => screen.findByRole('heading', { level: 1 }));
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
    'Time Management',
  );
});

test('renders the Advanced screen when clicked', async () => {
  render(<App />, { wrapper: Wrapper as ComponentType });

  fireEvent.click(
    screen.getByRole('tab', { name: 'crontabs-tab-Advanced' }),
  );
  await waitFor(() =>
    screen.findByRole('heading', { name: 'Advanced' }),
  );
});
