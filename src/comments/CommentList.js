import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import { List } from "@material-ui/core";
import Comment from "./Comment";
import CapConApi from "../api/api";


const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  }
}));


const CommentList = ({ comments }) => {
  console.debug("CommentList");
  const classes = useStyles();

  return (
    <List className={classes.root}>
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
        />
      ))}
    </List>
  );
}

export default CommentList;