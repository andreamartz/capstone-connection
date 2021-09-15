import React from 'react';
import Alert from '@material-ui/lab/Alert';

/** Presentational component for showing alerts.
 *
 * It is rendered by NewPrj and ProfileForm to show alerts regarding form inputs.
 *
 * Receives props:
 * 		- severity (default value is 'error')
 *    - messages (usually these are error or validation messages)
 *
 * NewPrj -> Alert
 * ProfileForm -> Alert
 */

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
