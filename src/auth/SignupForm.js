import React, { useState, useRef } from 'react';
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
import AlertDisplay from '../common/AlertDisplay';

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
  submit: {
    margin: theme.spacing(3, 0, 2),
  }
}));


const SignupForm = ({ signup }) => {
  const [fileInputState, setFileInputState] = useState('');
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: null,
    bio: null,
    photoUrl: "",
    portfolioUrl: null,
    gitHubUrl: null
  });
  const [formErrors, setFormErrors] = useState([]);

  const classes = useStyles();
  const history = useHistory();
  const fileInputRef = useRef();

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

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    console.log("FILE: ", file);
    updateImageState(file);
  };

  const updateImageState = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);   // converts file contents to a base 64 encoded image

    reader.onloadend = () => {
      setFormData(data => ({ ...data, photoUrl: reader.result }));
      console.log("FORMDATA: ", formData);
    };
    
  };

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

      <form className={classes.form} 
        onSubmit={handleSubmit}
      >
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          onChange={handleChange}
          type="text"
          value={formData.username}
          autoComplete="username"
          autoFocus
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="password"
          label="Password"
          name="password"
          onChange={handleChange}
          type="password"
          value={formData.password}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="firstName"
          label="First name"
          name="firstName"
          onChange={handleChange}
          type="firstName"
          value={formData.firstName}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="lastName"
          label="Last name"
          name="lastName"
          onChange={handleChange}
          type="lastName"
          value={formData.lastName}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="email"
          label="Email address"
          name="email"
          onChange={handleChange}
          type="email"
          value={formData.email}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="bio"
          label="Bio"
          name="bio"
          onChange={handleChange}
          type="bio"
          value={formData.bio}
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
            <Box id="photoUrl-container">
              <input
                variant="outlined"
                margin="normal"
                id="photoUrl"
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
          {formData.photoUrl && (
            <img
              src={formData.photoUrl}
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
          onChange={handleChange}
          type="portfolioUrl"
          value={formData.portfolioUrl}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="gitHubUrl"
          label="URL of GitHub profile"
          name="gitHubUrl"
          onChange={handleChange}
          type="gitHubUrl"
          value={formData.gitHubUrl}
        />

        {formErrors.length
          ? <AlertDisplay severity="error" messages={formErrors} />
          : null
        }
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