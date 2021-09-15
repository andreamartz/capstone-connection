import React from 'react';
import { render } from '@testing-library/react';
import SearchForm from './SearchForm';

test('it renders without crashing', function () {
	render(<SearchForm searchTerm={'JS'} />);
});

test('it matches snapshot', function () {
	const { asFragment } = render(<SearchForm searchTerm={'JS'} />);
	expect(asFragment()).toMatchSnapshot();
});
