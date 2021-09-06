import React from 'react';
import Button from '@material-ui/core/Button';
import { NavLink } from 'react-router-dom';

const WideNavMenu = ({ navData, classes }) => {
	return (
		<div>
			{navData.map((navItem) => (
				<Button key={navItem.label} className={classes.navLink}>
					<NavLink to={navItem.href} className={classes.navLink}>
						{navItem.label}
					</NavLink>
				</Button>
			))}
		</div>
	);
};

export default WideNavMenu;
