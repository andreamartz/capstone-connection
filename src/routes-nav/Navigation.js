import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import UserContext from "../auth/UserContext";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import "./Navigation.css";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import DrawerLoggedIn from './DrawerLoggedIn';
import DrawerLoggedOut from './DrawerLoggedOut';

const useStyles = makeStyles(theme => ({
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
      textDecoration: "underline",
    },
  }
}));

/** Navigation bar for site. Shows up on every page.
 *
 * When user is logged in, shows links to main areas of site. When not,
 * shows link to Login and Signup forms.
 *
 * Rendered by App.
 */


function Navigation({ logout }) {
  // const [anchorEl, setAnchorEl] = useState(null);
  const [value, setValue] = useState(0);
  const classes = useStyles();
  const { currentUser } = useContext(UserContext);
  console.debug("Navigation", "CURRENTUSER: ", currentUser);
  // const handleOpenMenu = e => {
  //   setAnchorEl(e.currentTarget);
  // };

  // const handleMenuClose = () => {
  //   setAnchorEl(null);
  // };
  // const handleClickTab = (e, newValue) => {
  //   setValue(newValue);
  // };
  const loggedInNavData = [
    {
      label: "Projects",
      href: "/projects"
    },
    {
      label: "My Profile",
      href: `/users/${currentUser.username}/settings`
    }
  ];
  
  const loggedOutNavData = [
    {
      label: "Login",
      href: "/login"
    },
    {
      label: "Sign Up",
      href: "/signup"
    }
  ]

  const CapstoneConnectionsLogo = (
    <Typography 
      className={classes.logo}
      variant="h6"
      component="h1"
    >
      Capstone Connections
    </Typography>
  );

  // Breakpoints
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down('sm'));

  const getWideNavMenuButtons = (navData) => {
    return navData.map(({ label, href }) => {
      return (
        <Button key={label} className={classes.navLink}
          // {...{
          //   key: label,
          //   color: "inherit",
          //   to: href,
          //   component: NavLink
          // }}
        >
          <NavLink to={href} className={classes.navLink}>
            {label}
          </NavLink>

        </Button>
      )
    });
  }

  function navDisplay() {
    if (currentUser && isMatch) {
      return drawerLoggedInNav();
    }
    if (currentUser && !isMatch) {
      return wideLoggedInNav();
    }
    if (!currentUser && isMatch) {
      return drawerLoggedOutNav();
    }
    if (!currentUser && !isMatch) {
      return wideLoggedOutNav();
    }
  }

  const drawerLoggedInNav = () => {
    console.log("LOGGEDINNAVDATA: ", loggedInNavData);
    return (
      <DrawerLoggedIn navData={loggedInNavData} logout={logout}/>
    );
  }
  
  const wideLoggedInNav = () => {
    return (
      <Toolbar className={classes.toolbar}>
        <div>
          {getWideNavMenuButtons(loggedInNavData)}
          <Button
            onClick={logout}
            color="inherit"
          >
            Logout
          </Button>
        </div>
      </Toolbar>
    )
  }
  
  const drawerLoggedOutNav = () => {
    return (
      <DrawerLoggedOut navData={loggedOutNavData}/>
    );
  };

  const wideLoggedOutNav = () => {
    return (
      <Toolbar className={classes.toolbar}>
        <div>
          {getWideNavMenuButtons(loggedOutNavData)}

        </div>
      </Toolbar>
    )
  };

  return (
    <>
      <AppBar color='primary'>
        <Toolbar>
          {CapstoneConnectionsLogo}

          {navDisplay()}

        </Toolbar>
      </AppBar>
    </>
  )
}

export default Navigation;