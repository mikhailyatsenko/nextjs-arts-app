// import { useSearchParams } from 'react-router-dom';
import './item.css';
import { DetailArt } from '../contatiners/ArtsLoader';

interface Props {
  detailArt: DetailArt;
}

const ItemArtPage = ({ detailArt }: Props) => {
  // const [searchParams] = useSearchParams();

  return detailArt.title ? (
    <div className="art-item">
      <h2>{detailArt.artist_display}</h2>
      <h3>{detailArt.title}</h3>
      <img
        className="art-img"
        src={`https://www.artic.edu/iiif/2/${detailArt.image_id}/full/400,/0/default.jpg`}
        alt=""
      />
      <p>{detailArt.provenance_text}</p>
    </div>
  ) : (
    'Loading...'
  );
};

export default ItemArtPage;
