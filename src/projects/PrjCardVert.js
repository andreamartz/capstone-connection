import React from "react";
import clsx from 'clsx';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Divider from '@material-ui/core/Divider';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, IconButton, Typography } from '@material-ui/core';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ModeCommentOutlinedIcon from '@material-ui/icons/ModeCommentOutlined';
import Tags from '../tags/Tags';
import "./PrjCardVert.css";
import "../tags/Tags.css";


const useStyles = makeStyles((theme) => ({
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    marginBottom: theme.spacing(1)
  }, 
  iconButton: {
    padding: '0'
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  large: {
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
}));

function PrjCardVert({ 
  toggleLikeProject,
  project
}) {

  console.debug('PrjCardVert');
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
    likesCount,
    currentUsersLikeId,
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
      <Link href={`/projects/${id}`}>
        <CardMedia 
          component="img" 
          image={image} 
          alt=""
        />
      </Link>
      <Divider variant="fullWidth" />
      <CardContent>
        <Typography 
          component="h3"
          variant="subtitle1"
        >
          <Link href={`/projects/${id}`}>
            <Box 
              fontSize="h6.fontSize"
              fontWeight="fontWeightBold"
              lineHeight="normal"
              paddingBottom="1rem"
            >
              {name}
            </Box>
          </Link>

        </Typography>

        <Typography variant="body1">
          {description}
        </Typography>
      </CardContent>

      <CardActions 
        className={classes.actions} 
      >
        <Tags tags={tags} />

        <Box display='flex' align-items='center'>
          <IconButton 
            aria-label="like" 
            className={classes.iconButton} 
            onClick={toggleLikeProject}
          >
            <FavoriteBorderIcon/>
          </IconButton>
          <Box mx={1}>{likesCount}</Box>
          <ModeCommentOutlinedIcon mx={8}/>
          <Box ml={1}>{prjCommentsCount}</Box>
        </Box>
      </CardActions>

      <Divider variant="middle"/>

      <CardContent 
        display='flex' 
        justify-content="space-between" 
        align-items="center"
      >
        <Box display='flex' justify-content="space-between">
          <Avatar 
            src={creator.photoUrl} 
            className={clsx(classes.large, classes.avatar)} 
            alt="project creator" 
          />

          <Box 
            display="flex"
            alignItems="center"
            fontWeight="fontWeightBold"
          >
            {creator.firstName} {creator.lastName}
          </Box>
        </Box>
      </CardContent>

      <Divider variant="middle" />
      <CardContent>
        <Typography>
         {feedbackRequest}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default PrjCardVert;