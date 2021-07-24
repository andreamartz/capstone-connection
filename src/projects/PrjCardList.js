import React, { useState, useEffect } from "react";
import Masonry from 'react-masonry-css';
import { Container } from '@material-ui/core';
import LoadingSpinner from "../common/LoadingSpinner";
import PrjCardVert from './PrjCardVert';
import CapConApi from "../api/api";
import { makeStyles } from '@material-ui/core/styles';
import "./PrjCardList.css";

// See Springboard React Video #6 Forms-Passing Data Up
// CHECK:
// 1. Add state for like counts on all projects (with an id for each like?/project?).
// 2. Create a function that will:
//    a. update the database with another like for the appropriate object.
//    b. check if the database update was successful, and, if so,...
//    c. update the likes state.
// 3. Pass that function down to PrjCardVert
// 4. Find a way to UNlike a project

const useStyles = makeStyles((theme) => ({
  project: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3)
  },
}));

const PrjCardList = ({ username }) => {
  console.debug("PrjCardList");

  const [projects, setProjects] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    async function getAllProjectsOnMount() {
      console.debug("PrjCardList useEffect getAllProjectsOnMount");
      const projects = await CapConApi.getProjects({ username });

      setProjects(projects);
    }

    getAllProjectsOnMount();
  }, [username]); 


  async function toggleLikeProject(projectIdx) {
    console.log("PROJECT INDEX: ", projectIdx);
    const currentUserId = 3;  // CHECK replace currentUserId with currentUser.id once we have auth
    const likerId = currentUserId;  // CHECK replace likerId with currentUser.id once we have auth
    const project = projects[projectIdx];
    console.log("PROJECT: ", project);
    let { id, likesCount, currentUsersLikeId } = project;
    const projectId = id;

    // if project already liked by currentUser, unlike it
    if (currentUsersLikeId) {
      const unlike = await CapConApi.removeProjectLike(currentUsersLikeId);
      console.log("UNLIKE: ", unlike);
      if (unlike) {
        // setProjects([...projects, {...project, likesCount: likesCount--, currentUsersLikeId: null}]);
        // setProjects([...projects, {...projects[projectIdx], likesCount: likesCount-1, currentUsersLikeId: null}]);
        setProjects(currentProjects => {
          const newProjects = [...currentProjects];
          newProjects[projectIdx] = {...newProjects[projectIdx], likesCount: likesCount-1, currentUsersLikeId: null};

          return newProjects;
          
        });
      }
    } else {
      // otherwise, like it
      const like = await CapConApi.addProjectLike({projectId, likerId });  // CHECK replace likerId with currentUser.id once we have auth
      console.log("LIKE: ", like);
      if (like) {
        // setProjects([...projects, {...project, likesCount: likesCount++, currentUsersLikeId: like.id}]);
        // setProjects([...projects, {...projects[projectIdx], likesCount: likesCount+1, currentUsersLikeId: like.id}]);
        setProjects(currentProjects => {
          const newProjects = [...currentProjects];
          newProjects[projectIdx] = {...newProjects[projectIdx], likesCount: likesCount+1, currentUsersLikeId: like.id};

          return newProjects;

          // return [...currentProjects, {...currentProjects[projectIdx], likesCount: likesCount+1, currentUsersLikeId: like.id}]
        });
      }
    }
  }

  if (!projects) return <LoadingSpinner />;

  const breakpoints = {
    default: 3,  // default number of columns
    960: 2,     // at screen width of 1100px, reduce to 2 columns
    600: 1
  }

  console.log("PROJECTS STATE: ", projects);
  
  return (
    <Container>

      {projects.length 
        ? (
          <Masonry
            breakpointCols={breakpoints}
            className="masonry-grid"
            columnClassName="masonry-grid_column"
          >
            {projects.map((p, idx) => (
              <div key={p.id} className={classes.project}>
                <PrjCardVert
                  project={p}
                  toggleLikeProject={() => {toggleLikeProject(idx)}}
                />
              </div>
            ))}
          </Masonry>
        ) : (
          <p>Sorry, no results were found!</p>
        )
      }    
    </Container>
  );
}

export default PrjCardList;