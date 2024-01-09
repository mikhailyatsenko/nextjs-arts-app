import React from 'react';
import { Arts } from '@/pages';
import { useRouter } from 'next/router';

interface Props {
  arts: Arts[];
  // closeItemArtPage: () => void;
}

const ListOfArts: React.FC<Props> = ({ arts }) => {
  const router = useRouter();
  const clickOnArtFromList = (selectedArtId: string) => {
    router.push({
      query: {
        ...router.query,
        selectedArtId: selectedArtId,
      },
      hash: 'art-item',
    });
  };

  const closeSelectedArt = () => {
    const route = router.query;
    if (route.hasOwnProperty('selectedArtId')) delete route.selectedArtId;
    router.push({ query: { ...route } });
  };

  return (
    <div
      className={`arts-list ${
        router.query.hasOwnProperty('selectedArtId') ? ' collapsed' : ''
      }`}
    >
      <div
        onClick={closeSelectedArt}
        className="art-list-overlay"
        data-testid="art-list-overlay"
      ></div>
      {arts &&
        arts.map((art, index) => (
          <div
            onClick={() => clickOnArtFromList(art.id.toString())}
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
      {/* </div>
      ) : (
        <div>Nothing found</div>
      )}
      <Outlet /> */}
    </div>
  );
};

export default ListOfArts;
