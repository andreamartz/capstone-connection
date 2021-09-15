import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import DrawerNavigation from './DrawerNavigation';
import Navigation from './Navigation';
import { UserProvider } from '../testUtils';

describe('User logged in', function () {
	test('it renders without crashing', function () {
		render(
			<MemoryRouter>
				<UserProvider>
					<Navigation>
						<DrawerNavigation />
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
						<DrawerNavigation />
					</Navigation>
				</UserProvider>
			</MemoryRouter>,
		);
		expect(asFragment()).toMatchSnapshot();
	});
});

describe('User logged out', function () {
	test('it renders without crashing', function () {
		render(
			<MemoryRouter>
				<UserProvider currentUser={null}>
					<Navigation>
						<DrawerNavigation />
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
						<DrawerNavigation />
					</Navigation>
				</UserProvider>
			</MemoryRouter>,
		);
		expect(asFragment()).toMatchSnapshot();
	});
});
