import { useEffect } from 'react';
import Search from '../components/Search';
import ListOfArts from '../components/ListOfArts';
import Pagination from '../components/Pagination';
import MakeError from '../components/MakeError';
import SelectItemsPerPage from '../components/SelectItemsPerPage';
import { Routes, Route } from 'react-router-dom';
import ItemArtPage from '../components/ItemArtPage';
import { useSearchParams } from 'react-router-dom';
import { useAppSelector } from '../hooks/useAppSelector';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { setCurrentPage } from '../store/slices/commonSlice';
import { setSelectedArtId } from '../store/slices/asyncSlice';
import { artsApi } from '../services/ArtsService';

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

const ArtsLoader = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const { query, itemsPerPage, currentPage } = useAppSelector(
    (state) => state.common
  );

  const { selectedArtId } = useAppSelector((state) => state.async);

  const { arts, totalPages } = artsApi.useFetchAllArtsQuery(
    `${query}&limit=${itemsPerPage}&page=${currentPage}`,
    {
      selectFromResult: ({ data }) => ({
        arts: data?.data,
        totalPages: data?.pagination.total_pages,
      }),
    }
  );

  const { data: detailArt } = artsApi.useFetchSelectedArtQuery(selectedArtId, {
    selectFromResult: ({ data }) => ({
      data: data?.data,
    }),
  });

  useEffect(() => {
    dispatch(
      setCurrentPage(searchParams.get('page') ? searchParams.get('page')! : '1')
    );
  }, []);

  useEffect(() => {
    if (arts && arts.length && searchParams.get('details')) {
      dispatch(
        setSelectedArtId(
          arts && arts[Number(searchParams.get('details')) - 1].id
        )
      );
    }
  }, [arts]);

  useEffect(() => {
    if (selectedArtId)
      window.scrollTo({
        top: 200,
        behavior: 'smooth',
      });
  }, [selectedArtId]);

  const clickOnArtFromList = (index: string, id: string) => {
    setSearchParams({ page: currentPage ?? 1, details: index });
    dispatch(setSelectedArtId(id));
  };

  const selectItemArtPage = () => {
    setSearchParams({});
  };

  const changePage = (pageNum: number) => {
    setSearchParams({ page: pageNum.toString() });
    dispatch(setCurrentPage(pageNum.toString()));
  };

  const closeItemArtPage = () => {
    setSearchParams({});
  };
  return (
    <>
      <Search />
      <SelectItemsPerPage selectItemArtPage={selectItemArtPage} />
      <div className="container-arts">
        <Routes>
          <Route
            path="/"
            element={
              <ListOfArts
                arts={arts ? arts : []}
                clickOnArtFromList={clickOnArtFromList}
                closeItemArtPage={closeItemArtPage}
              />
            }
          >
            {searchParams.get('details') ? (
              <Route
                index
                element={
                  <ItemArtPage
                    closeItemArtPage={closeItemArtPage}
                    detailArt={detailArt ? detailArt : ({} as DetailArt)}
                  />
                }
              />
            ) : null}
          </Route>
        </Routes>
      </div>
      {totalPages ? (
        <Pagination changePage={changePage} totalPages={totalPages} />
      ) : null}

      <MakeError />
    </>
  );
};

export default ArtsLoader;
