import React, { useState, useRef } from 'react';
import { useHistory } from "react-router-dom";
import CapConApi from "../api/api";
import Alert from "../common/Alert";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
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
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
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
  }
}));


const NewPrj = () => {
  const classes = useStyles();
  const history = useHistory();
  const [previewSource, setPreviewSource] = useState('');  // previewSource is the raw string that represents the file
  const [fileInputState, setFileInputState] = useState('');
  const [formData, setFormData] = useState({
    name: "Submission10!",
    creatorId: "1",
    repoUrl: "https://developer.mozilla.org/en-US/docs/Web/API/FileReader10",
    siteUrl: "https://developer.mozilla.org/en-US/docs/Web/API/FileReader10",
    // description: "Description of First Submission",
    // feedbackRequest: "",
    // tags: "",
    image: ""
  });
  const [formErrors, setFormErrors] = useState([]);
  // const [fileInputState, setFileInputState] = useState('');


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

  // ORIGINAL FROM JAMES QUICK VIDEO
  // const handleFileInputChange = (e) => {
  //   const file = e.target.files[0];
  //   previewFile(file);
  //   // setSelectedFile(file);
  //   // setFileInputState(e.target.value);
  // };

  const handleFileInputChange =  (e) => {
    // const { name, value } = e.target.files[0];
    const file = e.target.files[0];
    console.log("FILE: ", file);
    previewFile(file);
    console.log("TYPEOF PREVIEWSOURCE: ", typeof previewSource);
    // let base64EncodedImage = previewSource.slice(5);
    let base64EncodedImage = previewSource;
    console.log("BASE64ENCODEDIMAGE: ", base64EncodedImage);
    setFormData(data => ({ ...data, image: base64EncodedImage }));
    

    // setSelectedFile(file);
    // setFileInputState(e.target.value);
  };



  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);   // converts file contents to a base 64 encoded image
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
    console.log("PREVIEWSOURCE: ", previewSource);
  };

  const handleSubmit = async (e) => {
    console.log('submitting');
    e.preventDefault();
    if (!previewSource) return;

    // MY CODE
    console.log("PREVIEWSOURCE: ", previewSource);
    console.log("FORMDATA: ", formData);
    let result = await CapConApi.addProject(formData);
    console.log("RESULT: ", result);
    if (result.project) {
      history.push("/projects");
    } else {
      setFormErrors(result.error);
    }
    // END MY CODE

    // uploadImage(previewSource);
  };

  // ORIGINAL FROM JAMES QUICK
  // const uploadImage = async (base64EncodedImage) => {
  //   // console.log("BASE64ENCODEDIMAGE: ", base64EncodedImage);
  //   const data = { data: base64EncodedImage };
  //   console.log("DATA: ", data);
  //   const image = await CapConApi.addProject(data);
  // };
  
  const fileInputRef = useRef();

  return (
    <Paper className={classes.paper} elevation={5} component="main">
      <Avatar className={classes.avatar}>
        <AddIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Add a New Project
      </Typography>
      {/* <h1 className="title">Upload an Image</h1> */}
      {/* <Alert msg={errMsg} type="danger" /> */}
      {/* <Alert msg={successMsg} type="success" /> */}
      <form onSubmit={handleSubmit} className={classes.form} noValidate>

        <input
          id="fileInput"
          ref={fileInputRef}
          type="file"
          name="image"
          onChange={handleFileInputChange}
          value={fileInputState}
          className="form-input"
        />

        {formErrors.length
          ? <Alert type="danger" messages={formErrors} />
          : null
        }
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          type="submit"
        >
          Submit
        </Button>
      </form>
      {previewSource && (
        <img
          src={previewSource}
          alt="chosen"
          style={{ height: '300px' }}
        />
      )}
    </Paper>
  );
}

export default NewPrj;