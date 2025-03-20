import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMovieById } from "../../core/services/moviesFetch";
import { loadOneMovieAction } from "./MoviesActions";
import { useLocation } from "react-router-dom";
import {
  getUserByIdFetch,
  toggleFavoriteFetch,
  toggleWatchlistFetch,
} from "../../core/services/userFetch";
import { getUserDetailsAction } from "../user/UserActions";

const MovieDetailsComponent = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const { state } = location;
  const { _id } = state;

  const { selectedMovie } = useSelector((state) => state.moviesReducer);
  const { favorites, watchlist, isLogged, token } = useSelector(
    (state) => state.userReducer
  );

  useEffect(() => {
    loadSelectedMovie();
  }, []);

  const loadSelectedMovie = async () => {
    const movieAux = await getMovieById(_id);
    dispatch(loadOneMovieAction(movieAux));
  };

  const isFavorite = (id) => favorites.some((fav) => fav._id === id);
  const isInWatchlist = (id) => watchlist.some((movie) => movie._id === id);

  const handleToggleFavorite = async (idMovie) => {
    if (!token) {
      console.error("User not logged in");
      return;
    }
    try {
      await toggleFavoriteFetch(token, idMovie);
      const updatedUserData = await getUserByIdFetch(token);
      dispatch(getUserDetailsAction(updatedUserData));
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  const handleToggleWatchlist = async (idMovie) => {
    if (!token) {
      console.error("User not logged in");
      return;
    }
    try {
      await toggleWatchlistFetch(token, idMovie);
      const updatedUserData = await getUserByIdFetch(token);
      dispatch(getUserDetailsAction(updatedUserData));
    } catch (error) {
      console.error("Error toggling watchlist:", error);
    }
  };

  const formatDuration = (duration) => {
    if (
      !duration ||
      duration.hours === undefined ||
      duration.minutes === undefined
    ) {
      return "Unknown duration";
    }

    const { hours, minutes } = duration;
    return `${hours}h ${minutes}min`;
  };

  return (
    <>
      {!selectedMovie ? (
        <div>
          <p>Loading...</p>
        </div>
      ) : (
        <div>
          <div>
            <span>{selectedMovie.titleEnglish}</span>
            {selectedMovie.titleEnglish !== selectedMovie.titleOriginal ? (
              <span>(Original: {selectedMovie.titleOriginal})</span>
            ) : null}
          </div>
          <div>
            <span>{selectedMovie.year} | </span>
            <span>{formatDuration(selectedMovie.duration)}</span>
          </div>
          <div>
            <span>Directed by: </span>
            <span>{selectedMovie.director}</span>
          </div>
          <div>
            <span>Main cast: </span>
            <span>{selectedMovie.mainCast.join(", ")}</span>
          </div>
          <div>
            <span>{selectedMovie.overview}</span>
          </div>
          {isLogged ? (
            <div>
              <button onClick={() => handleToggleFavorite(selectedMovie._id)}>
                {isFavorite(selectedMovie._id)
                  ? "Remove from favorites"
                  : "Add to favorites"}
              </button>

              <button onClick={() => handleToggleWatchlist(selectedMovie._id)}>
                {isInWatchlist(selectedMovie._id)
                  ? "Remove from watchlist"
                  : "Add to watchlist"}
              </button>
            </div>
          ) : null}
        </div>
      )}
    </>
  );
};

export default MovieDetailsComponent;
