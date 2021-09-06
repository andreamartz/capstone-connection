import React, { useContext, useState } from 'react';
import Button from '@material-ui/core/Button';
import { NavLink } from 'react-router-dom';
import Toolbar from '@material-ui/core/Toolbar';
import DrawerNavigation from './DrawerNavigation';
import WideNavMenu from './WideNavMenu';

const LoggedInNav = ({ navData, classes, isSmallScreen, logout }) => {
	if (isSmallScreen) {
		return <DrawerNavigation navData={navData} logout={logout} />;
	}
	return (
		<Toolbar className={classes.toolbar}>
			<WideNavMenu navData={navData} classes={classes} />
			<NavLink to="/" onClick={logout} className={classes.navLink}>
				<Button color="inherit">Logout</Button>
			</NavLink>
		</Toolbar>
	);
};

export default LoggedInNav;
