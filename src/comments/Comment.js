import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  List,
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
  return (
    <> 
      <ListItem key={comment.id} alignItems="flex-start">
        <ListItemAvatar>
          {/* <Avatar alt="avatar" src={Faker.image.avatar()} /> */}
          <Avatar alt="commenter" src={comment.commenter.photoUrl}/>
        </ListItemAvatar>
        <ListItemText
          primary={
            <Typography className={classes.fonts}>
              {comment.commenter.firstName} {comment.commenter.lastName}
            </Typography>
          }
          secondary={
            <>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                {comment.email}
              </Typography>

              {comment.comment}
            </>
          }
        />
      </ListItem>
      <Divider />
    </>
  );
}


export default Comment;

//MY CODE
// import React from "react";
// import { makeStyles } from '@material-ui/core/styles';
// import Avatar from '@material-ui/core/Avatar';
// import Divider from '@material-ui/core/Divider';
// import Typography from '@material-ui/core/Typography';

// const useStyles = makeStyles((theme) => ({
//   divider: {
//     marginBottom: theme.spacing(2),
//   },
// }));

// const Comment = ({ comment }) => {
//   console.debug("Comment", "comment=", comment);

//   const classes = useStyles();

//   return (
//     <article>
//       <Avatar alt="" src="https://placekitten.com/300/300" />
//       <Typography variant="body1">
//         {comment.comment}
//       </Typography>

//       <Divider variant="middle" className={classes.divider}/>
//     </article>
//   )
// }

// export default Comment;