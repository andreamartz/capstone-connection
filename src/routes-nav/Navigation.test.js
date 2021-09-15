import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import Navigation from './Navigation';
import { UserProvider } from '../testUtils';

describe('Smoke test', () => {
	test('it renders without crashing when user is logged in', function () {
		render(
			<MemoryRouter>
				<UserProvider>
					<Navigation />
				</UserProvider>
			</MemoryRouter>,
		);
	});

	test('it renders without crashing when user is not logged in', function () {
		render(
			<MemoryRouter>
				<UserProvider currentUser={null}>
					<Navigation />
				</UserProvider>
			</MemoryRouter>,
		);
	});
});

describe('Nav links', function () {
	test('Projects nav link works for logged in user', function () {
		const { getByText } = render(
			<MemoryRouter>
				<UserProvider>
					<Navigation />
				</UserProvider>
			</MemoryRouter>,
		);
		const myUserPageLink = getByText('My User Page');
		fireEvent.click(myUserPageLink);
		const gitHubLink = getByText('GitHub');
		expect(gitHubLink).toBeInTheDocument();
	});
});
