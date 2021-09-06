import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import Navigation from './Navigation';
import { UserProvider } from '../testUtils';

it('renders without crashing', function () {
	render(
		<MemoryRouter>
			<UserProvider>
				<Navigation />
			</UserProvider>
		</MemoryRouter>,
	);
});
