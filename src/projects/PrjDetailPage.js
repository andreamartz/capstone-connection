import React, { useState, useEffect } from "react";
import clsx from 'clsx';
import { useParams } from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import { makeStyles } from '@material-ui/core/styles';
import CapConApi from "../api/api";
import LoadingSpinner from "../common/LoadingSpinner";
import CommentList from "../comments/CommentList";
import CommentForm from "../comments/CommentForm";
import PrjCardHoriz from "./PrjCardHoriz";
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
    borderRadius: '1.2rem'
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
  console.debug("PrjDetailPage", "id=", id);

  const [project, setProject] = useState(null);

  useEffect(function getProjectOnMount() {
    console.log("INSIDE USEEFFECT");
    
    async function getProject() {
      console.debug("PrjDetailPage useEffect getProjectOnMount");
      let project = await CapConApi.getProject(id);
      console.log("PROJECT: ", project);
      setProject(project);
    }
    getProject();
  }, [id]); 

  const classes = useStyles();

  // async function likeProject(projectId=project.id) {
  //   const likerId = 4;  // CHECK replace likerId with currentUser.id once we have auth
  //   const likeData = {likerId, projectId};

  //   const like = await CapConApi.addProjectLike(likeData);  // CHECK replace likerId with currentUser.id once we have auth

  //   console.log("LIKE: ", like);

  //   console.log("PRJLIKESCOUNT: ", project.prjLikesCount);

  //   if (like) {
  //     setProject({...project, prjLikesCount: project.prjLikesCount++});
  //   }
  // }

  async function toggleLikeProject(projectIdx) {
    const currentUserId = 3;  // CHECK replace currentUserId with currentUser.id once we have auth
    const likerId = currentUserId;  // CHECK replace likerId with currentUser.id once we have auth

    let { id, likesCount, currentUsersLikeId } = project;
    const projectId = id;

    // if project already liked by currentUser, unlike it
    if (currentUsersLikeId) {
      const unlike = await CapConApi.removeProjectLike(currentUsersLikeId);
      console.log("UNLIKE: ", unlike);
      if (unlike) {

        setProject({...project, likesCount: likesCount-1, currentUsersLikeId: null});
      }
    } else {
      // otherwise, like it
      const like = await CapConApi.addProjectLike({projectId, likerId });  // CHECK replace likerId with currentUser.id once we have auth
      console.log("LIKE: ", like);
      if (like) {

        setProject({...project, likesCount: likesCount+1, currentUsersLikeId: like.id});
        console.log("PROJECT AFTER LIKE: ", project);
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
            {project.creator.firstName.toUpperCase()} {project.creator.lastName.toUpperCase()}
          </Typography>
        </Box>
        <Box
          className={classes.heroTypography}
          display='flex'
          justifyContent='space-between'
          width='60%'
          maxWidth="710px"
        >
          <Box
            display='flex'
            justifyContent='space-between'
            width='50%'
          >
            <Link href={project.siteUrl}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                className={classes.button}
                endIcon={<OpenInNewIcon />}  
              >
                Preview Site
              </Button>
            </Link>
            <Link href={project.repoUrl}>
              <Button
                variant="contained"
                size="large"
                className={classes.button}
                endIcon={<OpenInNewIcon />}  
              >
                View Code
              </Button>
            </Link>

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
              <CommentList comments={project.comments} />
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
          <CommentForm />
        </Box>

      </Container>

    </>
  );
}

export default PrjDetailPage;