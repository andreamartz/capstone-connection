import React, { useState, useRef } from 'react';
import { Formik, Field, Form, useFormik } from 'formik';
import { useHistory } from "react-router-dom";
import CapConApi from "../api/api";
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/Add';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import './SignupForm.css';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(16),
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
  photoUrl: {
    filter: 'alpha(opacity=0)',
    opacity: 0
  },
  photoUrlContainer: {
    width: 0,
    overflow: 'hidden'
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  }
}));

const emailRegex = /\b[\w.-]+@[\w.-]+.\w{2,4}\b/i;
const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/;
const urlProtocolRegex = /^https?:\/\//;

const validate = values => {
  const errors = {};

  if (!values.username) {
    errors.username = 'Required';
  } else if (values.username.length < 8) {
    errors.username = 'Must be at least 8 characters';
  } else if (values.username.length > 25) {
    errors.username = 'Must be at most 25 characters';
  }

  if (!values.password) {
    errors.password = 'Required';
  }

  if (!values.firstName) {
    errors.firstName = 'Required';
  }

  if (!values.lastName) {
    errors.lastName = 'Required';
  }

  if (values.email && !emailRegex.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (values.portfolioUrl && !urlProtocolRegex.test(values.portfolioUrl)) {
    errors.portfolioUrl = 'URL must begin with http:// or https://'
  } else if (values.portfolioUrl && !urlRegex.test(values.portfolioUrl)) {
    errors.portfolioUrl = 'Invalid URL'
  } 

  if (values.gitHubUrl && !urlProtocolRegex.test(values.gitHubUrl)) {
    errors.gitHubUrl = 'URL must begin with http:// or https://'
  } else if (values.gitHubUrl && !urlRegex.test(values.gitHubUrl)) {
    errors.gitHubUrl = 'Invalid URL'
  }

  return errors;
};


const SignupForm = ({ signup }) => {
  const [fileInputState, setFileInputState] = useState('');
  const [fileData, setFileData] = useState({ fileName: '' });

  let fileEncodedString;

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      email: '',
      bio: null,
      photoUrl: '',
      portfolioUrl: null,
      gitHubUrl: null
    }, validate,
    onSubmit: async values => {
      const formData = {...values, photoUrl: fileData.fileName}
      console.log("FILEENCODEDSTRING: ", fileEncodedString);
      const result = await signup(formData);
    }
  });

  const classes = useStyles();
  const history = useHistory();
  const fileInputRef = useRef();

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    console.log("FILE: ", file);
    updateImageState(file);
  };

  const updateImageState = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);   // converts file contents to a base 64 encoded image

    reader.onloadend = () => {
      // setFormData(data => ({ ...data, photoUrl: reader.result }));
      // fileEncodedString = reader.result;
      setFileData(fileData => ({ ...fileData, fileName: reader.result}))
    };
    
  };

  return (
    <Paper className={classes.paper} elevation={5} component="main">
      <Avatar className={classes.avatar}>
        <AddCircleOutlineOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Signup
      </Typography>

      <form className={classes.form} 
        onSubmit={formik.handleSubmit}
      >
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="username"
          label="Username"
          name="username"
          onChange={formik.handleChange}
          value={formik.values.username}
          error={formik.touched.username && Boolean(formik.errors.username)}
          helperText={formik.touched.username && formik.errors.username}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="password"
          label="Password"
          name="password"
          onChange={formik.handleChange}
          type="password"
          value={formik.values.password}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="firstName"
          label="First name"
          name="firstName"
          onChange={formik.handleChange}
          type="firstName"
          value={formik.values.firstName}
          error={formik.touched.firstName && Boolean(formik.errors.firstName)}
          helperText={formik.touched.firstName && formik.errors.firstName}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="lastName"
          label="Last name"
          name="lastName"
          onChange={formik.handleChange}
          type="lastName"
          value={formik.values.lastName}
          error={formik.touched.lastName && Boolean(formik.errors.lastName)}
          helperText={formik.touched.lastName && formik.errors.lastName}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="email"
          label="Email address"
          name="email"
          onChange={formik.handleChange}
          type="email"
          value={formik.values.email}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="bio"
          label="Bio"
          name="bio"
          onChange={formik.handleChange}
          type="bio"
          value={formik.values.bio}
        />
        <Box my={2}>
          <Box display="flex" alignItems="center">
            <Box mr={2}>
              <Typography className={classes.typography}>
                Photo or avatar image<sup>*</sup>
              </Typography>
            </Box>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => fileInputRef.current.click()}
            >
              Choose File 
            </Button>
            <Box className={classes.photoUrlContainer}>
              <input
                variant="outlined"
                margin="normal"
                id="photoUrl"
                className={classes.photoUrl}
                ref={fileInputRef}
                label="URL of avatar"
                name="photoUrl"
                onChange={handleFileInputChange}
                type="file"
                value={fileInputState}
              />
            </Box>
          </Box>
        </Box>
        {/* Preview the selected image */}
        <Box my={2}>
          {fileData.fileName && (
            <img
              src={fileData.fileName}
              alt="chosen"
              style={{ height: '300px' }}
            />
          )}
        </Box>

        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="portfolioUrl"
          label="URL of portfolio site"
          name="portfolioUrl"
          onChange={formik.handleChange}
          type="portfolioUrl"
          value={formik.values.portfolioUrl}
          error={formik.touched.portfolioUrl && Boolean(formik.errors.portfolioUrl)}
          helperText={formik.touched.portfolioUrl && formik.errors.portfolioUrl}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="gitHubUrl"
          label="URL of GitHub profile"
          name="gitHubUrl"
          onChange={formik.handleChange}
          type="gitHubUrl"
          value={formik.values.gitHubUrl}
          error={formik.touched.gitHubUrl && Boolean(formik.errors.gitHubUrl)}
          helperText={formik.touched.gitHubUrl && formik.errors.gitHubUrl}
        />

        {/* {formErrors.length
          ? <AlertDisplay severity="error" messages={formErrors} />
          : null
        } */}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          size="large"
        >
          Sign Up
        </Button>
      </form>
    </Paper>
  );
}

export default SignupForm;