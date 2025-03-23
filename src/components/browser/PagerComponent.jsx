import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPageAction } from '../movies/MoviesActions';

const PagerComponent = () => {
  const dispatch = useDispatch();
  const { searchResults, activeList, hasSearched, currentPage } = useSelector(
    (state) => state.moviesReducer
  );

  const moviesPerPage = 6;

  const list =
    Array.isArray(searchResults) && hasSearched && searchResults.length > 0
      ? searchResults
      : Array.isArray(activeList) && activeList.length > 0
      ? activeList
      : [];

  const totalPages = Math.ceil(list.length / moviesPerPage);

  const handleClick = (page) => {
    if (page >= 1 && page <= totalPages) {
      dispatch(setCurrentPageAction(page));
    }
  };

  if (totalPages <= 1) return null;

  const getVisiblePages = (current, total) => {
    const around = 1;
    const range = [];

    const left = Math.max(2, current - around);
    const right = Math.min(total - 1, current + around);

    range.push(1);

    if (left > 2) {
      range.push('...');
    }

    for (let i = left; i <= right; i++) {
      range.push(i);
    }

    if (right < total - 1) {
      range.push('...');
    }

    if (total > 1) {
      range.push(total);
    }

    return range;
  };

  return (
    <div>
      <button
        onClick={() => handleClick(currentPage - 1)}
        disabled={currentPage === 1}
      >
        ◀
      </button>

      {getVisiblePages(currentPage, totalPages).map((page, idx) => (
        <button
          key={idx}
          onClick={() => typeof page === 'number' && handleClick(page)}
          disabled={page === '...' || page === currentPage}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => handleClick(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        ▶
      </button>
    </div>
  );
};

export default PagerComponent;
