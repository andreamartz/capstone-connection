import React, { useState } from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    width: '100%',
    marginRight: theme.spacing(2)
  },
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
 * Appears above PrjCardList so that projects shown can be filtered.
 * 
*/

const SearchForm = ({ search }) => {
  console.debug("SearchForm", "searchFor=", typeof search);

  const [searchTerm, setSearchTerm] = useState("");
  const [formErrors, setFormErrors] = useState([]);

  console.debug("SearchForm",
    "searchTerm=", searchTerm,
    "formErrors", formErrors
  );

  const classes = useStyles();

  /** Tell parent component to do the filtering */
  const handleSubmit = (evt) => {
    // prevent accidentally searching just spaces
    evt.preventDefault();
    search(searchTerm.trim() || undefined);
    setSearchTerm("");
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
          Search by Tag
        </Button>
      </form>
    </Paper>
  );
}

export default SearchForm;