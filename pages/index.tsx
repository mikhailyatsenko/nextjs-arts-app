import { fetchAllArts, fetchSelectedArt } from '@/services/ArtService';
import { wrapper } from '@/store';
import { TransformedArtsListResponse } from '@/services/ArtService';

import Pagination from '@/components/Pagination';
import ListOfArts from '@/components/ListOfArts';
import SelectedArt from '@/components/SelectedArt';

import Head from 'next/head';
import Search from '@/components/Search';
import SelectItemsPerPage from '@/components/SelectItemsPerPage';

export interface DetailArt {
  artist_display: string;
  title: string;
  image_id: string;
  provenance_text: string;
}

export type Arts = {
  id: number;
  artist_display: string;
  title: string;
  image_id: string;
};

export interface SevereSideProps extends TransformedArtsListResponse {
  limit: string;
  detailArt: DetailArt | null;
}

export default function Home(props: SevereSideProps) {
  const { arts, detailArt, limit, totalPages } = props;
  return (
    <>
      <Head>
        <title>Arts App</title>
        <meta name="description" content="App for load arts info" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Search />
      <SelectItemsPerPage limit={limit} />
      <main>
        <div className="container-arts">
          <ListOfArts arts={arts} />
          {detailArt ? <SelectedArt detailArt={detailArt} /> : null}
        </div>
        {totalPages ? <Pagination totalPages={totalPages} /> : null}
      </main>
    </>
  );
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
