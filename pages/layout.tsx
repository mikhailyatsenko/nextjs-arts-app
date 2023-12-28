import Head from 'next/head';
import Search from '@/components/Search';
import SelectItemsPerPage from '@/components/SelectItemsPerPage';
import Pagination from '@/components/Pagination';
import ListOfArts from '@/components/ListOfArts';
import { TransformedArtsListResponse } from '@/services/ArtService';
import SelectedArt from '@/components/SelectedArt';

export interface DetailArt {
  artist_display: string;
  title: string;
  image_id: string;
  provenance_text: string;
}

interface Props extends TransformedArtsListResponse {
  limit: string;
  detailArt: DetailArt;
}

export type Arts = {
  id: string;
  artist_display: string;
  title: string;
  image_id: string;
};

const Layout = ({ arts, limit, totalPages, detailArt }: Props) => {
  return (
    <>
      <Head>
        <title>Arts App</title>
        <meta name="description" content="App for load arts info" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Search />
        <SelectItemsPerPage limit={limit} />
        <div className="container-arts">
          <ListOfArts arts={arts} />
          {detailArt ? <SelectedArt detailArt={detailArt} /> : null}
        </div>
        {totalPages ? <Pagination totalPages={totalPages} /> : null}
      </main>
    </>
  );
};
export default Layout;
