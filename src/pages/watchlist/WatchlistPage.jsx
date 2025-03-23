import React, { useState } from 'react'
import MovieListComponent from '../../components/movies/MovieListComponent'
import BrowserComponent from '../../components/browser/BrowserComponent'
import PagerComponent from '../../components/browser/PagerComponent'

const WatchlistPage = () => {

  return (
    <>
    <BrowserComponent />
    <MovieListComponent />
    <PagerComponent />
    </>
  )
}

export default WatchlistPage