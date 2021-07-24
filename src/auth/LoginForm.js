import React, { useState } from 'react';
import Alert from '@material-ui/lab/Alert';
import { useHistory } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingTop: theme.spacing(8),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    height: '60vh',
    width: '22rem',
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
}));

const LoginForm = ({ login }) => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  const [formErrors, setFormErrors] = useState([]);
  const history = useHistory();

  /** Handle form submit:
   * 
   * Calls login function prop and, if successful, redirect to /projects.
   */

  const handleSubmit = async (e) => {
    e.preventDefault();
    let result = await login(formData);
    if (result.success) {
      history.push("/projects");
    } else {
      setFormErrors(result.errors);
    }
  }

  /** Update form data field */
  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData(data => ({ ...data, [name]: value }));
  }

  return (
    <Paper className={classes.paper} elevation={5} component="main" maxWidth="xs">
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <form className={classes.form} noValidate>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
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
        <Grid container>
          <Grid item>
            {"Don't have an account? "}
            <Link href="/signup">
              {"Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}

export default LoginForm;