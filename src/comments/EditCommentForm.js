import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import FeedbackOutlinedIcon from '@material-ui/icons/FeedbackOutlined';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import UserContext from "../auth/UserContext";
import CapConApi from "../api/api";
import "./EditCommentForm.css";


const useStyles = makeStyles((theme) => ({
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


const EditCommentForm = ({ comment, projectId, toggleForm }) => {
  const { currentUser } = useContext(UserContext);
  const INITIAL_STATE_FORM_DATA = {
    projectId: projectId,
    commenterId: currentUser.id,
    comment: comment.comment
  };
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

    const result = await CapConApi.updateComment(formData);

    if (result.id) {
      console.log("RESULT OF UPDATING COMMENT: ", result);
      toggleForm();
    } else {
      setFormErrors(result.error);
    }
  };

    // // const comment = {...formData, comment};

    // const result = await CapConApi.addComment(formData);
    
    // if (result.id) {
    //   console.log("RESULT OF NEW COMMENT SUBMISSION: ", result);
    //   history.push("/projects");
    // } else {
    //   setFormErrors(result.error);
    // }
  // };

  return (
    <Box>
      <form onSubmit={handleSubmit} className={classes.form}>
        <TextField
          className={classes.textField}
          type="text"
          name="comment"
          label="Constructive feedback about project"
          variant="outlined"
          value={formData.comment}
          multiline
          rows={6}
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
    </Box>

  );
}

export default EditCommentForm;