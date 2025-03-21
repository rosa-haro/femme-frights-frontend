import React, { useState } from 'react'
import MovieListComponent from '../../components/movies/MovieListComponent'
import BrowserComponent from '../../components/browser/BrowserComponent'
import PagerComponent from '../../components/browser/PagerComponent'

const FavoritesPage = () => {

  const [currentPage, setCurrentPage] = useState(1);

  return (
    <>
    <BrowserComponent />
    <MovieListComponent currentPage={currentPage} setCurrentPage={setCurrentPage}/>
    <PagerComponent currentPage={currentPage} setCurrentPage={setCurrentPage}/>
    </>
  )
}

export default FavoritesPage