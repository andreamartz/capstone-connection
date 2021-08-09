import React, { useState, useEffect, useContext } from "react";
import clsx from 'clsx';
import { useParams } from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import IconButton from '@material-ui/core/IconButton';
import {Link as MuiLink} from '@material-ui/core';
import { Link as ReactRouterDomLink } from "react-router-dom";
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CapConApi from "../api/api";
import LoadingSpinner from "../common/LoadingSpinner";
import { asyncWrapper } from "../utils";
import CommentList from "../comments/CommentList";
import CommentForm from "../comments/CommentForm";
import PrjCardHoriz from "./PrjCardHoriz";
import UserContext from "../auth/UserContext";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import "./PrjDetailPage.css";


const useStyles = makeStyles((theme) => ({
  hero: {
    display: 'flex',
    flexDirection: 'column',
    marginTop:'4rem',
    paddingTop: theme.spacing(14),
    paddingBottom: theme.spacing(14),
    justifyContent: 'center',
    alignItems: 'center'
  },
  heroTypography: {
    color: '#fff'
  },
  creatorTypography: {
    fontWeight: 'bold'
  },
  title: {
    marginBottom: theme.spacing(10)
  },
  button: {
    borderRadius: '1.2rem',
    marginBottom: theme.spacing(2)
  },
  container: {
    paddingLeft: '0',
    paddingRight: '0',
    maxWidth: 'lg',
    margin: 'auto'
  },
  heroAvatar: {
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(2)
  },
  iconButton: {
    padding: '0',
    color: '##000',
    // opacity: 0.87
  },
  large: {
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
  like: {
    backgroundColor: "e0e0e0",
    display: 'flex',
    alignItems: 'center',
  }
}));

const PrjDetailPage = () => {
  const { id } = useParams();

  const [project, setProject] = useState(null);
  const { currentUser } = useContext(UserContext)

  useEffect(function getProjectOnMount() {
    async function getProject() {
      let project = await CapConApi.getProject(id);
      setProject(project);
    }
    getProject();
  }, [id]); 

  const classes = useStyles();

  // Breakpoints
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down('sm'));
  const flexDirection = isMatch ? "column" : "row";
  const justifyContent = isMatch ? "center" : "space-between";
  const alignItems = isMatch ? "center" : "space-between";

  async function toggleLikeProject(projectIdx) {
    const currentUserId = currentUser.id;
    const likerId = currentUserId;

    let { id, likesCount, currentUsersLikeId } = project;
    const projectId = id;

    // if project already liked by currentUser, unlike it
    if (currentUsersLikeId) {
      const {data, error} = await asyncWrapper(CapConApi.removeProjectLike({ projectId, currentUsersLikeId }));
      if (error) {
        alert("Failed to unlike project. Try again later.");
        return;
      }
      if (data) {
        setProject({...project, likesCount: likesCount-1, currentUsersLikeId: null});
      };
    } else {
      // otherwise, like it
      const {data, error} = await asyncWrapper(CapConApi.addProjectLike({ projectId, likerId }));  // CHECK replace likerId with currentUser.id once we have auth
      if (error) {
        alert ("Failed to like project. Try again later.");
        return;
      }
      if (data.id) {
        setProject({...project, likesCount: likesCount+1, currentUsersLikeId: data.id});
      }
    }
  }

  if (!project) return <LoadingSpinner />;

  return (
    <>
      <Box 
        className={classes.hero} 
        style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${project.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'top center' }}
      >
        <Typography 
          component="h1" 
          variant="h3"
          className={clsx(classes.heroTypography, classes.title)}
        >
          {project.name}
        </Typography>
        <Box 
          display='flex' 
          alignItems='center' 
          className={classes.title}
        >
          <Typography 
            component="h2"
            variant="h6"
            className={classes.heroTypography}
          >
            Created by
          </Typography>
          <Avatar
            src={project.creator.photoUrl}
            className={clsx(classes.large, classes.heroAvatar)}
            alt="project creator"
          />
          <Typography 
            component="h2"
            variant="h6" 
            className={clsx(classes.heroTypography, classes.creatorTypography)}
          >
              <ReactRouterDomLink to={`/users/${project.creator.id}`}>
                <Typography className={clsx(classes.heroTypography, classes.creatorTypography)}
                >
                  {project.creator.firstName.toUpperCase()} {project.creator.lastName.toUpperCase()}
                </Typography>
              </ReactRouterDomLink>

          </Typography>
        </Box>
        <Box
          className={classes.heroTypography}
          display='flex'
          flexDirection={flexDirection}
          justifyContent={justifyContent}
          alignItems={alignItems}
          width='60%'
          maxWidth="710px"
        >
          <Box
            display='flex'
            flexDirection={flexDirection}
            justifyContent={justifyContent}
            alignItems={alignItems}
            width='60%'
          >
            <MuiLink href={project.siteUrl} target="_blank" rel="noopener">
              <Button
                variant="contained"
                color="primary"
                size="large"
                className={classes.button}
                endIcon={<OpenInNewIcon />}  
              >
                Preview Site
              </Button>
            </MuiLink>
            <MuiLink href={project.repoUrl} target="_blank" rel="noopener">
              <Button
                variant="contained"
                size="large"
                className={classes.button}
                endIcon={<OpenInNewIcon />}  
              >
                View Code
              </Button>
            </MuiLink>
          </Box>
          <div id="like" className={classes.like}>
            <IconButton 
              aria-label="like" 
              className ={classes.iconButton} 
              onClick={() => {toggleLikeProject(project.id)}}
            >
              <FavoriteBorderIcon/>
            </IconButton>
            <Box mx={1}>{project.likesCount}</Box>
          </div>
        </Box>
      </Box>
      <Container className={classes.container}>
        <Box mx='auto' width='80%'>
          <PrjCardHoriz project={project} />
        </Box>
        <Box mx='auto' width='80%'>
          <Box
            textAlign="center" 
            pt={10}
            pb={8}
          >
            <Typography
              component="h3"
              variant="h5"
            >
              {`${project.creator.firstName}'s feedback request for the community`.toUpperCase()}
            </Typography>
          </Box>
          <Box
          >
            <Typography>
              {project.feedbackRequest}
            </Typography>
          </Box>
        </Box>
        {project.comments.length ? 
          <Typography
            component="h3"
            variant="h5"
          >
            <Box 
              textAlign="center" 
              mx="auto" 
              pt={10}
              pb={8}
            >
              COMMUNITY FEEDBACK
            </Box>
          </Typography>
        : null} 
          <Box width='80%' mx='auto'>
            {project.comments.length
              ? (
              <CommentList comments={project.comments} projectId = {project.id}/>
              ) : (
              null
              )
            }
          </Box>
        <Typography
          component="h3"
          variant="h5"
        >
          <Box 
            textAlign="center" 
            mx="auto" 
            pt={10}
            pb={8}
          >
            ADD YOUR FEEDBACK
          </Box>
        </Typography>
        <Box>
          <CommentForm projectId={project.id} />
        </Box>
      </Container>
    </>
  );
}

export default PrjDetailPage;