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
			<div>
				<WideNavMenu navData={navData} classes={classes} />
			</div>
		</Toolbar>
	);
};

export default LoggedOutNav;
