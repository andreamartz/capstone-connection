import React, { useContext, useState } from "react";
import Button from '@material-ui/core/Button';
import { NavLink } from "react-router-dom";
import Toolbar from '@material-ui/core/Toolbar';
import DrawerNavigation from './DrawerNavigation';
import GetWideNavMenuButtons from "./GetWideNavMenuButtons";


const LoggedOutNav = ({ navData, classes, isMatch }) => {
  if (isMatch) {
    return (
      <DrawerNavigation navData={navData} />
    );
  }
  return (
    <Toolbar className={classes.toolbar}>
      <div>
        <GetWideNavMenuButtons navData={navData} classes={classes} />
      </div>
    </Toolbar>
  );
};

export default LoggedOutNav;