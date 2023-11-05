import React from 'react';

interface Props {
  currentPage: string;
  changePage: (page: string) => void;
  totalPages: number;
}

const Pagination: React.FC<Props> = ({
  currentPage,
  changePage,
  totalPages,
}) => {
  const currentPageNum = Number(currentPage);
  const pagesToDisplay: number[] = [];
  const maxPageLimitToDisplay = () =>
    totalPages < 6 ? totalPages : currentPageNum + 6;
  for (let i = currentPageNum; i < maxPageLimitToDisplay(); i++) {
    pagesToDisplay.push(i);
  }
  return (
    <>
      <div className="pagination">
        <div onClick={() => changePage((currentPageNum - 1).toString())}>
          &laquo;
        </div>

        {pagesToDisplay.map((page, index) => (
          <div
            key={index}
            onClick={() => changePage(page.toString())}
            className={page === currentPageNum ? 'active' : ''}
          >
            {page}
          </div>
        ))}
        <div onClick={() => changePage((currentPageNum - 1).toString())}>
          &raquo;
        </div>
      </div>
    </>
  );
};

export default Pagination;
