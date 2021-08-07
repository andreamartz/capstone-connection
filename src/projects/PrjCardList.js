import React, { useState, useEffect, useContext } from "react";
import Masonry from 'react-masonry-css';
import { Container } from '@material-ui/core';
import LoadingSpinner from "../common/LoadingSpinner";
import SearchForm from '../common/SearchForm';
import PrjCardVert from './PrjCardVert';
import CapConApi from "../api/api";
import UserContext from "../auth/UserContext";
import { makeStyles } from '@material-ui/core/styles';
import { asyncWrapper } from "../utils";
import "./PrjCardList.css";

const useStyles = makeStyles((theme) => ({
  project: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3)
  },
}));

/** Show project cards.
 * 
 * On mount, loads projects from API:
 *   * loads all projects if no userId
 *   * loads user's projects if userId
 *  
 */ 

const PrjCardList = ({ userId }) => {
  const { currentUser } = useContext(UserContext);
  console.debug("PrjCardList");
  
  const [projects, setProjects] = useState([]);
  const [showSearch, setShowSearch] = useState(true);

  const classes = useStyles();

  useEffect(() => {
    async function getAllProjectsOnMount() {
      console.debug("PrjCardList useEffect getAllProjectsOnMount");
      const projects = userId 
        ? (await CapConApi.getUserProjects(userId))
        : (await CapConApi.getProjects());
      
      setProjects(projects);

      if (userId) {
        setShowSearch(false);
      } else {
        setShowSearch(true);
      }
    }

    getAllProjectsOnMount();
  }, [userId]); 

  const search = async (tagText) => {
    const projects = await CapConApi.getProjects(tagText);
    setProjects(projects);
  };

  async function toggleLikeProject(projectIdx) {
    console.log("PrjCardList toggleLikeProject PROJECT INDEX: ", projectIdx);

    const currentUserId = currentUser.id;
    
    const likerId = currentUserId;  // CHECK replace likerId with currentUser.id once we have auth
    const project = projects[projectIdx];
    console.log("PROJECT: ", project);
    let { id, likesCount, currentUsersLikeId } = project;
    const projectId = id;

    // if project already liked by currentUser, unlike it
    if (currentUsersLikeId) {
      const {data, error} = await asyncWrapper(CapConApi.removeProjectLike({ projectId, currentUsersLikeId }));
      if (error) {
        alert("Failed to unlike project. Try again later.");
        return;
      }
      console.log("DATA: ", data);
      if (data) {

        setProjects(currentProjects => {
          const newProjects = [...currentProjects];
          newProjects[projectIdx] = {...newProjects[projectIdx], likesCount: likesCount-1, currentUsersLikeId: null};

          return newProjects;
          
        });
      }
    } else {
      // otherwise, like it
      const {data, error} = await asyncWrapper(CapConApi.addProjectLike({ projectId, likerId }));  // CHECK replace likerId with currentUser.id once we have auth
      if (error) {
        alert ("Failed to like project. Try again later.");
        return;
      }
      console.log("DATA: ", data);
      if (data.id) {

        setProjects(currentProjects => {
          const newProjects = [...currentProjects];
          newProjects[projectIdx] = {...newProjects[projectIdx], likesCount: likesCount+1, currentUsersLikeId: data.id};

          return newProjects;

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
      {showSearch && <SearchForm search={search} />}
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
          <p>Sorry, no projects were found!</p>
        )
      }    
    </Container>
  );
}

export default PrjCardList;