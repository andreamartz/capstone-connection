import React from 'react';
import { render } from '@testing-library/react';
import AlertDisplay from './AlertDisplay';

describe('Smoke test', () => {
	test('it renders without crashing', () => {
		render(<AlertDisplay />);
	});
});

describe('Snapshot test', () => {
	test('it matches snapshot for error', function () {
		let messages = ['Bad things happened', 'More bad news'];
		const { asFragment } = render(
			<AlertDisplay severity="error" messages={messages} />,
		);
		expect(asFragment()).toMatchSnapshot();
	});
});
