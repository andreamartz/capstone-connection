import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import DrawerNavigation from './DrawerNavigation';
import WideNavMenu from './WideNavMenu';

const LoggedOutNav = ({ navData, classes, isSmallScreen }) => {
	if (isSmallScreen) {
		return <DrawerNavigation navData={navData} />;
	}
	return (
		<Toolbar className={classes.toolbar}>
			<WideNavMenu navData={navData} classes={classes} />
		</Toolbar>
	);
};

export default LoggedOutNav;
