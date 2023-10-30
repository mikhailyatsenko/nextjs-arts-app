import React from 'react';
import { Arts } from '../contatiners/ArtsLoader';

interface Props {
  arts: Arts;
  isLoading: boolean;
}

class Content extends React.Component<Props, Record<string, never>> {
  render() {
    const { arts, isLoading } = this.props;
    console.log('пришло в пропсах в компонент', arts);

    return (
      <>
        {isLoading ? (
          <div>Loading...</div>
        ) : arts[0].title && arts[0].image_id && arts[0].artist_display ? (
          arts.map((art, index) => (
            <div key={index}>
              <h2>{art.artist_display}</h2>
              <h3>{art.title}</h3>
              <img
                className="art-img"
                src={`https://www.artic.edu/iiif/2/${art.image_id}/full/843,/0/default.jpg`}
                alt=""
              />
            </div>
          ))
        ) : (
          <div>Nothing found</div>
        )}
      </>
    );
  }
}

export default Content;
