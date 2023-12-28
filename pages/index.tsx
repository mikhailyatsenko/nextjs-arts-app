import Layout from './layout';
import { DetailArt } from './layout';
import { fetchAllArts, fetchSelectedArt } from '@/services/ArtService';
import { wrapper } from '@/store';
import { TransformedArtsListResponse } from '@/services/ArtService';

interface SevereSideProps extends TransformedArtsListResponse {
  limit: string;
  detailArt: DetailArt;
}

export default function Home(props: SevereSideProps) {
  return <Layout {...props} />;
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const {
      page = '1',
      limit = '5',
      search = '',
      selectedArtId = '',
    } = context.query;
    const artsData = await store.dispatch(
      fetchAllArts.initiate(`${search}&limit=${limit}&page=${page}`)
    );

    let detailArt = null;
    if (selectedArtId) {
      const responseDetailArt = await store.dispatch(
        fetchSelectedArt.initiate(selectedArtId as string)
      );
      detailArt = responseDetailArt.data?.data;
    }
    // await Promise.all(store.dispatch(artsApi.util.getRunningQueriesThunk()));

    return { props: { ...artsData.data, limit, detailArt } };
  }
);
