import React from 'react';
import { render } from '@testing-library/react';
import PrjCardHoriz from './PrjCardHoriz';
import { UserProvider } from '../testUtils';

const project = {
	id: 3,
	name: 'Water Mate',
	image:
		'https://res.cloudinary.com/wahmof2/image/upload/v1628103099/capstone_connections/projects_capstone_connections/water-mate-Aimee-Wildstone.png',
	tags: [{ id: 4, text: 'API' }],
};

test('it renders without crashing', function () {
	render(<PrjCardHoriz project={project} />);
});

test('it matches snapshot', function () {
	const { asFragment } = render(
		<UserProvider>
			<PrjCardHoriz project={project} />
		</UserProvider>,
	);
	expect(asFragment()).toMatchSnapshot();
});
