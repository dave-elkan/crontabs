import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
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
