import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import {
  getAllMoviesFetch,
  getTMDBPosterUrl,
} from "../../../core/services/moviesFetch";
import { loadAllMoviesAction, setCurrentPageAction } from "../MoviesActions";
import useToggleMovie from "../../../core/hooks/useToggleMovie";
import { getUserByIdFetch } from "../../../core/services/userFetch";
import { getUserDetailsAction, signOutAction } from "../../user/UserActions";
import "./MovieListComponent.css";
import MoviePosterComponent from "../movie-poster/MoviePosterComponent";

const MovieListComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const { searchResults, hasSearched, activeList, currentPage } = useSelector(
    (state) => state.moviesReducer
  );
  const {
    isFavorite,
    isInWatchlist,
    handleToggleFavorite,
    handleToggleWatchlist,
    isLogged,
  } = useToggleMovie();
  const { token } = useSelector((state) => state.userReducer);

  const [imageLoaded, setImageLoaded] = useState({});
  const [loading, setLoading] = useState(true);
  const [posterUrls, setPosterUrls] = useState({});

  // Load movies (and user data if logged) when on Home
  useEffect(() => {
    if (location.pathname === "/") {
      setLoading(true);
      loadAllMovies();
    } else {
      setLoading(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (isLogged && token) {
      loadUserInfo();
    }
  }, [isLogged, token]);

  const loadAllMovies = async () => {
    setLoading(true);
    try {
      const movieListAux = await getAllMoviesFetch();
      dispatch(loadAllMoviesAction(movieListAux));
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const loadUserInfo = async () => {
    try {
      const auxUser = await getUserByIdFetch(token);
      dispatch(getUserDetailsAction(auxUser));
    } catch (error) {
      localStorage.removeItem("token");
      dispatch(signOutAction());
    }
  };

  // Select movie list to display (search or active list: favlist, watchlist, general)
  const list =
    Array.isArray(searchResults) && hasSearched && searchResults.length > 0
      ? searchResults
      : Array.isArray(activeList) && activeList.length > 0
      ? activeList
      : [];

  const moviesPerPage = 12;
  const totalPages = Math.ceil(list.length / moviesPerPage);

  // Reset current page if not valid
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      dispatch(setCurrentPageAction(1));
    }
  }, [list.length, currentPage, totalPages, dispatch]);

  const goToDetails = (_id) => {
    navigate("/details", { state: { _id } });
  };

  const paginatedMovies = useMemo(() => {
    const indexOfLast = currentPage * moviesPerPage;
    const indexOfFirst = indexOfLast - moviesPerPage;
    return list.slice(indexOfFirst, indexOfLast);
  }, [list, currentPage]);

  // Load movie posters (the ones in the current page)
  useEffect(() => {
    const loadPosters = async () => {
      const posters = {};
      await Promise.all(
        paginatedMovies.map(async (m) => {
          console.log("➡️ Buscando póster para:", m.titleEnglish);
          console.log("🆔 TMDB ID recibido:", m.poster);
          const url = await getTMDBPosterUrl(m.poster);
          console.log("✅ URL del póster obtenido:", url);
          posters[m._id] = url;
        })
      );
      setPosterUrls(posters);
    };

    if (paginatedMovies.length > 0) {
      loadPosters();
    }
  }, [paginatedMovies]);

  const isSearching = hasSearched && searchResults?.length === 0;

  // Handle image load state
  const handleImageLoad = (id) => {
    const aux = { ...imageLoaded, [id]: true };
    setImageLoaded(aux);
  };

  // Show loading spinner while fetching movies
  if (loading) {
    return (
      <div>
        <ClipLoader color="#444" size={50} />
      </div>
    );
  }

  // Show message if list is empty
  if (paginatedMovies.length === 0) {
    return (
      <p>
        {isSearching
          ? "No search results."
          : location.pathname === "/"
          ? "No movies to show"
          : location.pathname === "/favorites"
          ? "Your favorites list is empty."
          : "Your watchlist is empty."}
      </p>
    );
  }

  return (
    <div className="movie-list">
      {paginatedMovies.map((m) => (
        <div className="movie-card" key={m._id}>
          {/* Movie poster */}
          <MoviePosterComponent tmdbId={m.poster} />
          

          {/* Movie info */}
          <h3>
            {m.titleEnglish}
            {m.titleEnglish !== m.titleOriginal && (
              <span className="original-title"> ({m.titleOriginal})</span>
            )}
          </h3>

          <div className="info">Year: {m.year}</div>
          <div className="info">Director: {m.director}</div>
          <div className="actions">
            <button className="details" onClick={() => goToDetails(m._id)}>
              Details
            </button>

            {isLogged && (
              <div className="icon-buttons">
                <button
                  className="button"
                  onClick={() => handleToggleFavorite(m._id)}
                >
                  <img
                    src={
                      isFavorite(m._id)
                        ? "/icons/remove-favorite.svg"
                        : "/icons/add-favorite.svg"
                    }
                    alt="Favorite"
                    width={20}
                    height={20}
                  />
                </button>

                <button
                  className="button"
                  onClick={() => handleToggleWatchlist(m._id)}
                >
                  <img
                    src={
                      isInWatchlist(m._id)
                        ? "/icons/remove-watchlist.svg"
                        : "/icons/add-watchlist.svg"
                    }
                    alt="Watchlist"
                    width={20}
                    height={20}
                  />
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  
  );
};

export default MovieListComponent;
