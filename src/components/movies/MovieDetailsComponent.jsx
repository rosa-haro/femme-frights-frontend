import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMovieById } from "../../core/services/moviesFetch";
import { loadOneMovieAction } from "./MoviesActions";
import { useLocation } from "react-router-dom";
import useToggleMovie from "../../core/hooks/useToggleMovie";
import { ClipLoader } from "react-spinners";

const MovieDetailsComponent = () => {
  const location = useLocation();
  const dispatch = useDispatch();
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
  const [imageLoaded, setImageLoaded] = useState(false);

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
      <div>
        <ClipLoader color="#444" size={50} />
      </div>
    );
  }

  return (
    <div>
      {/* Poster */}
      <div>
        {!imageLoaded && (
          <div>
            <ClipLoader color="#888" size={30} />
          </div>
        )}
        <img
          src={selectedMovie.poster}
          alt="Movie poster"
          onLoad={() => setImageLoaded(true)}
          style={{ display: imageLoaded ? "block" : "none" }}
        />
        <figcaption>
          Image provided by{" "}
          <a
            href="https://www.themoviedb.org/"
            target="_blank"
            rel="noreferrer"
          >
            TMDb
          </a>
        </figcaption>
      </div>

      {/* Info */}
      <div>
        <span>{selectedMovie.titleEnglish}</span>
        {selectedMovie.titleEnglish !== selectedMovie.titleOriginal && (
          <span> (Original: {selectedMovie.titleOriginal})</span>
        )}
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
        <span>Overview: </span>
        <span>{selectedMovie.overview}</span>
      </div>

      {/* Buttons (only visible if the user is logged) */}
      {isLogged && (
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
      )}
    </div>
  );
};

export default MovieDetailsComponent;
