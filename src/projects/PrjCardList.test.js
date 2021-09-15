import React from 'react';
import { render } from '@testing-library/react';
import PrjCardList from './PrjCardList';
import { UserProvider } from '../testUtils';

test('it renders without crashing', function () {
	render(
		<UserProvider>
			<PrjCardList />
		</UserProvider>,
	);
});

test('it matches snapshot', function () {
	const { asFragment } = render(
		<UserProvider>
			<PrjCardList />
		</UserProvider>,
	);
	expect(asFragment()).toMatchSnapshot();
});
