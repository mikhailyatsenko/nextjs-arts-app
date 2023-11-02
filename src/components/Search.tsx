import React from 'react';

interface Props {
  searchByQuery: (searchQuery: string) => void;
  query: string;
}

const Search: React.FC<Props> = ({ searchByQuery, query }) => {
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
          const searchQuery = (
            document.getElementById('query') as HTMLInputElement
          ).value;
          searchByQuery(searchQuery);
        }}
      >
        <input className="form-input" defaultValue={query} id="query"></input>
        <button type="submit">Search</button>
      </form>
    </>
  );
};

export default Search;
