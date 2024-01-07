import { DetailArt } from '@/pages';
import { useRouter } from 'next/router';

interface Props {
  detailArt: DetailArt;
}

const SelectedArt: React.FC<Props> = ({ detailArt }) => {
  const router = useRouter();

  const closeSelectedArt = () => {
    const route = router.query;
    if (route.hasOwnProperty('selectedArtId')) delete route.selectedArtId;
    router.push({ query: { ...route } });
  };

  return (
    <div className="art-item" id="art-item" data-testid="art-item">
      <h2>{detailArt.artist_display}</h2>
      <h3>{detailArt.title}</h3>
      <img
        className="art-img"
        src={`https://www.artic.edu/iiif/2/${detailArt.image_id}/full/400,/0/default.jpg`}
        alt=""
      />
      <div className="details-provenance">{detailArt.provenance_text}</div>
      <button
        onClick={closeSelectedArt}
        className="close-detais-button"
        data-testid="close-button"
      >
        Close details
      </button>
    </div>
  );
};

export default SelectedArt;
