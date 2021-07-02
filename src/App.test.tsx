import React from 'react';
import {
  render,
  screen,
  waitFor,
  fireEvent,
} from '@testing-library/react';
import App from './App';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

test('renders the Time Mangement screen by default', async () => {
  const history = createMemoryHistory();

  render(
    <Router history={history}>
      <App />
    </Router>,
  );

  await waitFor(() => screen.findByRole('heading', { level: 1 }));
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
    'Time management',
  );
});

test('renders the Advanced screen when clicked', async () => {
  const history = createMemoryHistory();

  render(
    <Router history={history}>
      <App />
    </Router>,
  );

  fireEvent.click(
    screen.getByRole('tab', { name: 'crontabs-tab-Advanced' }),
  );
  await waitFor(() =>
    screen.findByRole('heading', { name: 'Advanced' }),
  );
});
