// import { ReactNode } from 'react';
import Head from 'next/head';
import Search from '@/components/Search';
import SelectItemsPerPage from '@/components/SelectItemsPerPage';
// import Pagination from '@/components/Pagination';
import ListOfArts from '@/components/ListOfArts';
import { TransformedArtsListResponse } from '@/services/ArtService';

export type Arts = {
  id: string;
  artist_display: string;
  title: string;
  image_id: string;
};

export interface DetailArt {
  artist_display: string;
  title: string;
  image_id: string;
  provenance_text: string;
}

const Layout = ({ arts }: TransformedArtsListResponse) => {
  // console.log(arts, totalPages);
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
        <SelectItemsPerPage />
        <div className="container-arts">
          <ListOfArts arts={arts} />
          {/* {searchParams.get('details') ? (
            <ItemArtPage
              closeItemArtPage={closeItemArtPage}
              detailArt={detailArt ? detailArt : ({} as DetailArt)}
            />
          ) : null} */}
        </div>
        {/* {totalPages ? ( */}
        {/* <Pagination
          // changePage={changePage}
          totalPages={totalPages}
        /> */}
        {/* // ) : null} */}

        {/* <MakeError /> */}
      </main>
    </>
  );
};
export default Layout;
