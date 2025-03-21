import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  searchMoviesFetch,
  sortMoviesAZFetch,
  sortMoviesByYearAscFetch,
  sortMoviesByYearDescFetch
} from '../../core/services/moviesFetch';
import {
  resetBrowserAction,
  searchMoviesAction,
  sortMoviesAction
} from '../movies/MoviesActions';
import { useLocation } from 'react-router-dom';

const BrowserComponent = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const location = useLocation();

  const { favorites, watchlist } = useSelector((state) => state.userReducer);

  useEffect(() => {
    dispatch(resetBrowserAction());
    setQuery("");
  }, [location.pathname]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    const searchTerm = query.toLowerCase();

    if (location.pathname === "/favorites") {
      const results = favorites.filter(movie =>
        movie.titleEnglish.toLowerCase().includes(searchTerm)
      );
      dispatch(searchMoviesAction(results));
      return;
    }

    if (location.pathname === "/watchlist") {
      const results = watchlist.filter(movie =>
        movie.titleEnglish.toLowerCase().includes(searchTerm)
      );
      dispatch(searchMoviesAction(results));
      return;
    }

    try {
      const results = await searchMoviesFetch(query);
      dispatch(searchMoviesAction(results));
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handleSort = async (type) => {
    let sorted;

    const getSorter = (key, asc = true) => (a, b) =>
      asc ? a[key] > b[key] ? 1 : -1 : a[key] < b[key] ? 1 : -1;

    const currentList =
      location.pathname === "/favorites"
        ? favorites
        : location.pathname === "/watchlist"
        ? watchlist
        : null;

    if (currentList) {
      if (type === "alpha") {
        sorted = [...currentList].sort(getSorter("titleEnglish"));
      } else if (type === "yearAsc") {
        sorted = [...currentList].sort(getSorter("year", true));
      } else if (type === "yearDesc") {
        sorted = [...currentList].sort(getSorter("year", false));
      }
      dispatch(sortMoviesAction(sorted));
      return;
    }

    try {
      if (type === "alpha") {
        sorted = await sortMoviesAZFetch();
      } else if (type === "yearAsc") {
        sorted = await sortMoviesByYearAscFetch();
      } else if (type === "yearDesc") {
        sorted = await sortMoviesByYearDescFetch();
      }
      dispatch(sortMoviesAction(sorted));
    } catch (error) {
      console.error("Error sorting movies:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search by title..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <div style={{ marginTop: "1rem" }}>
        <button onClick={() => handleSort("alpha")}>Sort A-Z</button>
        <button onClick={() => handleSort("yearAsc")}>Sort by year (oldest first)</button>
        <button onClick={() => handleSort("yearDesc")}>Sort by Year (newest first)</button>
      </div>
    </div>
  );
};

export default BrowserComponent;
