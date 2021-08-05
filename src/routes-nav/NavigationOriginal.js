import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import "./Navigation.css";


/** Navigation bar for site. Shows up on every page.
 *
 * When user is logged in, shows links to main areas of site. When not,
 * shows link to Login and Signup forms.
 *
 * Rendered by App.
 */

const headersData = [
  {
    label: "Projects",
    href: "/projects"
  },
  {
    label: "My Profile",
    href: "/profile/:username"
  }
]

const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(2),
    fontWeight: 700,
    marginLeft: theme.spacing(4.75)
  },
  logo: {
    fontWeight: 600,
    textAlign: "left"
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between"
  }
}));

function NavigationOriginal({ logout }) {
  // CHECK: uncomment once we have auth
  // const { currentUser } = useContext(UserContext);
  // console.debug("Navigation: ", "currentUser=", currentUser);

  // CHECK: uncomment loggedInNav function once we have auth
  // function loggedInNav() {
  //   return (
        // <ul className="navbar-nav ml-auto">
        //   <li className="nav-item mr-4">
        //     <NavLink className="nav-link" to="/projects">
        //       Projects
        //     </NavLink>
        //   </li>
        //   <li className="nav-item mr-4">
        //     <NavLink className="nav-link" to="/profile">
        //       Profile
        //     </NavLink>
        //   </li>
        //   <li className="nav-item">
        //     <Link className="nav-link" to="/" onClick={logout}>
        //       Log out {currentUser.first_name || currentUser.username}
        //     </Link>
        //   </li>
        // </ul>
  //   );
  // }
  // function loggedOutNav() {
  //   return (
  //       <ul className="navbar-nav ml-auto">
  //         <li className="nav-item mr-4">
  //           <NavLink className="nav-link" to="/login">
  //             Login
  //           </NavLink>
  //         </li>
  //         <li className="nav-item mr-4">
  //           <NavLink className="nav-link" to="/signup">
  //             Sign Up
  //           </NavLink>
  //         </li>
  //       </ul>
  //   );
  // }

  // return (
  //   <nav className="Navigation navbar navbar-expand-md">
  //     <Link className="navbar-brand" to="/">
  //       Capstone Connections
  //     </Link>
  //     {/* CHECK: use this only BEFORE we have auth */}
  //     {/* loggedOutNav(); */}
  //     {/* CHECK: use this only BEFORE we have auth */}
  //     {/* loggedInNav(); */}
  //     {/* CHECK: use this instead once we have auth */}
  //     {/* {currentUser ? loggedInNav() : loggedOutNav()} */}
  //   </nav>
  // );

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const displayDesktop = () => {
    return (
      <Toolbar className={classes.toolbar}>
        {CapstoneConnectionsLogo}
        <div>
          {getMenuButtons()}
          <Button
            onClick={logout}
            color="inherit"
          >
            Logout
          </Button>
        </div>
      </Toolbar>
    );
  };

  const CapstoneConnectionsLogo = (
    <Typography 
      className={classes.logo}
      variant="h6"
      component="h1"
    >
      Capstone Connections
    </Typography>
  );

  const getMenuButtons = () => {
    return headersData.map(({ label, href }) => {
      return (
        <Button className={classes.menuButton}
          {...{
            key: label,
            color: "inherit",
            to: href,
            component: NavLink
          }}
        >
          {label}
        </Button>
      )
    });
  }

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        {displayDesktop()}
      </AppBar>
    </div>
  );
  // return (
  //   <AppBar>
  //     <Toolbar>
  //       <IconButton 
  //         edge="start"
  //         color="inherit"
  //         aria-label="menu"
  //         className={classes.menuButton}
  //       >
  //         <MenuIcon />
  //       </IconButton>
  //       <Typography 
  //         variant="h6"
  //         className={classes.title}
  //       >
  //         Capstone Connections
  //       </Typography>
  //       <Button color="inherit">
  //         Signup
  //       </Button>
  //     </Toolbar>
  //   </AppBar>
  // );


}

export default NavigationOriginal;