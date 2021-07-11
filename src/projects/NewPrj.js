import React, { useState, useRef, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import CapConApi from "../api/api";
import LoadingSpinner from "../common/LoadingSpinner";
import Checkbox from '@material-ui/core/Checkbox';
import Alert from "../common/Alert";
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import './NewPrj.css';

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
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  button: {
    margin: theme.spacing(2)
  },
  textField: {
    marginBottom: theme.spacing(2)
  }
}));

// CHECK:
// 1. Fix file input button formatting.
// 2. Add controlled input for tags (I'm envisioning a group of checkboxes) and add tags to formData and INITIAL_STATE_FORM_DATA
// 3. Replace hard-coded creatorId in formData (once we have auth) with currentUser's id (somehow???)
// 4. Add error handling with formErrors state (?? - or is this only for auth forms??)
//    a. missing required fields
//    b. input too long/too short/wrong format
//    c. etc.
// 5. Add form validations with Material UI Formik (see Net Ninja Material UI tut video #28)
// 6. Consider pulling handleChange, handleFileInputChange, and handleSubmit into separate helper functions file(s).

const NewPrj = () => {
  console.debug("NewPrj");
  
  const [tags, setTags] = useState([]);

  useEffect(() => {
    getAllTagsOnMount();
  }, []); 

  async function getAllTagsOnMount() {
    console.debug("NewPrj useEffect getAllTagsOnMount");
    const tags = await CapConApi.getTags();
    setTags(tags); 
  }
  
  const INITIAL_STATE_FORM_DATA = {
    name: "",
    description: "",
    image: "",
    creatorId: "1",
    tags: [],
    repoUrl: "",
    siteUrl: "",
    feedbackRequest: ""
  };

  const classes = useStyles();
  const history = useHistory();
  const [fileInputState, setFileInputState] = useState('');
  const [formData, setFormData] = useState( INITIAL_STATE_FORM_DATA );
  const [formErrors, setFormErrors] = useState([]);

  console.debug(
    "NewPrj",
    "formData=", formData,
    "formErrors", formErrors
  );

  /** Update form data field */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(data => ({ ...data, [name]: value }));
  }

  const toggleCheckboxValue = (evt, idx, id) => {
    console.log("evt.target: ", evt.target);
    let { name, checked } = evt.target;
    console.log("typeof name: ", typeof name, "name: ", name, "checked: ", checked);

    setFormData(data => ({ ...data, 
      tags: [...data.tags, data.tags[idx]={...data.tags[idx], "checked": checked}]}));

    console.log("toggleCheckboxValue -> formData: ", formData);
  }

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    console.log("FILE: ", file);
    previewFile(file);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);   // converts file contents to a base 64 encoded image
    reader.onloadend = () => {
      setFormData(data => ({ ...data, image: reader.result }));
    };
  };

  const handleSubmit = async (e) => {
    console.log('submitting');
    e.preventDefault();
    if (!formData.image) return;

    console.log("FORMDATA: ", formData);
    let result = await CapConApi.addProject(formData);
    console.log("RESULT: ", result);
    if (result.id) {
      setFormData(INITIAL_STATE_FORM_DATA);
      history.push("/projects");
    } else {
      setFormErrors(result.error);
    }
  };

  const fileInputRef = useRef();

  return (
    <Paper className={classes.paper} elevation={5} component="main">
      <Avatar className={classes.avatar}>
        <AddIcon />
      </Avatar>
      <Box py={4}>
        <Typography component="h1" variant="h5">
          Add a New Project
        </Typography>
      </Box>

      {/* <h1 className="title">Upload an Image</h1> */}
      {/* <Alert msg={errMsg} type="danger" /> */}
      {/* <Alert msg={successMsg} type="success" /> */}
      <form onSubmit={handleSubmit} className={classes.form} noValidate>
        <TextField
          className={classes.textField}
          type="text"
          name="name"
          label="Project name"
          variant="outlined"
          value={formData.name}
          fullWidth
          required
          onChange={handleChange}
        />
        <TextField
          className={classes.textField}
          type="text"
          name="repoUrl"
          label="URL of code repository"
          variant="outlined"
          value={formData.repoUrl}
          fullWidth
          required
          onChange={handleChange}
        />
        <TextField
          className={classes.textField}
          type="text"
          name="siteUrl"
          label="URL where app is deployed"
          variant="outlined"
          value={formData.siteUrl}
          fullWidth
          required
          onChange={handleChange}
        />
        <TextField
          className={classes.textField}
          type="text"
          name="description"
          label="Project Description"
          variant="outlined"
          value={formData.description}
          fullWidth
          required
          onChange={handleChange}
        />
        <TextField
          className={classes.textField}
          type="text"
          name="feedbackRequest"
          label="What specific feedback would you like to receive?"
          variant="outlined"
          value={formData.feedbackRequest}
          multiline
          fullWidth
          required
          onChange={handleChange}
        />
        <Box>
          <input
            id="fileInput"
            ref={fileInputRef}
            type="file"
            name="image"
            onChange={handleFileInputChange}
            value={fileInputState}
          />
        </Box>
        {/* Preview the selected image */}
        <Box my={2}>
          {formData.image && (
            <img
              src={formData.image}
              alt="chosen"
              style={{ height: '300px' }}
            />
          )}
        </Box>
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

export default NewPrj;