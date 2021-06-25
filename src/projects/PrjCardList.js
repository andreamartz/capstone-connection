import React from "react";
import PrjCardVert from './PrjCardVert';
import "./PrjCardList.css";



function PrjCardList({ projects }) {
  console.debug('PrjCardList', 'projects=', projects);
  return (
    <div className="container cards-container border border-secondary-50">
      <div className="row row-cols-auto" data-masonry='{"percentPosition": true }'>
        <PrjCardVert>

        </PrjCardVert>
        <PrjCardVert>

        </PrjCardVert>
        <PrjCardVert>

        </PrjCardVert>
        <PrjCardVert>

        </PrjCardVert>
        <PrjCardVert>

        </PrjCardVert>
        <PrjCardVert>

        </PrjCardVert>
      </div>

    </div>
  );
}

export default PrjCardList;