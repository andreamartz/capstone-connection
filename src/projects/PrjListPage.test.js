import React from 'react';
import { render } from '@testing-library/react';
import PrjDetailPage from './PrjDetailPage';
import { MemoryRouter } from 'react-router';
import { UserProvider } from '../testUtils';

test('it renders without crashing', function () {
	render(
		<MemoryRouter>
			<UserProvider>
				<PrjDetailPage />,
			</UserProvider>
		</MemoryRouter>,
	);
});

test('it matches snapshot', function () {
	const { asFragment } = render(
		<MemoryRouter>
			<UserProvider>
				<PrjDetailPage />,
			</UserProvider>
		</MemoryRouter>,
	);
	expect(asFragment()).toMatchSnapshot();
});
