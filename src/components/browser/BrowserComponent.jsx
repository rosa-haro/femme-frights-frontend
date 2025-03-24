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
import { useLocation, useNavigate } from "react-router-dom";
import "./BrowserComponent.css";

const BrowserComponent = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { pathname } = location;
  const { favorites, watchlist, isLogged } = useSelector((state) => state.userReducer);
  const { activeList, hasSearched, searchResults } = useSelector(
    (state) => state.moviesReducer
  );

  // Reset filters when route changes
  useEffect(() => {
    dispatch(resetBrowserAction());
    setQuery("");
  }, [pathname, dispatch]);

  // Set active list (favorites/watchlist) if route matches
  useEffect(() => {
    if (pathname === "/favorites" && Array.isArray(favorites)) {
      dispatch(setActiveListAction(favorites));
    } else if (pathname === "/watchlist" && Array.isArray(watchlist)) {
      dispatch(setActiveListAction(watchlist));
    }
  }, [pathname, favorites, watchlist, dispatch]);

  // Navigation handlers
  const goToFavorites = () => navigate(isLogged ? "/favorites" : "/signin");
  const goToWatchlist = () => navigate(isLogged ? "/watchlist" : "/signin");
  const goHome = () => navigate("/")

  // Handle search input
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    const searchTerm = query.toLowerCase();
    const listToSearch = [...activeList];

    // If there is a local list in redux (favorites/watchlist)
    if (listToSearch.length > 0) {
      const filtered = listToSearch.filter((movie) =>
        movie.titleEnglish.toLowerCase().includes(searchTerm)
      );
      dispatch(searchMoviesAction(filtered));
      return;
    }

    // If there is no local list: fetch
    try {
      const results = await searchMoviesFetch(query);
      dispatch(searchMoviesAction(results));
    } catch (error) {
      throw error;
    }
  };

  // Handle sort actions
  const handleSort = async (type) => {
    const getSorter =
      (key, asc = true) =>
      (a, b) =>
        asc ? (a[key] > b[key] ? 1 : -1) : a[key] < b[key] ? 1 : -1;

    const listToSort = hasSearched ? [...searchResults] : [...activeList];

    // Sort local list (redux) if there is any (watchlist/favlist)
    if (listToSort.length > 0) {
      let sorted;
      if (type === "AZ") sorted = listToSort.sort(getSorter("titleEnglish"));
      else if (type === "yearAsc")
        sorted = listToSort.sort(getSorter("year", true));
      else if (type === "yearDesc")
        sorted = listToSort.sort(getSorter("year", false));
      else return;

      dispatch(sortMoviesAction(sorted));
      return;
    }

    // If there is no local list: fetch
    try {
      let result;
      if (type === "AZ") result = await sortMoviesAZFetch();
      else if (type === "yearAsc") result = await sortMoviesByYearAscFetch();
      else if (type === "yearDesc") result = await sortMoviesByYearDescFetch();
      else return;

      dispatch(sortMoviesAction(result));
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="browser-container">
      <div className="browser-navmenu">
        <button
          className="button"
          onClick={goHome}
          disabled={pathname === "/"}
        >
          HOME
        <img src="/icons/home.svg" alt="Home" width={23} height={23} />
        </button>
        <button
          className="button"
          onClick={goToFavorites}
          disabled={pathname === "/favorites"}
        >
          Favorites
        <img src="/icons/remove-favorite.svg" alt="List of favorites" width={23} height={23} />
        </button>
        <button
          className="button"
          onClick={goToWatchlist}
          disabled={pathname === "/watchlist"}
        >
          Watchlist
          <img src="/icons/remove-watchlist.svg" alt="Watchlist" width={23} height={23} />
        </button>
      </div>
      {/* Sort */}
      <div>
        <select onChange={(e) => handleSort(e.target.value)} defaultValue="">
          <option value="" disabled>
            Sort by
          </option>
          <option value="AZ">Title A-Z</option>
          <option value="yearAsc">Year (Oldest First)</option>
          <option value="yearDesc">Year (Newest First)</option>
        </select>
      </div>

      {/* Search */}
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search by title..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="button">
        <img src="/icons/search.svg" alt="Search button" width={25} height={25} />
        </button>
      </form>

      {/* Reset button */}
      <div>
        <button
          className="button-pill"
          onClick={() => {
            dispatch(resetBrowserAction());
            setQuery("");
          }}
        >
          Reset Filters
          <img src="/icons/reset.svg" alt="Reset button" width={23} height={23} />
        </button>
      </div>
    </div>
  );
};

export default BrowserComponent;
