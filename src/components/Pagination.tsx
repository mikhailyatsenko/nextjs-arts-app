import React from 'react';

interface Props {
  currentPage: number;
  changePage: (page: number) => void;
  totalPages: number;
}

const Pagination: React.FC<Props> = ({
  currentPage,
  changePage,
  totalPages,
}) => {
  const pagesToDisplay: number[] = [];
  const maxPageLimitToDisplay = () =>
    totalPages < 6 ? totalPages : currentPage + 6;
  for (let i = currentPage; i < maxPageLimitToDisplay(); i++) {
    pagesToDisplay.push(i);
  }
  return (
    <>
      <div className="pagination">
        <div onClick={() => changePage(currentPage - 1)}>&laquo;</div>

        {pagesToDisplay.map((page, index) => (
          <div
            key={index}
            onClick={() => changePage(page)}
            className={page === currentPage ? 'active' : ''}
          >
            {page}
          </div>
        ))}
        <div onClick={() => changePage(currentPage + 1)}>&raquo;</div>
      </div>
    </>
  );
};

export default Pagination;
