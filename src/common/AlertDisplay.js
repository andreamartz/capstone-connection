import React from 'react';
import Alert from '@material-ui/lab/Alert';

/** Presentational component for showing bootstrap-style alerts.
 *
 * { LoginForm, SignupForm, ProfileForm } -> Alert
 **/

const AlertDisplay = ({ severity = 'error', messages = [] }) => {
  console.debug('Alert', 'severity=', severity, 'messages=', messages);

  return (
    <div>
      {messages.map((error) => (
        <Alert variant="outlined" severity="error" key={error}>
          {error}
        </Alert>
      ))}
    </div>
  );
};

export default AlertDisplay;
