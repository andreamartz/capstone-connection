import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import UserContext from '../auth/UserContext';
import CapConApi from '../api/api';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Link as ReactRouterDomLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(8),
    height: 'calc(100vh - 150px)',
  },
  gridContainer: {
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(15),
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  gridHeading: {
    fontWeight: 'bold',
    fontSize: theme.spacing(6),
    color: 'primary',
    paddingBottom: theme.spacing(2),
  },
  gridItem: {
    fontSize: theme.spacing(3),
    paddingBottom: theme.spacing(6),
  },
  welcome: {
    color: '#ff9c2a',
    fontFamily: 'Roboto Mono, sans',
    fontSize: theme.spacing(3),
  },
}));
/** Homepage of site.
 *
 * Shows welcome message or login/register buttons.
 *
 * Routed at /
 *
 * Routes -> Homepage
 */

function Homepage({ signupDemo }) {
  const { currentUser } = useContext(UserContext);
  console.debug('Homepage', 'currentUser=', currentUser);
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <Grid container className={classes.gridContainer}>
        <Grid item>
          <Typography
            className={classes.gridHeading}
            component="h1"
            color="primary"
          >
            Capstone Connections
          </Typography>
        </Grid>
        <Grid item>
          <Typography className={classes.gridItem} component="h1">
            The community that connects with and supports you!
          </Typography>
        </Grid>
        <Grid item>
          <Typography className={classes.welcome}>
            {currentUser && (
              <h2>
                Welcome Back, {currentUser.firstName || currentUser.username}!
              </h2>
            )}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          {!currentUser && (
            <Button variant="contained" color="primary" onClick={signupDemo}>
              Try It Out!
            </Button>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}

export default Homepage;
