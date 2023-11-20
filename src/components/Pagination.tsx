import React from 'react';
import { useArtDatarContext } from '../providers/context';

interface Props {
  changePage: (pageNum: number) => void;
}

const Pagination: React.FC<Props> = ({ changePage }) => {
  const { totalPages, currentPage } = useArtDatarContext();
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
        <div
          onClick={() =>
            // dispatch(setCurrentPage((currentPageNum - 1).toString()))
            changePage(currentPageNum - 1)
          }
        >
          &laquo;
        </div>

        {pagesToDisplay.map((page, index) => (
          <div
            key={index}
            onClick={() => changePage(page)}
            className={page === currentPageNum ? 'active' : ''}
          >
            {page}
          </div>
        ))}
        <div
          onClick={() =>
            // dispatch(setCurrentPage((currentPageNum + 1).toString()))
            changePage(currentPageNum + 1)
          }
        >
          &raquo;
        </div>
      </div>
    </>
  );
};

export default Pagination;
