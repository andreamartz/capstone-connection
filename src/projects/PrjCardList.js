import React, { useState, useEffect } from "react";
import Masonry from 'react-masonry-css';
import { Container } from '@material-ui/core';
import LoadingSpinner from "../common/LoadingSpinner";
import PrjCardVert from './PrjCardVert';
import CapConApi from "../api/api";
import "./PrjCardList.css";


function PrjCardList() {
  
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
    1100: 2,     // at screen width of 1100px, reduce to 2 columns
    700: 1
  }

  return (
    // <div className="cards-container border border-secondary-50">
    <Container>

      {projects.length 
        ? (
        <Masonry
          breakpointCols={breakpoints}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {projects.map(p => (
            <PrjCardVert className="card" 
              key={p.id}
              name={p.name}
              firstName={p.firstName}
              lastName={p.lastName}
              photoUrl={p.photoUrl}
              image={p.image}
              repoUrl={p.repoUrl}
              siteUrl={p.siteUrl}
              description={p.description}
              feedbackRequest={p.feedbackRequest}
              createdAt={p.createdAt}
              lastModified={p.lastModified}
            />
          ))}
        </Masonry>
        ) : (
          <p className="lead">Sorry, no results were found!</p>
        )
      }    
    </Container>
  );
}

export default PrjCardList;