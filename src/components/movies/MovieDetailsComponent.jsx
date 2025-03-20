import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMovieById } from "../../core/services/moviesFetch";
import { loadOneMovieAction } from "./MoviesActions";
import { useLocation } from "react-router-dom";
import useToggleMovie from "../../core/hooks/useToggleMovie";

const MovieDetailsComponent = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const { state } = location;
  const { _id } = state;

  const { selectedMovie } = useSelector((state) => state.moviesReducer);
  const { isFavorite, isInWatchlist, handleToggleFavorite, handleToggleWatchlist, isLogged } = useToggleMovie(); // ✅ Usamos el hook

  useEffect(() => {
    loadSelectedMovie();
  }, []);

  const loadSelectedMovie = async () => {
    const movieAux = await getMovieById(_id);
    dispatch(loadOneMovieAction(movieAux));
  };

  const formatDuration = (duration) => {
    if (!duration || duration.hours === undefined || duration.minutes === undefined) {
      return "Unknown duration";
    }
    const { hours, minutes } = duration;
    return `${hours}h ${minutes}min`;
  };

  return (
    <>
      {!selectedMovie ? (
        <div><p>Loading...</p></div>
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
                {isFavorite(selectedMovie._id) ? "Remove from favorites" : "Add to favorites"}
              </button>

              <button onClick={() => handleToggleWatchlist(selectedMovie._id)}>
                {isInWatchlist(selectedMovie._id) ? "Remove from watchlist" : "Add to watchlist"}
              </button>
            </div>
          ) : null}
        </div>
      )}
    </>
  );
};

export default MovieDetailsComponent;
