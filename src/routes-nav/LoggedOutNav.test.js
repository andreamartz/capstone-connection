import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import LoggedOutNav from './LoggedOutNav';
import Navigation from './Navigation';
import { UserProvider } from '../testUtils';

describe('User logged in', function () {
	test('it renders without crashing', function () {
		render(
			<MemoryRouter>
				<UserProvider currentUser={null}>
					<Navigation>
						<LoggedOutNav />
					</Navigation>
				</UserProvider>
			</MemoryRouter>,
		);
	});

	test('it matches snapshot', function () {
		const { asFragment } = render(
			<MemoryRouter>
				<UserProvider currentUser={null}>
					<Navigation>
						<LoggedOutNav />
					</Navigation>
				</UserProvider>
			</MemoryRouter>,
		);
		expect(asFragment()).toMatchSnapshot();
	});
});
