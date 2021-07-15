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
// 7. need htmlFor?

const NewPrj = () => {
  console.debug("NewPrj");

  const [formData, setFormData] = useState( INITIAL_STATE_FORM_DATA );
  const [fileInputState, setFileInputState] = useState('');
  const [formErrors, setFormErrors] = useState([]);
    // array of tag objects from database
  const [dbTags, setDbTags] = useState([]);

  const classes = useStyles();
  const history = useHistory();
  const fileInputRef = useRef();


  useEffect(function getTagsOnMount() {
    console.log("INSIDE USEEFFECT");
    async function getAllTagsOnMount() {
      console.debug("NewPrj useEffect getAllTagsOnMount");
      const dbTags = await CapConApi.getTags();
      setFormData((current) => ({
        ...current, 
        tags: dbTags.map(tag => ({ ...tag, checked: false}))
      }));
      // dbTags = dbTags.map(t => ({ ...t, checked: false}));
      console.log("dbTAGS: ", dbTags);
      // setFormData(data => ({ ...data, tags: [ ...dbTags ]}));  // THIS IS THE PROBLEM
      setDbTags(dbTags); 
    }
    getAllTagsOnMount();
  }, []); 


  console.log("SHOULD RETURN SPINNER? ", !dbTags ? true : false );
  if (!dbTags) return <LoadingSpinner />;

  console.debug(
    "NewPrj",
    "formData=", formData,
    "formErrors", formErrors
  );

  /** Update form data field */
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData(data => ({ ...data, [name]: value }));
  }

  const toggleCheckboxValue = (evt) => {
    console.log("EVENT: ", evt);
    // return;
    console.log("evt.target: ", evt.target);
    const { name, checked } = evt.target;
    console.log("typeof name: ", typeof name, "name: ", name, "checked: ", checked);

    // set checked status on FormData for the tag that changed
    setFormData(data => ({...data, 
      tags: data.tags.map(tag => {
        if (tag.id === Number(name)) {
          return { ...tag, checked };
        } 
        return tag;
      })
    }))
  };
    
    // // if tag checked AND tag is in formData, remove it, otherwise add it
    // // if checked is true and formData.tags.includes(tagId), remove it
    // // else add it
    
    // setFormData(data => ({ ...data, 
    //   tags: [...data.tags, data.tags[idx]={...data.tags[idx], "checked": checked}]}));

    // console.log("toggleCheckboxValue -> formData: ", formData);
  

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    console.log("FILE: ", file);
    updateImageState(file);
  };

  const updateImageState = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);   // converts file contents to a base 64 encoded image
    reader.onloadend = () => {
      setFormData(data => ({ ...data, image: reader.result }));
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const tags = formData.tags
      .filter(tag => tag.checked)
      .map(tag => tag.id);

    const project = {...formData, tags};

    const result = await CapConApi.addProject(project);
    
    if (result.id) {
      history.push("/projects");
    } else {
      setFormErrors(result.error);
    }
  };

  if (!dbTags) return <LoadingSpinner />;


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
          onChange={handleChange}
        />
        {dbTags.map((t, idx) => (
          <FormControlLabel
            idx={idx}
            key={t.id}
            control={
              <Checkbox 
                idx={idx}
                // checked={formData.tags[idx].checked}
                checked={formData.tags[idx].checked}
                name={t.id}
                // onChange={evt => toggleCheckboxValue(evt, idx, t.id)}
                onChange={toggleCheckboxValue}
              />
            }
            label={t.text}
          />
        ))}
      
        <Box>
          <Button
            variant="contained"
            color="primary"
            onClick={() => fileInputRef.current.click()}  
          >
            Choose File
          </Button>
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