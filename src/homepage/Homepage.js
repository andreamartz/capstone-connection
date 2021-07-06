import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Homepage.css";
import UserContext from "../auth/UserContext";

/** Homepage of site.
 *
 * Shows welcome message or login/register buttons.
 *
 * Routed at /
 *
 * Routes -> Homepage
 */

function Homepage() {
  // CHECK: uncomment { currentUser } once we have auth
  // const { currentUser } = useContext(UserContext);
  // console.debug("Homepage", "currentUser=", currentUser);

  return (
    <div className="Homepage">
      <div className="container text-center">
        <h1 className="mb-4 font-weight-bold">Capstone Connections</h1>
        <p className="lead">The community that connects with and supports you!</p>
        {/* CHECK: uncomment once we have auth */}
        {/* {currentUser
          ? <h2>
            Welcome Back, {currentUser.firstName || currentUser.username}!
          </h2>
          : (
              <p>
                <Link className="btn btn-primary font-weight-bold mr-3"
                      to="/login">
                  Log in
                </Link>
                <Link className="btn btn-primary font-weight-bold"
                      to="/signup">
                  Sign up
                </Link>
              </p>
          )
        } */}
      </div>
    </div>
  );
}

export default Homepage;