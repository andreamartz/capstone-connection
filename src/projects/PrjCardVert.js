import React from "react";
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, IconButton, Typography } from '@material-ui/core';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ModeCommentOutlinedIcon from '@material-ui/icons/ModeCommentOutlined';
import "./PrjCardVert.css";


const useStyles = makeStyles((theme) => ({
  divider: {
    marginBottom: theme.spacing(2),
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  }, 
}))

function PrjCardVert({ 
  name,
  image,
  repoUrl,
  siteUrl,
  description, 
  feedbackRequest, 
  createdAt, 
  lastModified,
  prjLikesCount,
  prjCommentsCount,
  firstName, 
  lastName, 
  photoUrl,
  tags}) {

  console.debug('PrjCardVert');

  const classes = useStyles();

  return (
    <Card 
      elevation={3}
      className="vertical prj-card"
    >
      <CardMedia 
        component="img" 
        image={image} alt=""
      />
      <CardContent>
        <Typography component="h3" variant="title">
          {name}
        </Typography>
        <Typography variant="body1">
          {description}
        </Typography>
      </CardContent>

      <CardActions className={classes.actions}>
        <Box>
          {tags.map(tag => (
            <Chip size="small" label={tag.tagText}/> 
          ))}
        </Box>

        <Box display='flex' align-items='center'>
          <FavoriteBorderIcon/>
          <Box mx={1}>{prjLikesCount}</Box>
          <ModeCommentOutlinedIcon mx={8}/>
          <Box ml={1}>{prjCommentsCount}</Box>
        </Box>
      </CardActions>
      <Divider variant="middle" className={classes.divider}/>
      <ul>
        <li>
          <img src='https://via.placeholder.com/75x75?text=user+photo' alt="project creator" />
          {firstName}{lastName}
        </li>
      </ul>
      <Divider variant="middle" className={classes.divider}/>
      <CardContent>
        <Typography>{feedbackRequest}</Typography>
      </CardContent>
    </Card>
  );
}


export default PrjCardVert;