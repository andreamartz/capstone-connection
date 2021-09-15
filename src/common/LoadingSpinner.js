import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

/** Presentational component to show when page is loading.
 *
 * It is rendered by NewPrj and ProjectCardList
 *
 * Receives no props
 *
 * NewPrj -> LoadingSpinner
 * ProjectCardList -> LoadingSpinner
 */

const useStyles = makeStyles((theme) => ({
  message: {
    margin: '200px auto 0 auto',
    color: 'tomato',
    fontSize: theme.spacing(3),
    fontWeight: 'bold',
    textAlign: 'center',
  },
}));

/** Loading message used by components that fetch API data. */

function LoadingSpinner() {
  const classes = useStyles();
  return <div className={classes.message}>Loading ...</div>;
}

export default LoadingSpinner;
