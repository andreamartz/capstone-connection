import React from 'react';
import { render } from '@testing-library/react';
import PrjCardVert from './PrjCardVert';
import { MemoryRouter } from 'react-router';
import { UserProvider } from '../testUtils';

const project = {
	id: 3,
	name: 'Water Mate',
	image:
		'https://res.cloudinary.com/wahmof2/image/upload/v1628103099/capstone_connections/projects_capstone_connections/water-mate-Aimee-Wildstone.png',
	repoUrl: 'https://github.com/awildstone/Water-Mate',
	siteUrl: 'https://water-mate.herokuapp.com/',
	description:
		"Water Mate is a tool to help you organize your plant collection, keep track of the health of your plants, and help remind you when it's time to water your plants. You have full control over how your collection is organized, so organize your collection in a way that makes sense for you!",
	feedbackRequest: null,
	createdAt: '2021-08-05T13:19:04.891Z',
	lastModified: '2021-08-05T13:19:04.891Z',
	creator: {
		id: 3,
		username: 'awildstone',
		firstName: 'Aimee',
		lastName: 'Wildstone',
		photoUrl:
			'https://res.cloudinary.com/wahmof2/image/upload/v1628101940/capstone_connections/users_capstone_connections/Aimee-Wildstone.jpg',
	},
	likesCount: 0,
	currentUsersLikeId: null,
	tags: [{ id: 4, text: 'API' }],
};

test('it renders without crashing', function () {
	render(
		<MemoryRouter>
			<UserProvider>
				<PrjCardVert project={project} />
			</UserProvider>
		</MemoryRouter>,
	);
});

test('it matches snapshot', function () {
	const { asFragment } = render(
		<MemoryRouter>
			<UserProvider>
				<PrjCardVert project={project} />
			</UserProvider>
		</MemoryRouter>,
	);
	expect(asFragment()).toMatchSnapshot();
});
