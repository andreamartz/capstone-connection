import React from 'react';
import { render } from '@testing-library/react';
import ProfileForm from './ProfileForm';
import { MemoryRouter } from 'react-router';
import { UserProvider } from '../testUtils';

test('it renders without crashing', function () {
	render(
		<MemoryRouter>
			<UserProvider>
				<ProfileForm />
			</UserProvider>
		</MemoryRouter>,
	);
});

test('it matches snapshot', function () {
	const { asFragment } = render(
		<MemoryRouter>
			<UserProvider>
				<ProfileForm />
			</UserProvider>
		</MemoryRouter>,
	);
	expect(asFragment()).toMatchSnapshot();
});
