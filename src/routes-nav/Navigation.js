import React, { useContext, useState } from 'react';
import UserContext from '../auth/UserContext';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import LoggedInNav from './LoggedInNav';
import LoggedOutNav from './LoggedOutNav';

const useStyles = makeStyles((theme) => ({
	icons: {
		fontSize: '1.4rem',
	},
	iconLogo: {
		color: 'yellow',
		fontSize: '3rem',
	},
	navLink: {
		color: '#FFFFFF',
		textDecoration: 'none',
		'&:hover': {
			textDecoration: 'underline',
		},
	},
	toolbar: {
		display: 'flex',
		justifyContent: 'space-between',
	},
}));

/** Navigation bar for site. Shows up on every page.
 *
 * When user is logged in, shows links to main areas of site. When not,
 * shows link to Login and Signup forms.
 *
 * Rendered by App.
 */

const Navigation = ({ logout }) => {
	const classes = useStyles();
	const { currentUser } = useContext(UserContext);
	console.debug('Navigation', 'CURRENTUSER: ', currentUser);

	const navData = currentUser?.username
		? [
				{
					label: 'Home',
					href: '/',
				},
				{
					label: 'Projects',
					href: '/projects',
				},
				{
					label: 'My Profile',
					href: `/users/${currentUser.username}/settings`,
				},
				{
					label: 'My User Page',
					href: `/users/${currentUser.id}`,
				},
		  ]
		: [
				{
					label: 'Home',
					href: '/',
				},
				{
					label: 'Login',
					href: '/login',
				},
				{
					label: 'Sign Up',
					href: '/signup',
				},
		  ];
	const CapstoneConnectionsLogo = (
		<Typography className={classes.logo} variant="h6" component="h1">
			Capstone Connections
		</Typography>
	);

	// Breakpoints
	const theme = useTheme();
	const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

	return (
		<>
			<AppBar color="primary">
				<Toolbar>
					{CapstoneConnectionsLogo}
					{currentUser ? (
						<LoggedInNav
							navData={navData}
							classes={classes}
							isSmallScreen={isSmallScreen}
							logout={logout}
						/>
					) : (
						<LoggedOutNav
							navData={navData}
							classes={classes}
							isSmallScreen={isSmallScreen}
						/>
					)}
				</Toolbar>
			</AppBar>
		</>
	);
};

export default Navigation;
