import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { getAllMoviesFetch } from "../../../core/services/moviesFetch";
import { loadAllMoviesAction, setCurrentPageAction } from "../MoviesActions";
import useToggleMovie from "../../../core/hooks/useToggleMovie";
import { getUserByIdFetch } from "../../../core/services/userFetch";
import { getUserDetailsAction, signOutAction } from "../../user/UserActions";

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

  const moviesPerPage = 6;
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

  const indexOfLast = currentPage * moviesPerPage;
  const indexOfFirst = indexOfLast - moviesPerPage;
  const paginatedMovies = list.slice(indexOfFirst, indexOfLast);

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
    <div>
      {paginatedMovies.map((m) => (
        <div key={m._id}>
          {/* Movie poster */}
          <div>
            {!imageLoaded[m._id] && (
              <div>
                <ClipLoader color="#888" size={30} />
              </div>
            )}
            <img
              src={m.poster}
              alt="Movie poster"
              onLoad={() => handleImageLoad(m._id)}
              style={{ display: imageLoaded[m._id] ? "block" : "none" }}
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

          {/* Movie details */}
          <div>
            <span>{m.titleEnglish}</span>
            {m.titleEnglish !== m.titleOriginal && (
              <span> ({m.titleOriginal})</span>
            )}
          </div>

          <div>
            <span>Year: </span>
            <span>{m.year}</span>
          </div>

          <div>
            <span>Director: </span>
            <span>{m.director}</span>
          </div>

          {/* Action buttons (if user logged) */}
          <div>
            <button onClick={() => goToDetails(m._id)}>Details</button>

            {isLogged && (
              <>
                <button onClick={() => handleToggleFavorite(m._id)}>
                  {isFavorite(m._id)
                    ? "Remove from favorites"
                    : "Add to favorites"}
                </button>

                <button onClick={() => handleToggleWatchlist(m._id)}>
                  {isInWatchlist(m._id)
                    ? "Remove from watchlist"
                    : "Add to watchlist"}
                </button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieListComponent;
