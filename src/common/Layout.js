import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => {
  return {
    page: {
      width: '100%',
    },
    root: {
      display: 'flex',
    },
  };
});

function Layout({ children }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.page}>{children}</div>
    </div>
  );
}

export default Layout;
