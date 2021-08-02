import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography
} from "@material-ui/core";


const useStyles = makeStyles(theme => ({
  fonts: {
    fontWeight: "bold"
  },
  inline: {
    display: "inline"
  }
}));

const Comment = ({ comment }) => {
  const classes = useStyles();

  const { id, commenter } = comment;
  const { firstName, lastName, photoUrl } = commenter;
  return (
    <> 
      <ListItem key={id} alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="commenter" src={photoUrl}/>
        </ListItemAvatar>
        <ListItemText
          primary={
            <Typography className={classes.fonts}>
              {firstName} {lastName}
            </Typography>
          }
          secondary={
            <Typography
              component="span"
              variant="body2"
              className={classes.inline}
              color="textPrimary"
            >
              {comment.comment}
            </Typography>
          }
        />
      </ListItem>
      <Divider />
    </>
  );
}


export default Comment;