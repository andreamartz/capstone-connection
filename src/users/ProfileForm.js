import React, { useState, useContext, useRef } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import CapConApi from '../api/api';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import AlertDisplay from '../common/AlertDisplay';
import UserContext from '../auth/UserContext';

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
    height: theme.spacing(30),
  },
  icon: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.warning.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  // submit: {
  //   margin: theme.spacing(3, 0, 2),
  // }
}));

const ProfileForm = () => {
  const { currentUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    password: '',
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    email: currentUser.email,
    bio: currentUser.bio,
    portfolioUrl: currentUser.portfolioUrl,
    gitHubUrl: currentUser.gitHubUrl,
  });
  const [formErrors, setFormErrors] = useState([]);

  const classes = useStyles();
  const history = useHistory();
  // const fileInputRef = useRef();
  const { username } = useParams();

  console.debug('ProfileForm', 'formData=', formData, 'formErrors', formErrors);

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    const profileData = {
      password: formData.password,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      bio: formData.bio,
      portfolioUrl: formData.portfolioUrl,
      gitHubUrl: formData.gitHubUrl,
    };

    let updatedUser;

    try {
      updatedUser = await CapConApi.updateProfile(currentUser.id, profileData);
      console.log('UPDATEDUSER: ', updatedUser);
      history.push(`/users/${currentUser.id}`);
    } catch (errors) {
      setFormErrors(errors);
      return;
    }

    setFormData((data) => ({ ...data }));
  };

  /** Update form data field */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((data) => ({ ...data, [name]: value }));
  }
  return (
    <Paper className={classes.paper} elevation={5} component="main">
      <Avatar className={classes.icon}>
        <EditOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Profile
      </Typography>
      <Box my={2} id="form--image-container">
        <img
          src={currentUser.photoUrl}
          alt="current user"
          className={classes.avatar}
        />
      </Box>
      <form className={classes.form} onSubmit={handleSubmit}>
        {/* <TextField
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
        /> */}
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

        {/* {formErrors.length
          ? <Alert type="danger">This is an error alert — check it out!</Alert>
          : null
        } */}
        {formErrors.length ? (
          <AlertDisplay severity="error" messages={formErrors} />
        ) : null}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          size="large"
        >
          Submit
        </Button>
      </form>
    </Paper>
  );
};

export default ProfileForm;
