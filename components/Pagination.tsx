import { useRouter } from 'next/router';

interface Props {
  totalPages: number;
}

const Pagination: React.FC<Props> = ({ totalPages }) => {
  const router = useRouter();
  const currentPage = router.query.page;
  const currentPageNum = Number(currentPage) || 1;
  const pagesToDisplay: number[] = [];
  const maxPageLimitToDisplay = () =>
    totalPages < 6 ? totalPages : currentPageNum + 6;
  for (let i = currentPageNum; i < maxPageLimitToDisplay(); i++) {
    pagesToDisplay.push(i);
  }

  const changePage = (page: number) => {
    if (page > 0 && page <= totalPages) {
      router.push({
        pathname: '/',
        query: { ...router.query, page },
      });
    }
  };

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
