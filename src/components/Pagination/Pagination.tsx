import { pagesArray } from '../../utils';

interface PaginationType {
  total: number;
  perPage: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
}

// total - загальна кількісьть елементів
// perPage - кількість елементів на сторінці
// currentPage = 1 - //кількість сторінок яка може бути

export const Pagination = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange = () => {},
}: PaginationType) => {
  const pagesAmount = Math.ceil(total / perPage);
  const pagesCountArray: number[] = pagesArray(pagesAmount);

  return (
    <ul className="pagination">
      <li className={currentPage === 1 ? 'page-item disabled' : 'page-item'}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1 ? 'true' : 'false'}
          onClick={() => {
            if (currentPage > 1) {
              onPageChange(currentPage - 1);
            }
          }}
        >
          «
        </a>
      </li>

      {pagesCountArray.map(page => (
        <li
          className={page === currentPage ? 'page-item active' : 'page-item'}
          key={page}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </a>
        </li>
      ))}
      <li
        className={
          currentPage === pagesCountArray.length
            ? 'page-item disabled'
            : 'page-item'
        }
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={
            currentPage === pagesCountArray.length ? 'true' : 'false'
          }
          onClick={() => {
            if (currentPage < pagesAmount) {
              onPageChange(currentPage + 1);
            }
          }}
        >
          »
        </a>
      </li>
    </ul>
  );
};
