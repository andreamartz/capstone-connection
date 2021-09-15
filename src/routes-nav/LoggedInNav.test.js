import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import LoggedInNav from './LoggedInNav';
import Navigation from './Navigation';
import { UserProvider } from '../testUtils';

describe('User logged in', function () {
	test('it renders without crashing', function () {
		render(
			<MemoryRouter>
				<UserProvider>
					<Navigation>
						<LoggedInNav />
					</Navigation>
				</UserProvider>
			</MemoryRouter>,
		);
	});

	test('it matches snapshot', function () {
		const { asFragment } = render(
			<MemoryRouter>
				<UserProvider>
					<Navigation>
						<LoggedInNav />
					</Navigation>
				</UserProvider>
			</MemoryRouter>,
		);
		expect(asFragment()).toMatchSnapshot();
	});
});
