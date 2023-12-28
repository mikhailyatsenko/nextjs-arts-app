import React from 'react';
import { useRouter } from 'next/router';

const Search: React.FC = () => {
  const router = useRouter();
  const { search } = router.query;
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
          router.push({
            query: {
              search: (e.currentTarget.query as HTMLInputElement).value,
            },
          });
        }}
      >
        <input className="form-input" defaultValue={search} id="query"></input>
        <button type="submit">Search</button>
      </form>
    </>
  );
};

export default Search;
