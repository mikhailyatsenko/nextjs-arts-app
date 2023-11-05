import React from 'react';
import { Arts } from '../contatiners/ArtsLoader';
import { Outlet } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';

interface Props {
  arts: Arts;
  clickOnArtFromList: (index: string, id: string) => void;
  isLoading: boolean;
}

const ListOfArts: React.FC<Props> = ({
  arts,
  isLoading,
  clickOnArtFromList,
}) => {
  const [searchParams] = useSearchParams();

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : arts[0] ? (
        <div
          className={
            Boolean(searchParams.get('details'))
              ? 'arts-list collapsed'
              : 'arts-list'
          }
        >
          {arts.map((art, index) => (
            <div
              onClick={() => clickOnArtFromList((index + 1).toString(), art.id)}
              key={index}
              className="art-item-list"
            >
              <h2>{art.artist_display}</h2>
              <h3>{art.title}</h3>
              <img
                className="art-img"
                src={`https://www.artic.edu/iiif/2/${art.image_id}/full/400,/0/default.jpg`}
                alt=""
              />
            </div>
          ))}
        </div>
      ) : (
        <div>Nothing found</div>
      )}
      <Outlet />
    </>
  );
};

export default ListOfArts;
