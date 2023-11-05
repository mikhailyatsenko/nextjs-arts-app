import { useEffect, useState } from 'react';
import Search from '../components/Search';
import ListOfArts from '../components/ListOfArts';
import Pagination from '../components/Pagination';
import MakeError from '../components/MakeError';
import SelectItemsPerPage from '../components/SelectItemsPerPage';
import { Routes, Route } from 'react-router-dom';
import ItemArtPage from '../components/ItemArtPage';
import { useSearchParams } from 'react-router-dom';

export type Arts = {
  id: string;
  artist_display: string;
  title: string;
  image_id: string;
}[];

export interface DetailArt {
  artist_display: string;
  title: string;
  image_id: string;
  provenance_text: string;
}
const ArtsLoader = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState(localStorage.getItem('query') || '');
  const [arts, setArts] = useState<Arts>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState<string>(
    searchParams.get('page') ? searchParams.get('page')! : '1'
  );
  const [selectedArtId, setSelectedArtId] = useState('');
  const [detailArt, setDetailArt] = useState<DetailArt>({} as DetailArt);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  useEffect(() => {
    const fetchArts = async () => {
      setIsLoading(true);

      const url = `https://api.artic.edu/api/v1/artworks/search?q=${query}&limit=${itemsPerPage}&page=${currentPage}&fields=artist_display,title,image_id,id`;
      const response = await fetch(url);
      const dataArts = await response.json();

      if (dataArts.data.length) {
        setArts(dataArts.data);
        setTotalPages(dataArts.pagination.total_pages);
        if (searchParams.get('details')) {
          setSelectedArtId(
            dataArts.data[Number(searchParams.get('details')) - 1].id
          );
        }
      } else {
        setArts([]);
      }
      setIsLoading(false);
    };

    fetchArts();
  }, [query, currentPage, itemsPerPage]);

  useEffect(() => {
    const fetchArtDetailInfo = async () => {
      const url = `https://api.artic.edu/api/v1/artworks/${selectedArtId}?fields=artist_display,title,image_id,provenance_text`;
      const response = await fetch(url);
      const detailArtData = await response.json();

      setDetailArt(detailArtData.data);
    };
    if (selectedArtId) fetchArtDetailInfo();
  }, [selectedArtId, arts]);

  const searchByQuery = (searchQuery: string) => {
    setQuery(searchQuery);
    localStorage.setItem('query', searchQuery);
  };

  const changePage = (page: string) => {
    setCurrentPage(page);
    setSearchParams({ page: page.toString() });
  };

  const clickOnArtFromList = (index: string, id: string) => {
    setSearchParams({ page: currentPage ?? 1, details: index });
    setSelectedArtId(id);
  };

  const changeItemsPerPage = (itemsPerPage: string) => {
    setSearchParams({});
    setItemsPerPage(Number(itemsPerPage));
  };

  return (
    <>
      <Search searchByQuery={searchByQuery} query={query} />
      <SelectItemsPerPage
        itemsPerPage={itemsPerPage}
        changeItemsPerPage={changeItemsPerPage}
      />
      <div className="container-arts">
        <Routes>
          <Route
            path="/"
            element={
              <ListOfArts
                arts={arts}
                isLoading={isLoading}
                clickOnArtFromList={clickOnArtFromList}
              />
            }
          >
            {searchParams.get('details') ? (
              <Route index element={<ItemArtPage detailArt={detailArt} />} />
            ) : null}
          </Route>
        </Routes>
      </div>
      {totalPages ? (
        <Pagination
          currentPage={currentPage}
          changePage={changePage}
          totalPages={totalPages}
        />
      ) : null}
      <MakeError />
    </>
  );
};

export default ArtsLoader;
