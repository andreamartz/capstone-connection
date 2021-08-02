import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import {
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography
} from "@material-ui/core";
import UserContext from "../auth/UserContext";
import EditCommentForm from "./EditCommentForm";
import "./Comment.css";


const useStyles = makeStyles(theme => ({
  fonts: {
    fontWeight: "bold"
  },
  inline: {
    display: "inline"
  },
  button: {
    backgroundColor: "#ff9c2a",
  }
}));

const Comment = ({ comment, projectId }) => {
  const [ formVisible, setFormVisible ] = useState(false);

  const { currentUser } = useContext(UserContext);
  const classes = useStyles();

  const { id, commenter } = comment;
  const { firstName, lastName, photoUrl } = commenter;

  const toggleForm = () => {
    setFormVisible(!formVisible);
  }

  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center"> 
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
        {currentUser.id === comment.commenter.id 
        ? <Button variant="contained"
            startIcon={<EditIcon />}
            color="secondary"
            className={classes.button}
            onClick={toggleForm}
          >
            Edit
          </Button>
        : null
        }
      </Box>
      {/* <Box className={ formVisible ? null : "form-container" }>
        <EditCommentForm comment={comment} projectId={projectId} className={ formVisible ? null : "form" } />
      </Box> */}
      {formVisible 
        && <Box>
          <EditCommentForm comment={comment} projectId={projectId} toggleForm={toggleForm}/>
        </Box>
      }
      <Divider />
    </>
  );
}


export default Comment;