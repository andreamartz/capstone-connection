import React from 'react';
import { render } from '@testing-library/react';
import SignupForm from './SignupForm';
import { MemoryRouter } from 'react-router';

describe('Smoke test', () => {
  test('it renders without crashing', () => {
    render(<SignupForm />);
  });
});
