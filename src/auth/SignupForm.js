import React, { useState, useRef } from 'react';
import { useHistory } from "react-router-dom";
import CapConApi from "../api/api";
// import Alert from "../common/Alert";
import Alert from '@material-ui/lab/Alert';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/Add';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
// import './SignupForm.css';

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
  }
}));


const SignupForm = ({ signup }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    bio: "",
    photoUrl: "",
    portfolioUrl: "",
    gitHubUrl: ""
  });
  const [formErrors, setFormErrors] = useState([]);
  // const [fileInputState, setFileInputState] = useState('');

  const classes = useStyles();
  const history = useHistory();

  console.debug(
    "SignupForm",
    "formData=", formData,
    "formErrors", formErrors
  );

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    let result = await signup(formData);
    if (result.success) {
      history.push("/projects");
    } else {
      setFormErrors(result.errors);
    }
  }

  /** Update form data field */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(data => ({ ...data, [name]: value }));
  }

  // **************
  // Get handleFileInputChange(e), previewFile(file), handleSubmitFileetc. for image upload from NewPrj after bugs are worked out
  // *************
  // const handleFileInputChange = (e) => {
  //   const file = e.target.files[0];
  //   setFormData(data => ({ ...data, photoUrl: file }));
    
  //   previewFile(file);
  // };

  // const previewFile = (file) => {
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);  
  //   reader.onloadend = () => {
  //     setPreviewSource(reader.result);
  //   };
  // };

  // const handleSubmitFile = async (e) => {
  //   console.log('submitting');
  //   e.preventDefault();
  //   if (!previewSource) return;
  //   console.log("PREVIEWSOURCE: ", previewSource);
  //   let result = await CapConApi.addProject(formData);
  //   if (result.success) {
  //     history.push("/projects");
  //   } else {
  //     setFormErrors(result.errors);
  //   }

  //   // uploadImage(previewSource);
  // };

  return (
    <Paper className={classes.paper} elevation={5} component="main">
      <Avatar className={classes.avatar}>
        <AddCircleOutlineOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Signup
      </Typography>
      {/* <form onSubmit={handleSubmit} className={classes.form} noValidate> */}
      <form className={classes.form} noValidate>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          autoFocus
        />
        {formErrors.length
          ? <Alert severity="error">This is an error alert — check it out!</Alert>
          : null
        }
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Sign In
        </Button>
      </form>
    </Paper>
  );
}

export default SignupForm;