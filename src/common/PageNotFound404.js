import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  message: {
    margin: '200px auto 0 auto',
    color: 'tomato',
    fontSize: theme.spacing(3),
    fontWeight: 'bold',
    textAlign: 'center',
  },
}));

const PageNotFound404 = () => {
  const classes = useStyles();
  return <div className={classes.message}>Page Not Found</div>;
};

export default PageNotFound404;
