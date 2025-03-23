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

  return (
    <div>
    <button
      onClick={() => handleClick(currentPage - 1)}
      disabled={currentPage === 1}
    >
      ◀
    </button>

    {Array.from({ length: totalPages }, (_, idx) => {
      const pageNumber = idx + 1;
      return (
      <button
        key={idx}
        onClick={() => handleClick(pageNumber)}
        disabled={currentPage === pageNumber}
      >
        {idx + 1}
      </button>
      )
    })}

    <button
      onClick={() => {
        handleClick(currentPage + 1)}}
      style={{
        opacity: currentPage === totalPages ? 0.5 : 1,
      }}
    >
      ▶
    </button>
  </div>
  );
};

export default PagerComponent;