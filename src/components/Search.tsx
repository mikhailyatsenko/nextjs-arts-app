import React from 'react';
import { useAppSelector } from '../hooks/useAppSelector';
import { useDispatch } from 'react-redux';
import { searchClick } from '../store/slices/commonSlice';

interface Props {
  // searchByQuery: (searchQuery: string) => void;
  // query: string;
}

const Search: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const { query } = useAppSelector((state) => state.common);

  return (
    <>
      <p className="description">
        This is an application for searching works of art. Enter the name of the
        author or the title of the artwork.
      </p>
      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          const searchQuery = (e.currentTarget.query as HTMLInputElement).value;
          dispatch(searchClick(searchQuery));
        }}
      >
        <input className="form-input" defaultValue={query} id="query"></input>
        <button type="submit">Search</button>
      </form>
    </>
  );
};

export default Search;
