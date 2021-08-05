import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import UserContext from "../auth/UserContext";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import "./Navigation.css";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import DrawerNavigation from './DrawerNavigation';

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
    }
  },
  // toolbar: {
  //   display: "flex",
  //   justifyContent: "space-between"
  // }
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

  const navData = currentUser?.username
    ? [{
      label: "Projects",
      href: "/projects"
      },
      {
        label: "My Profile",
        href: `/users/${currentUser.username}/settings`
      }]
    : [{
      label: "Login",
      href: "/login"
    },
    {
      label: "Sign Up",
      href: "/signup"
    }]
  ;
  // const loggedInNavData = [
  //   {
  //     label: "Projects",
  //     href: "/projects"
  //   },
  //   {
  //     label: "My Profile",
  //     href: `/users/${currentUser.username}/settings`
  //   }
  // ];
  
  // const loggedOutNavData = [
  //   {
  //     label: "Login",
  //     href: "/login"
  //   },
  //   {
  //     label: "Sign Up",
  //     href: "/signup"
  //   }
  // ]

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
        <Button key={label} className={classes.navLink}>
          <NavLink to={href} className={classes.navLink}>
            {label}
          </NavLink>

        </Button>
      )
    });
  }

  const loggedInNav = () => {
    if (isMatch) {
      return (<DrawerNavigation navData={navData} logout={logout}/>);
    }
    return (
      <Toolbar className={classes.toolbar}>
        <div>
          {getWideNavMenuButtons(navData)}
          <NavLink to="/" onClick={logout} className={classes.navLink}>
            <Button
              color="inherit"
            >
              Logout
            </Button>
          </NavLink>

        </div>
      </Toolbar>
    );
  };

  const loggedOutNav = () => {
    if (isMatch) {
      return (
        <DrawerNavigation navData={navData} />
      );
    }
    return (
      <Toolbar className={classes.toolbar}>
        <div>
          {getWideNavMenuButtons(navData)}
        </div>
      </Toolbar>
    )
  }

  return (
    <>
      <AppBar color="primary">
        <Toolbar>
          {CapstoneConnectionsLogo}
          {currentUser ? loggedInNav() : loggedOutNav()}
          {/* {loggedOutNav()} */}
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Navigation;