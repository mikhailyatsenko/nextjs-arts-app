import React, { useEffect, useState } from 'react';
import Search from '../components/Search';
import Content from '../components/Content';
import Pagination from '../components/Pagination';
import MakeError from '../components/MakeError';

export type Arts = {
  artist_display: string;
  title: string;
  image_id: string;
}[];

interface State {
  isLoading: boolean;
  query: string;
  arts: Arts;
  currentPage: number;
  totalPages: number;
}

const ArtsLoader = () => {
  const [state, setState] = useState<State>({
    isLoading: true,
    query: localStorage.getItem('query') || '',
    arts: [{ artist_display: '', title: 'string', image_id: 'string' }],
    currentPage: 1,
    totalPages: 1,
  });

  const fetchArts = async () => {
    setState((prevState) => ({
      ...prevState,
      isLoading: true,
    }));
    const url = `https://api.artic.edu/api/v1/artworks/search?q=${state.query}&limit=5&page=${state.currentPage}&fields=artist_display,title,image_id`;
    const response = await fetch(url);
    const dataArts = await response.json();
    if (dataArts.data.length) {
      setState((prevState) => ({
        ...prevState,
        arts: dataArts.data,
        totalPages: dataArts.pagination.total_pages,
        isLoading: false,
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        arts: [],
        isLoading: false,
      }));
    }
  };

  const searchByQuery = (searchQuery: string) => {
    setState((prevState) => ({
      ...prevState,
      query: searchQuery,
    }));
    localStorage.setItem('query', searchQuery);
  };

  const changePage = (page: number) => {
    setState((prevState) => ({
      ...prevState,
      currentPage: page,
    }));
  };

  useEffect(() => {
    fetchArts();
  }, [state.query, state.currentPage]);

  return (
    <>
      <Search searchByQuery={searchByQuery} query={state.query} />
      <Content arts={state.arts} isLoading={state.isLoading} />
      <Pagination
        currentPage={state.currentPage}
        changePage={changePage}
        totalPages={state.totalPages}
      />
      <MakeError />
    </>
  );
};

export default ArtsLoader;
