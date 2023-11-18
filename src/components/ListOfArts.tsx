import React from 'react';
// import { Arts } from '../contatiners/ArtsLoader';
import { Outlet } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { useArtDatarContext } from '../providers/context';

interface Props {
  clickOnArtFromList: (index: string, id: string) => void;
  closeItemArtPage: () => void;
  isLoading: boolean;
}

const ListOfArts: React.FC<Props> = ({
  // arts,
  isLoading,
  clickOnArtFromList,
  closeItemArtPage,
}) => {
  const [searchParams] = useSearchParams();
  const { arts } = useArtDatarContext();
  return (
    <>
      {isLoading ? (
        <span className="loader"></span>
      ) : arts[0] ? (
        <div
          className={
            Boolean(searchParams.get('details'))
              ? 'arts-list collapsed'
              : 'arts-list'
          }
        >
          <div onClick={closeItemArtPage} className="art-list-overlay"></div>
          {arts.map((art, index) => (
            <div
              onClick={() => clickOnArtFromList((index + 1).toString(), art.id)}
              key={index}
              className="art-list-item"
              data-testid="art-list-item"
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
