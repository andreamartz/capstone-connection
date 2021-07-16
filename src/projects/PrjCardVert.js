import React from "react";
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
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
  iconButton: {
    padding: '0'
  },
  large: {
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
}));

function PrjCardVert({ 
  likeProject,
  project
}) {

  // console.debug('PrjCardVert');
  const { 
    id,
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
    creator,
    tags
  } = project;
  const classes = useStyles();

  return (
    <Card 
      elevation={3}
      className="vertical prj-card"
    >
      <CardMedia 
        component="img" 
        image={image} 
        alt=""
      />
      <CardContent>
        <Typography component="h3" variant="subtitle1">
          {name}
        </Typography>
        <Typography variant="body1">
          {description}
        </Typography>
      </CardContent>

      <CardActions className={classes.actions}>
        <Box>
          {tags
          ? tags.map(tag => (
            <Chip key={tag.id} size="small" label={tag.text}/> 
          ))
          : null}
        </Box>

        <Box display='flex' align-items='center'>
          {/* <IconButton aria-label="like" className ={classes.iconButton} onClick={() => {likeProject(idx)}}> */}
          <IconButton aria-label="like" className ={classes.iconButton} onClick={likeProject}>
            <FavoriteBorderIcon/>
          </IconButton>
          <Box mx={1}>{prjLikesCount}</Box>
          <ModeCommentOutlinedIcon mx={8}/>
          <Box ml={1}>{prjCommentsCount}</Box>
        </Box>
      </CardActions>
      <Divider variant="middle" className={classes.divider}/>
      <ul>
        <li>
          <Avatar src={creator.photoUrl} className={classes.large} alt="project creator" />

          {creator.firstName}{creator.lastName}
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