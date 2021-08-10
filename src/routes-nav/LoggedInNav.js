import React, { useContext, useState } from "react";
import Button from '@material-ui/core/Button';
import { NavLink } from "react-router-dom";
import Toolbar from '@material-ui/core/Toolbar';
import DrawerNavigation from './DrawerNavigation';
import GetWideNavMenuButtons from "./GetWideNavMenuButtons";


const LoggedInNav = ({ navData, classes, isMatch, logout }) => {
  if (isMatch) {
    return (<DrawerNavigation navData={navData} logout={logout}/>);
  }
  return (
    <Toolbar className={classes.toolbar}>
      <GetWideNavMenuButtons navData={navData} classes={classes} />
      <NavLink to="/" onClick={logout} className={classes.navLink}>
        <Button
          color="inherit"
        >
          Logout
        </Button>
      </NavLink>
    </Toolbar>
  );
};

export default LoggedInNav;