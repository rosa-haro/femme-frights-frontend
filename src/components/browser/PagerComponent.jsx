import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPageAction } from '../movies/MoviesActions';

const PagerComponent = () => {
  const dispatch = useDispatch();
  const { searchResults, currentPage } = useSelector((state) => state.moviesReducer);
  const moviesPerPage = 6;

  const totalPages = Array.isArray(searchResults)
  ? Math.ceil(searchResults.length / moviesPerPage)
  : 0;
  
  const handleClick = (page) => {
    if (page >= 1 && page <= totalPages) {
      dispatch(setCurrentPageAction(page));
    }
  };

  if (totalPages <= 1) return null;

  return (
    <div style={{ marginTop: "1rem" }}>
    <button
      onClick={() => handleClick(currentPage - 1)}
      style={{
        opacity: currentPage === 1 ? 0.5 : 1,
        cursor: currentPage === 1 ? "not-allowed" : "pointer"
      }}
    >
      ◀
    </button>

    {Array.from({ length: totalPages }, (_, idx) => (
      <button
        key={idx}
        onClick={() => handleClick(idx + 1)}
        style={{
          fontWeight: currentPage === idx + 1 ? 'bold' : 'normal',
          textDecoration: currentPage === idx + 1 ? 'underline' : 'none'
        }}
      >
        {idx + 1}
      </button>
    ))}

    <button
      onClick={() => {
        console.log("NEXT clicked. currentPage:", currentPage);
        handleClick(currentPage + 1)}}
      style={{
        opacity: currentPage === totalPages ? 0.5 : 1,
        cursor: currentPage === totalPages ? "not-allowed" : "pointer"
      }}
    >
      ▶
    </button>
  </div>
  );
};

export default PagerComponent;