import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { MemoryRouter } from 'react-router-dom';

test('renders App', () => {
  const { getByText } = render((
    <MemoryRouter initialEntries={['/projects']}>
      <App />
    </MemoryRouter>
  ));
  expect(getByText('Capstone Connections')).toBeInTheDocument();
});

test('navbar links', () => {
  const { getByText } = render((
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  ));
  expect(getByText("The community that connects with and supports you!")).toBeInTheDocument();
});
