import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	box: {
		width: '100%',
		marginRight: theme.spacing(2),
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		display: 'flex',
	},
	textField: {
		flexGrow: '1',
		boxShadow: theme.spacing(5),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

/** Search form
 *
 * Appears above PrjCardList so that projects shown can be filtered by tag.
 *
 */

const SearchForm = ({ searchTerm, setSearchTerm }) => {
	const classes = useStyles();

	/** Update state, form field value as user types */
	const handleChange = (evt) => {
		setSearchTerm(evt.target.value.trim());
	};

	return (
		<Box className={classes.box}>
			<form className={classes.form}>
				<TextField
					className={classes.textField}
					name="searchTerm"
					onChange={handleChange}
					placeholder="Search by tag"
					value={searchTerm}
					variant="outlined"
				/>
			</form>
		</Box>
	);
};

export default SearchForm;
