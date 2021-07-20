import React, { useState, useEffect } from "react";
import Masonry from 'react-masonry-css';
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
import PrjCardList from '../projects/PrjCardList';
import { makeStyles } from '@material-ui/core/styles';
import CapConApi from "../api/api";
import LoadingSpinner from "../common/LoadingSpinner";
import PrjCardVert from '../projects/PrjCardVert';
import "./UserDetailPage.css";

const useStyles = makeStyles((theme) => ({
  // hero: {
  //   display: 'flex',
  //   flexDirection: 'column',
  //   marginTop:'4rem',
  //   paddingTop: theme.spacing(14),
  //   paddingBottom: theme.spacing(14),
  //   justifyContent: 'center',
  //   alignItems: 'center'
  // },
  // heroTypography: {
  //   color: '#fff'
  // },
  // creatorTypography: {
  //   fontWeight: 'bold'
  // },
  // title: {
  //   marginBottom: theme.spacing(10)
  // },
  // button: {
  //   borderRadius: '1.2rem'
  // },
  // container: {
  //   paddingLeft: '0',
  //   paddingRight: '0',
  //   maxWidth: 'lg',
  //   margin: 'auto'
  // },
  // heroAvatar: {
  //   marginLeft: theme.spacing(3),
  //   marginRight: theme.spacing(2)
  // },
  // iconButton: {
  //   padding: '0',
  //   color: '##000',
  //   // opacity: 0.87
  // },
  // large: {
  //   width: theme.spacing(6),
  //   height: theme.spacing(6),
  // },
  // like: {
  //   backgroundColor: "e0e0e0",
  //   display: 'flex',
  //   alignItems: 'center',
  // }
}));

const UserDetailPage = () => {
  
  const { username } = useParams();
  console.debug("UserDetailPage", "username=", username);

  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState(null);

  const classes = useStyles();

  useEffect(() => {
    async function getUserOnMount() {
      console.debug("UserDetailPage useEffect getUserOnMount");
      const user = await CapConApi.getUser(username);
      console.log("USER FROM USER DETAIL PAGE: ", user);
      setUser(user);
    }

    getUserOnMount();
  }, [username]); 



  // async function likeProject(projectIdx) {
  //   const likerId = 4;  // CHECK replace likerId with currentUser.id once we have auth
  //   const projectId = user.projects[projectIdx].id;
  //   const like = await CapConApi.addProjectLike({likerId, projectId});  // CHECK replace likerId with currentUser.id once we have auth
  //   console.log(projectIdx);
  //   console.log("LIKE: ", like);
  //   if (like) {
  //     setUser({...user, projects: [...user.projects, user.projects[projectIdx].prjLikesCount++]});
  //   }
  // }

  if (!user) return <LoadingSpinner />;

  const breakpoints = {
    default: 3,  // default number of columns
    960: 2,     // at screen width of 1100px, reduce to 2 columns
    600: 1
  }


  return (
    <Container>
      <PrjCardList username={username}/>
      
      {/* {user.projects.length 
        ? (
        <Masonry
          breakpointCols={breakpoints}
          className="masonry-grid"
          columnClassName="masonry-grid_column"
        >
          {user.projects.map((project, idx) => (
            <div key={project.id} className={classes.project}>
              <PrjCardVert
                project={project}
                // likeProject={() => {likeProject(idx)}}
              />
            </div>
          ))}
        </Masonry>
        ) : (
          <p>Sorry, no results were found!</p>
        )
      }     */}
    </Container>
  );
}
 
export default UserDetailPage;

