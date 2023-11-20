import { useArtDatarContext } from '../providers/context';

interface Props {
  closeItemArtPage: () => void;
}

const ItemArtPage: React.FC<Props> = ({ closeItemArtPage }) => {
  const { detailArt } = useArtDatarContext();
  return detailArt.title ? (
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
  ) : (
    <span className="loader"></span>
  );
};

export default ItemArtPage;
