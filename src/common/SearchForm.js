import React, { useState } from "react";
import Alert from '@material-ui/lab/Alert';
import { useHistory } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(16),
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingTop: theme.spacing(8),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    height: '60vh',
    width: '22rem',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.warning.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

/** Search form 
 * 
 * Appears on PrjList so that projects shown can be filtered.
 * 
*/

const SearchForm = ({ search }) => {
  console.debug("SearchForm", "searchFor=", typeof search);

  const [searchTerm, setSearchTerm] = useState("");
  const [formErrors, setFormErrors] = useState([]);

  console.debug("SearchForm",
    "search=", typeof search,
    "searchTerm=", searchTerm,
    "formErrors", formErrors
  );

  const classes = useStyles();
  const history = useHistory();

  /** Tell parent component to do the filtering */
  const handleSubmit = (evt) => {
    // prevent accidentally searching just spaces
    evt.preventDefault();
    search(searchTerm.trim() || undefined);
    setSearchTerm(searchTerm.trim());
  };

  /** Update form field as user types */
  const handleChange = (evt) => {
    setSearchTerm(evt.target.value);
  }

  return (
    <Paper className={classes.paper} elevation={5} component="form" maxwidth="md">
      <form className={classes.form} onSubmit={handleSubmit}>
        <TextField name="searchTerm"
          onChange={handleChange}
          value={searchTerm}>
        </TextField>
        <Button type="submit"
        variant="contained">
          Search
        </Button>

      </form>

    </Paper>
  )
}

export default SearchForm;