import React, { useState, useEffect } from "react";
import Masonry from 'react-masonry-css';
import { Container } from '@material-ui/core';
import LoadingSpinner from "../common/LoadingSpinner";
import PrjCardVert from './PrjCardVert';
import CapConApi from "../api/api";
import { makeStyles } from '@material-ui/core/styles';
import "./PrjCardList.css";

const useStyles = makeStyles((theme) => ({
  project: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3)
  },
}));


const PrjCardList = () => {
  const classes = useStyles();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    getAllProjectsOnMount();
  }, []); 

  async function getAllProjectsOnMount() {
    console.debug("ProjectList useEffect getAllProjectsOnMount");
    const projects = await CapConApi.getProjects();
    setProjects(projects);
  }

  if (!projects) return <LoadingSpinner />;

  const breakpoints = {
    default: 3,  // default number of columns
    960: 2,     // at screen width of 1100px, reduce to 2 columns
    600: 1
  }

  return (
    // <div className="cards-container border border-secondary-50">
    <Container>

      {projects.length 
        ? (
        <Masonry
          breakpointCols={breakpoints}
          className="masonry-grid"
          columnClassName="masonry-grid_column"
        >
          {projects.map(p => (
            <div key={p.id} className={classes.project}>
              <PrjCardVert
                name={p.name}
                image={p.image}
                repoUrl={p.repoUrl}
                siteUrl={p.siteUrl}
                description={p.description}
                feedbackRequest={p.feedbackRequest}
                createdAt={p.createdAt}
                lastModified={p.lastModified}
                prjLikesCount={p.prjLikesCount}
                prjCommentsCount={p.prjCommentsCount}
                firstName={p.creator.firstName}
                lastName={p.creator.lastName}
                photoUrl={p.creator.photoUrl}
                tags={p.tags}
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