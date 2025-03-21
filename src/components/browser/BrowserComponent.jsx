// ✅ BrowserComponent.jsx - Estable con activeList, búsqueda y sort combinables
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  searchMoviesFetch,
  sortMoviesAZFetch,
  sortMoviesByYearAscFetch,
  sortMoviesByYearDescFetch,
} from "../../core/services/moviesFetch";
import {
  resetBrowserAction,
  searchMoviesAction,
  sortMoviesAction,
  setActiveListAction,
} from "../movies/MoviesActions";
import { useLocation } from "react-router-dom";

const BrowserComponent = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const location = useLocation();

  const { favorites, watchlist } = useSelector((state) => state.userReducer);
  const { activeList, hasSearched, searchResults } = useSelector(
    (state) => state.moviesReducer
  );

  // Establecer la lista activa según la ruta
  useEffect(() => {
    dispatch(resetBrowserAction());
    setQuery("");

    if (location.pathname === "/favorites") {
      dispatch(setActiveListAction(favorites));
    } else if (location.pathname === "/watchlist") {
      dispatch(setActiveListAction(watchlist));
    }
  }, [location.pathname, dispatch, favorites, watchlist]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    const searchTerm = query.toLowerCase();
    const listToSearch = [...activeList];

    if (listToSearch.length > 0) {
      const filtered = listToSearch.filter((movie) =>
        movie.titleEnglish.toLowerCase().includes(searchTerm)
      );
      dispatch(searchMoviesAction(filtered));
      return;
    }

    // Buscar desde API si no hay lista activa (Home sin datos todavía)
    try {
      const results = await searchMoviesFetch(query);
      dispatch(searchMoviesAction(results));
    } catch (error) {
      console.error("Error searching:", error);
    }
  };

  // Ordenar sobre la lista activa
  const handleSort = async (type) => {
    const getSorter =
      (key, asc = true) =>
      (a, b) =>
        asc ? (a[key] > b[key] ? 1 : -1) : a[key] < b[key] ? 1 : -1;

    const listToSort = hasSearched ? [...searchResults] : [...activeList];

    if (listToSort.length > 0) {
      let sorted;
      if (type === "AZ") sorted = listToSort.sort(getSorter("titleEnglish"));
      else if (type === "yearAsc")
        sorted = listToSort.sort(getSorter("year", true));
      else if (type === "yearDesc")
        sorted = listToSort.sort(getSorter("year", false));
      dispatch(sortMoviesAction(sorted));
      return;
    }

    // Si no hay lista en memoria, usamos la API
    try {
      let result;
      if (type === "AZ") result = await sortMoviesAZFetch();
      else if (type === "yearAsc") result = await sortMoviesByYearAscFetch();
      else if (type === "yearDesc") result = await sortMoviesByYearDescFetch();
      dispatch(sortMoviesAction(result));
    } catch (error) {
      console.error("Error sorting:", error);
    }
  };

  return (
    <div>
      <div>
        <select onChange={(e) => handleSort(e.target.value)} defaultValue="">
          <option value="" disabled>
            Sort by
          </option>
          <option value="AZ">Title A-Z</option>
          <option value="yearAsc">Year (Oldest First)</option>
          <option value="yearDesc">Year (Newest First)</option>
        </select>
        <button
          onClick={() => {
            dispatch(resetBrowserAction());
            setQuery("");
          }}
        >
          Reset Filters
        </button>
      </div>

      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search by title..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default BrowserComponent;
