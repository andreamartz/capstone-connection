import React from 'react';
import { render } from '@testing-library/react';
import NewPrj from './NewPrj';
import { MemoryRouter } from 'react-router';
import { UserProvider } from '../testUtils';

describe('Smoke test', () => {
  test('it renders without crashing', () => {
    render(
      <MemoryRouter>
        <UserProvider>
          <NewPrj />
        </UserProvider>
      </MemoryRouter>
    );
  });
});
