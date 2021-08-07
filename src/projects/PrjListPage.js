import React from "react";
import PrjCardList from './PrjCardList';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  typography: {
    paddingBottom: theme.spacing(4),
    marginBottom: theme.spacing(4),
    paddingTop: theme.spacing(8),
    marginTop: theme.spacing(8)
  }
}));


function PrjListPage() {
  const classes = useStyles();

  return (
    <>
      <Typography
        component="h1"
        variant="h2"
        align="center"
        className={classes.typography}
      >
        Community Capstones
      </Typography>
      <PrjCardList userId={null}></PrjCardList>
    </>
  );
}

export default PrjListPage;