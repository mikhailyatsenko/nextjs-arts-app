import React from 'react';
import { useArtDatarContext } from '../providers/context';

interface Props {
  changePage: (page: string) => void;
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
