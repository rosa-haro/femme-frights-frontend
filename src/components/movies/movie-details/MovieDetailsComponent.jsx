import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getMovieById,
  getTMDBPosterUrl,
} from "../../../core/services/moviesFetch";
import { loadOneMovieAction } from "../MoviesActions";
import { useLocation, useNavigate } from "react-router-dom";
import useToggleMovie from "../../../core/hooks/useToggleMovie";
import { ClipLoader } from "react-spinners";
import "./MovieDetailsComponent.css";
import MoviePosterComponent from "../movie-poster/MoviePosterComponent";

const MovieDetailsComponent = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = location;
  const { _id } = state;

  const { selectedMovie } = useSelector((state) => state.moviesReducer);
  const {
    isFavorite,
    isInWatchlist,
    handleToggleFavorite,
    handleToggleWatchlist,
    isLogged,
  } = useToggleMovie();

  const [loading, setLoading] = useState(true);

  // Load movie data
  useEffect(() => {
    loadSelectedMovie();
  }, []);

  const loadSelectedMovie = async () => {
    try {
      const movieAux = await getMovieById(_id);
      dispatch(loadOneMovieAction(movieAux));
    } finally {
      setLoading(false);
    }
  };

  // Navigate home
  const goHome = () => {
    navigate("/");
  };

  // Format duration
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

  if (loading || !selectedMovie) {
    return (
      <div className="movie-details">
        <ClipLoader color="#444" size={50} />
      </div>
    );
  }

  return (
    <div className="movie-details-wrapper">
      <div className="movie-details">
        <div className="movie-details-body">
          {/* Poster */}
          <div className="poster">
            <MoviePosterComponent tmdbId={selectedMovie.poster} />
          </div>

          {/* Info */}
          <div className="info">
            <div className="top-row">
              <button className="back-button" onClick={goHome}>
                <img
                  src="/icons/left-arrow.svg"
                  alt="Back"
                  width={25}
                  height={25}
                />
              </button>
            </div>
            <span className="title">{selectedMovie.titleEnglish}</span>
            {selectedMovie.titleEnglish !== selectedMovie.titleOriginal && (
              <span>(Original: {selectedMovie.titleOriginal})</span>
            )}
            <span>
              {selectedMovie.year} | {formatDuration(selectedMovie.duration)}
            </span>
            <span>Directed by: {selectedMovie.director}</span>
            <span>Main cast: {selectedMovie.mainCast.join(", ")}</span>
            <span>Overview: {selectedMovie.overview}</span>

            {isLogged && (
              <div className="actions">
                <button onClick={() => handleToggleFavorite(selectedMovie._id)}>
                  <img
                    src={
                      isFavorite(selectedMovie._id)
                        ? "/icons/remove-favorite.svg"
                        : "/icons/add-favorite.svg"
                    }
                    alt="Favorite"
                    width={20}
                    height={20}
                  />
                  {isFavorite(selectedMovie._id)
                    ? "Remove from favorites"
                    : "Add to favorites"}
                </button>

                <button
                  onClick={() => handleToggleWatchlist(selectedMovie._id)}
                >
                  <img
                    src={
                      isInWatchlist(selectedMovie._id)
                        ? "/icons/remove-watchlist.svg"
                        : "/icons/add-watchlist.svg"
                    }
                    alt="Watchlist"
                    width={20}
                    height={20}
                  />
                  {isInWatchlist(selectedMovie._id)
                    ? "Remove from watchlist"
                    : "Add to watchlist"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsComponent;
