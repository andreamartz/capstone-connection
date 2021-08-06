import React, { useState, useEffect, useContext } from "react";
import clsx from 'clsx';
import { useParams } from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import EditIcon from '@material-ui/icons/Edit';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import {Link as MuiLink} from '@material-ui/core';
import { Link as ReactRouterDomLink } from "react-router-dom";
import PrjCardList from '../projects/PrjCardList';
import { makeStyles } from '@material-ui/core/styles';
import CapConApi from "../api/api";
import LoadingSpinner from "../common/LoadingSpinner";
import UserContext from "../auth/UserContext";
import "./UserDetailPage.css";

const useStyles = makeStyles((theme) => ({
  hero: {
    display: 'flex',
    flexDirection: 'column',
    marginTop:'4rem',
    paddingTop: theme.spacing(12),
    paddingBottom: theme.spacing(12),
    justifyContent: 'center',
    alignItems: 'center'
  },
  heroTypography: {
    color: '#fff'
  },
  title: {
    marginBottom: theme.spacing(8)
  },
  button: {
    borderRadius: '1.2rem',
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2)
  },
  heroAvatar: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  large: {
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
  heroBio: {
    paddingRight: theme.spacing(3),
    paddingLeft: theme.spacing(3)
  }
}));

const UserDetailPage = () => {
  const { id } = useParams();
  console.debug("UserDetailPage", "username=", id);

  const [user, setUser] = useState(null);

  const { currentUser } = useContext(UserContext);


  useEffect(() => {
    async function getUserOnMount() {
      console.debug("UserDetailPage useEffect getUserOnMount");
      const user = await CapConApi.getUser(id);
      console.log("USER FROM USER DETAIL PAGE: ", user);
      setUser(user);
    }

    getUserOnMount();
  }, [id]); 

  const classes = useStyles();

  if (!user) return <LoadingSpinner />;

  return (
    <>
      <Box 
        className={classes.hero} 
        style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.75)), url(https://res.cloudinary.com/wahmof2/image/upload/v1626811212/Untitled_design.png)`,
          backgroundSize: 'cover',
          backgroundPosition: 'top center' 
        }}
      >
        <Box 
          display="flex" 
          alignItems="center"
          mb={6}
        >
          <Avatar
            src={user.photoUrl}
            className={clsx(classes.large, classes.heroAvatar)}
            alt="project creator"
          />
          <Typography 
            component="h1" 
            variant="h3"
            // className={clsx(classes.heroTypography, classes.title)}
            className={classes.heroTypography}
          >
            {user.firstName} {user.lastName}
          </Typography>
          {currentUser.id === user.id
            ? <ReactRouterDomLink to={`/users/${user.username}/settings`}>
              <Button size="small" variant="contained" color="primary" startIcon={<EditIcon />}className={clsx(classes.heroTypography, classes.button)}>
                Edit Profile
              </Button>
            </ReactRouterDomLink>
            : null
          }
        </Box>

        <Typography 
          component="h2" 
          variant="h5"
          className={clsx(classes.heroTypography, classes.title, classes.heroBio)}
        >
          {user.bio}
        </Typography>
        <Box
          className={classes.heroTypography}
          display='flex'
          justifyContent='space-between'
          width='60%'
          maxWidth="710px"
        >
          <Box
            display='flex'
            justifyContent='center'
            width='50%'
            mx='auto'
          >
            <MuiLink href={user.portfolioUrl} target="_blank" rel="noopener">
              <Button
                variant="contained"
                color="primary"
                size="large"
                className={classes.button}
                endIcon={<OpenInNewIcon />}  
              >
                Portfolio
              </Button>
            </MuiLink>
            <MuiLink href={user.gitHubUrl} target="_blank" rel="noopener">
              <Button
                variant="contained"
                size="large"
                className={classes.button}
                endIcon={<OpenInNewIcon />} 
              >
                GitHub
              </Button>
            </MuiLink>
          </Box>

        </Box>
      </Box>
      <Container>
        <Typography
          component="h3"
          variant="h4"
        >
          <Box 
            textAlign="center" 
            mx="auto" 
            pt={10}
            pb={8}
          >
            {`${user.firstName}'s projects`.toUpperCase()}
          </Box>
        </Typography>

        <PrjCardList userId={id}/>
      </Container>
    </>
  );
}
 
export default UserDetailPage;