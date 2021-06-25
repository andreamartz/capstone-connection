import React from "react";
import Tag from "../tags/Tag";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faComments } from '@fortawesome/free-regular-svg-icons';
import "./PrjCardVert.css";


function PrjCardVert() {
  console.debug('PrjCardVert');

  return (
    <div className="vertical prj-card card">
      <img src="https://via.placeholder.com/250x250?text=p1+image" className="card-img-top" alt=""/>
      <div className="card-body">
        <h5 className="card-title">
          Project Title
        </h5>
        <p className="card-text">Potentially longish description of project goes here.</p>
      </div>
      <div className="card-body d-flex justify-content-between border-top border-secondary-50">
        <span>
          <Tag></Tag>
          <Tag></Tag>
        </span>
        <span><FontAwesomeIcon icon={faComments} /> 3 <FontAwesomeIcon icon={faHeart} /> 5</span>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          <img className="avatar" src="https://via.placeholder.com/75x75?text=avatar" alt="avatar"/>
          Creator Name
        </li>
      </ul>
      <div className="card-body">
        <p className="card-text">I'm looking for any feedback you can provide, including ways to make my code more efficient, how to organize my CSS better, and anything else you can think of. Thank you for your time!!</p>
      </div>
    </div>
  );
}


export default PrjCardVert;