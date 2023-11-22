import React from 'react';
import { useAppSelector } from '../hooks/useAppSelector';

interface Props {
  changePage: (pageNum: number) => void;
  totalPages: number;
}

const Pagination: React.FC<Props> = ({ changePage, totalPages }) => {
  const { currentPage } = useAppSelector((state) => state.common);
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
        <div onClick={() => changePage(currentPageNum - 1)}>&laquo;</div>

        {pagesToDisplay.map((page, index) => (
          <div
            key={index}
            onClick={() => changePage(page)}
            className={page === currentPageNum ? 'active' : ''}
          >
            {page}
          </div>
        ))}
        <div onClick={() => changePage(currentPageNum + 1)}>&raquo;</div>
      </div>
    </>
  );
};

export default Pagination;
