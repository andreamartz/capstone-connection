import React from 'react';
import Alert from '@material-ui/lab/Alert';

/** Presentational component for showing bootstrap-style alerts.
 *
 * { NewPrj, ProfileForm } -> Alert
 **/

const AlertDisplay = ({ severity = 'error', messages = [] }) => {
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
