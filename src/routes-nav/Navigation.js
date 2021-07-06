import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import UserContext from "../auth/UserContext";
import "./Navigation.css";

/** Navigation bar for site. Shows up on every page.
 *
 * When user is logged in, shows links to main areas of site. When not,
 * shows link to Login and Signup forms.
 *
 * Rendered by App.
 */


function Navigation({ logout }) {
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
  function loggedOutNav() {
    return (
        <ul className="navbar-nav ml-auto">
          <li className="nav-item mr-4">
            <NavLink className="nav-link" to="/login">
              Login
            </NavLink>
          </li>
          <li className="nav-item mr-4">
            <NavLink className="nav-link" to="/signup">
              Sign Up
            </NavLink>
          </li>
        </ul>
    );
  }

  return (
    <nav className="Navigation navbar navbar-expand-md">
      <Link className="navbar-brand" to="/">
        Capstone Connections
      </Link>
      {/* CHECK: use this only BEFORE we have auth */}
      {/* loggedOutNav(); */}
      {/* CHECK: use this only BEFORE we have auth */}
      {/* loggedInNav(); */}
      {/* CHECK: use this instead once we have auth */}
      {/* {currentUser ? loggedInNav() : loggedOutNav()} */}
    </nav>
  );
}

export default Navigation;