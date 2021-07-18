import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import FeedbackOutlinedIcon from '@material-ui/icons/FeedbackOutlined';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CapConApi from "../api/api";


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    height: 'auto',
    width: '40rem',
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
  button: {
    margin: theme.spacing(2)
  },
  textField: {
    marginBottom: theme.spacing(2)
  }
}));

const INITIAL_STATE_FORM_DATA = {
  comment: ""
};

const CommentForm = () => {
  const [formData, setFormData] = useState( INITIAL_STATE_FORM_DATA );
  const [formErrors, setFormErrors] = useState([]);

  const classes = useStyles();
  const history = useHistory();


  console.debug(
    "CommentForm",
    "formData=", formData,
    "formErrors", formErrors
  );

  /** Update form data field */
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData(data => ({ ...data, [name]: value }));
  }
    
  const handleSubmit = async (e) => {
    e.preventDefault();

    const comment = {...formData, comment};

    const result = await CapConApi.addProjectComment(comment);
    
    if (result.id) {
      history.push("/projects");
    } else {
      setFormErrors(result.error);
    }
  };

  return (
    <Paper className={classes.paper} elevation={3} component="main">
      <Avatar className={classes.avatar}>
        <FeedbackOutlinedIcon />
      </Avatar>
      <Box py={4}>
        <Typography component="h1" variant="h5">
          Give Feedback About This Capstone
        </Typography>
      </Box>

      <form onSubmit={handleSubmit} className={classes.form} noValidate>
        <TextField
          className={classes.textField}
          type="text"
          name="comment"
          label="Constructive feedback about project"
          variant="outlined"
          value={formData.name}
          fullWidth
          required
          onChange={handleChange}
        />

        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          type="submit"
        >
          Submit
        </Button>
      </form>
    </Paper>
  );
}

export default CommentForm;
