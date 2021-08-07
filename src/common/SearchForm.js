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
  form: {
    width: '100%', // Fix IE 11 issue.
    display: 'flex'
  },
  textField: {
    flexGrow: '1'
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
    <Paper className={classes.paper} elevation={5}>
      <form className={classes.form} 
        onSubmit={handleSubmit}>
        <TextField className={classes.textField}
          name="searchTerm"
          onChange={handleChange}
          value={searchTerm}
          variant="outlined"
        />
        <Button type="submit"
          variant="contained"
          color="primary"
        >
          Search
        </Button>
      </form>
    </Paper>
  );
}

export default SearchForm;