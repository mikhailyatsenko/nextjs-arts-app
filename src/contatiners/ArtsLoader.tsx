import { useEffect, useState } from 'react';
import Search from '../components/Search';
import ListOfArts from '../components/ListOfArts';
import Pagination from '../components/Pagination';
import MakeError from '../components/MakeError';
import SelectItemsPerPage from '../components/SelectItemsPerPage';
import { Routes, Route } from 'react-router-dom';
import ItemArtPage from '../components/ItemArtPage';
import { useSearchParams } from 'react-router-dom';

import { ArtDataContext } from '../providers/context';

import { useAppSelector } from '../hooks/useAppSelector';
import { useAppDispatch } from '../hooks/useAppDispatch';

import { setCurrentPage } from '../store/slices/commonSlice';
import { setSelectedArtId } from '../store/slices/asyncSlice';
import { fetchArts } from '../store/asyncActions/fetchArts';

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
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const { query, itemsPerPage, currentPage } = useAppSelector(
    (state) => state.common
  );

  const { arts, isLoading, totalPages, selectedArtId } = useAppSelector(
    (state) => state.async
  );

  const [detailArt, setDetailArt] = useState<DetailArt>({} as DetailArt);

  useEffect(() => {
    dispatch(
      setCurrentPage(searchParams.get('page') ? searchParams.get('page')! : '1')
    );
  }, []);

  // useEffect(() => {
  //   if (searchParams.get('details')) {
  //     // const detailsNum = searchParams.get('details');
  //     setSearchParams({ page: currentPage.toString() });
  //   }
  // }, [currentPage]);

  useEffect(() => {
    dispatch(fetchArts());
  }, [query, currentPage, itemsPerPage]);

  useEffect(() => {
    if (arts.length && searchParams.get('details')) {
      dispatch(
        setSelectedArtId(arts[Number(searchParams.get('details')) - 1].id)
      );
    }
  }, [arts]);

  useEffect(() => {
    const fetchArtDetailInfo = async () => {
      const url = `https://api.artic.edu/api/v1/artworks/${selectedArtId}?fields=artist_display,title,image_id,provenance_text`;
      const response = await fetch(url);
      const detailArtData = await response.json();

      setDetailArt(detailArtData.data);
    };
    if (selectedArtId) {
      fetchArtDetailInfo();
      window.scrollTo({
        top: 200,
        behavior: 'smooth',
      });
    }
  }, [selectedArtId, arts]);

  const clickOnArtFromList = (index: string, id: string) => {
    setDetailArt({} as DetailArt);
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
      <ArtDataContext.Provider
        value={{ arts, totalPages, currentPage, detailArt }}
      >
        <Search />
        <SelectItemsPerPage selectItemArtPage={selectItemArtPage} />
        <div className="container-arts">
          <Routes>
            <Route
              path="/"
              element={
                <ListOfArts
                  isLoading={isLoading}
                  clickOnArtFromList={clickOnArtFromList}
                  closeItemArtPage={closeItemArtPage}
                />
              }
            >
              {searchParams.get('details') ? (
                <Route
                  index
                  element={<ItemArtPage closeItemArtPage={closeItemArtPage} />}
                />
              ) : null}
            </Route>
          </Routes>
        </div>
        {totalPages ? <Pagination changePage={changePage} /> : null}
      </ArtDataContext.Provider>

      <MakeError />
    </>
  );
};

export default ArtsLoader;
