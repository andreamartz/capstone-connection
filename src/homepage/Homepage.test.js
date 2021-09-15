import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Homepage from './Homepage';
import { MemoryRouter } from 'react-router';
import { UserProvider } from '../testUtils';

describe('Smoke test', () => {
	test('it renders without crashing when user is logged in', () => {
		render(
			<MemoryRouter>
				<UserProvider>
					<Homepage />
				</UserProvider>
			</MemoryRouter>,
		);
	});
	test('it renders without crashing when no user is logged in', () => {
		render(
			<MemoryRouter>
				<UserProvider currentUser={null}>
					<Homepage />
				</UserProvider>
			</MemoryRouter>,
		);
	});
});

describe('The page renders with the correct content and functionality', () => {
	test('it displays the correct content when no user logged in', () => {
		const { getByText } = render(
			<MemoryRouter initialEntries={['/']}>
				<UserProvider currentUser={null}>
					<Homepage />
				</UserProvider>
			</MemoryRouter>,
		);
		const tryItOutBtn = getByText('Try It Out!');
		expect(
			getByText('The community that connects with and supports you!'),
		).toBeInTheDocument();
		expect(tryItOutBtn).toBeInTheDocument();
	});

	test('it displays the correct content when a user logged in', () => {
		const { getByText, queryByText } = render(
			<MemoryRouter initialEntries={['/']}>
				<UserProvider>
					<Homepage />
				</UserProvider>
			</MemoryRouter>,
		);
		const tryItOutBtn = queryByText('Try It Out!');
		expect(
			getByText('The community that connects with and supports you!'),
		).toBeInTheDocument();
		expect(getByText('Welcome Back, testfirst!')).toBeInTheDocument();
		expect(tryItOutBtn).not.toBeInTheDocument();
	});

	test('the Projects link works when user is logged in', () => {
		const { getByText, queryByText, debug } = render(
			<MemoryRouter initialEntries={['/']}>
				<UserProvider>
					<Homepage />
				</UserProvider>
			</MemoryRouter>,
		);
		let sortInput = queryByText('Sort projects by');
		expect(sortInput).not.toBeInTheDocument();
		const link = getByText('Projects');
		fireEvent.click(link);
		const title = getByText('Community Capstones');
		expect(title).toBeInTheDocument();
	});
});
