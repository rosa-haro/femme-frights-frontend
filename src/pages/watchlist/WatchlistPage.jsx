import React, { useState } from "react";
import MovieListComponent from "../../components/movies/movie-list/MovieListComponent";
import BrowserComponent from "../../components/browser/BrowserComponent";
import PagerComponent from "../../components/pager/PagerComponent";

const WatchlistPage = () => {
  return (
    <div>
      <BrowserComponent />
      <MovieListComponent />
      <PagerComponent />
    </div>
  );
};

export default WatchlistPage;
