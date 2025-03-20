import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { loadAllMoviesAction } from "./MoviesActions";
import { getAllMoviesFetch } from "../../core/services/moviesFetch";
import { getUserByIdFetch } from "../../core/services/userFetch";
import { getUserDetailsAction, signOutAction } from "../user/UserActions";

const MovieListComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation()

  const { favorites, watchlist, isLogged, token } = useSelector((state) => state.userReducer)
  const { movies } = useSelector((state) => state.moviesReducer);

  const loadAllMoviesList = async () => {
    const movieListAux = await getAllMoviesFetch();
    dispatch(loadAllMoviesAction(movieListAux));
  };

  const loadUserMovieList = async () => {
    try {
      const auxUser = await getUserByIdFetch(token);
      dispatch(getUserDetailsAction(auxUser))
    } catch (error) {
      console.error("Error fetching user info:", error);
      dispatch(signOutAction())
    }
  }

  useEffect(() => {
    if (location.pathname === "/") {
        loadAllMoviesList();
    } else if (isLogged && (location.pathname === "/favorites" || location.pathname === "/watchlist")) {
        loadUserMovieList();
    }
}, [location.pathname, isLogged]); 


  const goToDetails = (_id) => {
    navigate("/details", {
      state: {
        _id,
      },
    });
  };

  const chooseMoviesToShow = () => {
    if (location.pathname === "/favorites") return favorites;
    if (location.pathname === "/watchlist") return watchlist;
    return movies;
  }

  const moviesToShow = chooseMoviesToShow()

  return (
    <div>
      {!moviesToShow || moviesToShow.length === 0 ? (
        <div>
          <p>Loading...</p>
        </div>
      ) : (
        moviesToShow.map((m, idx) => (
          <div key={idx}>
            <div>
              <span>{m.titleEnglish}</span>
              {m.titleEnglish !== m.titleOriginal ? (
                <span> ({m.titleOriginal})</span>
              ) : null}
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
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MovieListComponent;
