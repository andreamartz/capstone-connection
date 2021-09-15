import React from 'react';
import { render } from '@testing-library/react';
import SortForm from './SortForm';

test('it renders without crashing', function () {
	render(<SortForm sortVariable={'most likes'} />);
});

test('it matches snapshot when sorting by most likes', function () {
	const { asFragment } = render(<SortForm sortVariable={'most likes'} />);
	expect(asFragment()).toMatchSnapshot();
});

test('it matches snapshot when sorting by most recently added projects', function () {
	const { asFragment } = render(<SortForm sortVariable={'newest'} />);
	expect(asFragment()).toMatchSnapshot();
});
