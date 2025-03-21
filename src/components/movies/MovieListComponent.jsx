import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { loadAllMoviesAction, setActiveListAction } from "./MoviesActions";
import { getAllMoviesFetch } from "../../core/services/moviesFetch";
import { getUserByIdFetch } from "../../core/services/userFetch";
import { getUserDetailsAction, signOutAction } from "../user/UserActions";
import useToggleMovie from "../../core/hooks/useToggleMovie";

const MovieListComponent = ({ currentPage, setCurrentPage }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const { searchResults, hasSearched, activeList } = useSelector((state) => state.moviesReducer);
  const { isFavorite, isInWatchlist, handleToggleFavorite, handleToggleWatchlist, isLogged } = useToggleMovie();
  const { token } = useSelector((state) => state.userReducer);

  const loadAllMoviesList = async () => {
    const movieListAux = await getAllMoviesFetch();
    dispatch(loadAllMoviesAction(movieListAux));
    dispatch(setActiveListAction(movieListAux));
  };

  const loadUserMovieList = async () => {
    try {
      const auxUser = await getUserByIdFetch(token);
      dispatch(getUserDetailsAction(auxUser));
    } catch (error) {
      console.error("Error fetching user info:", error);
      dispatch(signOutAction());
    }
  };

  useEffect(() => {
    if (location.pathname === "/") {
      loadAllMoviesList();
      if (isLogged && token) {
        loadUserMovieList();
      }
    }
  }, [location.pathname, isLogged, token]);

  useEffect(() => {
    // Solo resetear si ya no estamos en una página válida
    const totalPages = Math.ceil(searchResults.length / 6);
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [searchResults, currentPage, setCurrentPage]);

  const goToDetails = (_id) => {
    navigate("/details", { state: { _id } });
  };

  const moviesToShow = hasSearched ? searchResults : activeList;
  const isSearching = hasSearched && searchResults.length === 0;

  const moviesPerPage = 6;
  const indexOfLast = currentPage * moviesPerPage;
  const indexOfFirst = indexOfLast - moviesPerPage;
  const paginatedMovies = moviesToShow.slice(indexOfFirst, indexOfLast);

  return (
    <div>
      {!moviesToShow ? (
        <p>Loading movies...</p>
      ) : paginatedMovies.length === 0 ? (
        <p>
          {isSearching
            ? "No search results."
            : location.pathname === "/"
            ? "No movies to show"
            : location.pathname === "/favorites"
            ? "Your favorites list is empty."
            : "Your watchlist is empty."}
        </p>
      ) : (
        paginatedMovies.map((m, idx) => (
          <div key={idx}>
            <div>
              <span>{m.titleEnglish}</span>
              {m.titleEnglish !== m.titleOriginal ? <span> ({m.titleOriginal})</span> : null}
            </div>
            <div>
              <span>Year: </span>
              <span>{m.year}</span>
            </div>
            <div>
              <span>Director: </span>
              <span>{m.director}</span>
            </div>
            <div>
              <button onClick={() => goToDetails(m._id)}>Details</button>

              {isLogged ? (
                <>
                  <button onClick={() => handleToggleFavorite(m._id)}>
                    {isFavorite(m._id) ? "Remove from favorites" : "Add to favorites"}
                  </button>

                  <button onClick={() => handleToggleWatchlist(m._id)}>
                    {isInWatchlist(m._id) ? "Remove from watchlist" : "Add to watchlist"}
                  </button>
                </>
              ) : null}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MovieListComponent;
