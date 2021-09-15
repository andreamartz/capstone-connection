import React from 'react';
import { render } from '@testing-library/react';
import UserDetailPage from './UserDetailPage';
import { MemoryRouter } from 'react-router';
import { UserProvider } from '../testUtils';

test('it renders without crashing', function () {
	render(
		<MemoryRouter>
			<UserProvider>
				<UserDetailPage />
			</UserProvider>
		</MemoryRouter>,
	);
});

test('it matches snapshot', function () {
	const { asFragment } = render(
		<MemoryRouter>
			<UserProvider>
				<UserDetailPage />
			</UserProvider>
		</MemoryRouter>,
	);
	expect(asFragment()).toMatchSnapshot();
});
