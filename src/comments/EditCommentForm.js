import React, { useState, useContext } from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import UserContext from "../auth/UserContext";
import CapConApi from "../api/api";


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


const EditCommentForm = ({ commentState, projectId, idx, setFormVisible, setCommentState }) => {
  const { currentUser } = useContext(UserContext);
  const INITIAL_STATE_FORM_DATA = {
    projectId: projectId,
    commenterId: currentUser.id,
    comment: commentState.comment
  };
  const [formData, setFormData] = useState( INITIAL_STATE_FORM_DATA );
  const [formErrors, setFormErrors] = useState([]);

  const classes = useStyles();

  console.debug(
    "EditCommentForm",
    "COMMENTSTATE: ", commentState,
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

    const result = await CapConApi.updateComment(commentState.id, formData);

    if (result.id) {
      console.log("RESULT OF UPDATING COMMENT: ", result);
      setFormVisible(false);
      console.log("commentState BEFORE: ", commentState);
      setCommentState(commentState => ({...commentState, comment: result.comment}));
      console.log("commentState AFTER: ", commentState);
    } else {
      setFormErrors(result.error);
    }
  };

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