import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { List } from "@material-ui/core";
import Comment from "./Comment";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  }
}));


const CommentList = ({ comments, projectId }) => {
  console.log("CommentList", "comments= ", comments);
  const classes = useStyles();
  // const [ commentsState, setCommentsState ] = useState(comments);
  // console.log("COMMENTSSTATE: ", commentsState);

  return (
    <List className={classes.root}>
      {comments.map((comment, idx) => (
        <Comment
          key={comment.id}
          projectId={projectId}
          comment={comment}
          // commentsState={commentsState}
          idx={idx}
          // setCommentsState={setCommentsState}
        />
      ))}
    </List>
  );
}

export default CommentList;