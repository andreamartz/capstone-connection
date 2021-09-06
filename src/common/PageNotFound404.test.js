import React from 'react';
import { render } from '@testing-library/react';
import PageNotFound404 from './PageNotFound404';
import { MemoryRouter } from 'react-router';

describe('Smoke test', () => {
  test('it renders without crashing', () => {
    render(<PageNotFound404 />);
  });
});
