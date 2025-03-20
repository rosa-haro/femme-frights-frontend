import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { loadAllMoviesAction } from "./MoviesActions";
import { getAllMoviesFetch } from "../../core/services/moviesFetch";
import { getUserByIdFetch } from "../../core/services/userFetch";
import { getUserDetailsAction, signOutAction } from "../user/UserActions";
import useToggleMovie from "../../core/hooks/useToggleMovie"; 

const MovieListComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const { movies } = useSelector((state) => state.moviesReducer);
  const { isFavorite, isInWatchlist, handleToggleFavorite, handleToggleWatchlist, isLogged } = useToggleMovie();

  const { favorites = [], watchlist = [], token } = useSelector((state) => state.userReducer);

  const loadAllMoviesList = async () => {
    const movieListAux = await getAllMoviesFetch();
    dispatch(loadAllMoviesAction(movieListAux));
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

  const goToDetails = (_id) => {
    navigate("/details", { state: { _id } });
  };

  const chooseMoviesToShow = () => {
    if (location.pathname === "/favorites") return favorites;
    if (location.pathname === "/watchlist") return watchlist;
    return movies;
  };

  const moviesToShow = chooseMoviesToShow();

  return (
    <div>
      {!moviesToShow ? (
        <p>Loading movies...</p>
      ) : moviesToShow.length === 0 ? (
        <p>
          {location.pathname === "/" || !movies.length
            ? "No movies to show"
            : location.pathname === "/favorites"
            ? "Your favorites list is empty."
            : "Your watchlist is empty."}
        </p>
      ) : (
        moviesToShow.map((m, idx) => (
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
