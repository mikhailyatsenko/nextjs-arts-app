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
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          // console.log(e.currentTarget.elements[0].value);
          router.push({
            query: {
              search: (e.currentTarget.elements[0] as HTMLInputElement).value,
            },
          });
        }}
      >
        <input
          data-testid="input-search"
          className="form-input"
          defaultValue={search}
          id="query"
        ></input>
        <button data-testid="button-search" type="submit">
          Search
        </button>
      </form>
    </>
  );
};

export default Search;
