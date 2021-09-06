import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Homepage from '../homepage/Homepage';
import PrjListPage from '../projects/PrjListPage';
import PrjDetailPage from '../projects/PrjDetailPage';
import UserDetailPage from '../users/UserDetailPage';
import NewPrj from '../projects/NewPrj';
import LoginForm from '../auth/LoginForm';
import ProfileForm from '../users/ProfileForm';
import SignupForm from '../auth/SignupForm';
import PrivateRoute from './PrivateRoute';

/** Site-wide routes.
 *
 * Parts of site should only be visitable when logged in. Those routes are
 * wrapped by <PrivateRoute>, which is an authorization component.
 *
 * Visiting a non-existant route redirects to the homepage.
 */

function Routes({ login, signup, signupDemo }) {
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Homepage signupDemo={signupDemo} />
        </Route>

        <Route exact path="/login">
          <LoginForm login={login} />
        </Route>

        <Route exact path="/signup">
          <SignupForm signup={signup} />
        </Route>

        <PrivateRoute exact path="/projects">
          <PrjListPage />
        </PrivateRoute>

        <PrivateRoute exact path="/projects/new">
          <NewPrj />
        </PrivateRoute>

        <PrivateRoute exact path="/projects/:id">
          <PrjDetailPage />
        </PrivateRoute>

        <PrivateRoute exact path="/users/:username/settings">
          <ProfileForm />
        </PrivateRoute>

        <PrivateRoute exact path="/users/:id">
          <UserDetailPage />
        </PrivateRoute>

        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default Routes;
