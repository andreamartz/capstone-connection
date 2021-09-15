import React from 'react';
import { render } from '@testing-library/react';
import Tags from './Tags';
import { UserProvider } from '../testUtils';

const tags = [
	{ id: 1, text: 'HTML' },
	{ id: 2, text: 'CSS' },
];

test('it renders without crashing', function () {
	render(
		<UserProvider>
			<Tags tags={tags} />
		</UserProvider>,
	);
});

test('it matches snapshot', function () {
	const { asFragment } = render(
		<UserProvider>
			<Tags tags={tags} />
		</UserProvider>,
	);
	expect(asFragment()).toMatchSnapshot();
});
