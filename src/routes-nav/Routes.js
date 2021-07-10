import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// import pages to route to here
import Homepage from "../homepage/Homepage";
import PrjListPage from "../projects/PrjListPage";
// import PrjDetailPage from "../projects/PrjDetailPage";

import NewPrj from "../projects/NewPrj";
import LoginForm from "../auth/LoginForm";
// import ProfileForm from "../profiles/ProfileForm";
// import SignupForm from "../auth/SignupForm";
import PrivateRoute from "./PrivateRoute";

/** Site-wide routes.
 *
 * Parts of site should only be visitable when logged in. Those routes are
 * wrapped by <PrivateRoute>, which is an authorization component.
 *
 * Visiting a non-existant route redirects to the homepage.
 */

function Routes({ login, signup }) {
  console.debug(
      "Routes",
      `login=${typeof login}`,
      `register=${typeof register}`,
  );

  return (
    <div className="pt-5">
      <Switch>

        <Route exact path="/">
          <Homepage />
        </Route>

        <Route exact path="/login">
          <LoginForm login={login} />
        </Route>

        <Route exact path="/signup">
          {/* <SignupForm signup={signup} /> */}
        </Route>

        {/* CHECK: Change to PrivateRoute once we have auth */}
        <Route exact path="/projects">
          <PrjListPage />
        </Route>

        {/* CHECK: Change to PrivateRoute once we have auth */}
          <Route exact path="/projects/new">
          <NewPrj />
        </Route>

        {/* CHECK: Change to PrivateRoute once we have auth */}
        <Route exact path="/projects/:id">
          {/* <PrjDetailPage /> */}
        </Route>

        {/* CHECK: Change to PrivateRoute once we have auth */}
        <Route path="/profile">
          {/* <ProfileForm /> */}
        </Route>

        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default Routes;