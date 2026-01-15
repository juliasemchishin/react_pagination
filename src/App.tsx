import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';
import { useNavigate, useLocation } from 'react-router-dom';
const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const pageFromUrl = Number(params.get('page')) || 1;
  const perPageFromUrl = Number(params.get('perPage')) || 5;

  const [currentPage, setCurrentPage] = useState(pageFromUrl);
  const [perPage, setPerPage] = useState(perPageFromUrl);

  function udateUrl(page: number, perrPage: number) {
    navigate(`?page=${page}&perPage=${perrPage}`, { replace: true });
  }

  function onPageChange(page: number): void {
    if (page !== currentPage) {
      setCurrentPage(page);
      udateUrl(page, perPage);
    }
  }

  const startIndex = (currentPage - 1) * perPage;
  const calculatedEndIndex = startIndex + perPage;
  const endIndex = Math.min(calculatedEndIndex, items.length);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${startIndex + 1} - ${endIndex} of ${items.length})`}
      </p>

      {/* зміна items на сторінці */}
      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={e => {
              setPerPage(Number(e.target.value));
              setCurrentPage(1);
              udateUrl(1, Number(e.target.value));
            }}
            value={perPage}
          >
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        total={items.length}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />

      {/*Items - список який відображаєтьс на сторінці, змінюється в залежності від вибраної кількості*/}
      <ul>
        {items.slice(startIndex, endIndex).map(item => (
          <li key={item} data-cy="item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
