import React from 'react';
import { Arts } from '../contatiners/ArtsLoader';
import { Routes, Route } from 'react-router-dom';

interface Props {
  arts: Arts;
  isLoading: boolean;
}

const Content: React.FC<Props> = ({ arts, isLoading }) => {
  console.log('пришло в пропсах в компонент', arts);

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : arts[0] ? (
        <div className="arts-list">
          {arts.map((art, index) => (
            <div key={index} className="art-item-list">
              <h2>{art.artist_display}</h2>
              <h3>{art.title}</h3>
              <img
                className="art-img"
                src={`https://www.artic.edu/iiif/2/${art.image_id}/full/843,/0/default.jpg`}
                alt=""
              />
            </div>
          ))}
        </div>
      ) : (
        <div>Nothing found</div>
      )}
    </>
  );
};

export default Content;
