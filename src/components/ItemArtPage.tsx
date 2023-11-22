import { DetailArt } from '../contatiners/ArtsLoader';
import { useAppSelector } from '../hooks/useAppSelector';

interface Props {
  closeItemArtPage: () => void;
  detailArt: DetailArt;
}

const ItemArtPage: React.FC<Props> = ({ closeItemArtPage, detailArt }) => {
  const { isSelectedArtLoading } = useAppSelector((state) => state.async);
  return isSelectedArtLoading ? (
    <span className="loader"></span>
  ) : (
    <div className="art-item">
      <h2>{detailArt.artist_display}</h2>
      <h3>{detailArt.title}</h3>
      <img
        className="art-img"
        src={`https://www.artic.edu/iiif/2/${detailArt.image_id}/full/400,/0/default.jpg`}
        alt=""
      />
      <div className="details-provenance">{detailArt.provenance_text}</div>
      <button onClick={closeItemArtPage} className="close-detais-button">
        Close details
      </button>
    </div>
  );
};

export default ItemArtPage;
