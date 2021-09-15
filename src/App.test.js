import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { MemoryRouter } from 'react-router-dom';
import UserProvider from './utils';

test('renders App without crashing', () => {
	render(
		<MemoryRouter>
			<UserProvider>
				<App />
			</UserProvider>
		</MemoryRouter>,
	);
});

test('navbar links', () => {
	const { getByText } = render(
		<MemoryRouter initialEntries={['/']}>
			<App />
		</MemoryRouter>,
	);
	const text = getByText('The community that connects with and supports you!');
	expect(text).toBeInTheDocument();
});
