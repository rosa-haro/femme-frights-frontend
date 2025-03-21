import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

const PagerComponent = ({ currentPage, setCurrentPage }) => {
  const { searchResults } = useSelector((state) => state.moviesReducer);
  const moviesPerPage = 6;

  const totalPages = Math.ceil(searchResults.length / moviesPerPage);

  const handleClick = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
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

    {Array.from({ length: totalPages }, (_, i) => (
      <button
        key={i}
        onClick={() => handleClick(i + 1)}
        style={{
          fontWeight: currentPage === i + 1 ? 'bold' : 'normal',
          textDecoration: currentPage === i + 1 ? 'underline' : 'none'
        }}
      >
        {i + 1}
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