import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { loadAllMoviesAction } from "./MoviesActions";
import { getAllMoviesFetch } from "../../core/services/moviesFetch";

const MovieListComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation()

  const { favorites, watchlist } = useSelector((state) => state.userReducer)
  const { movies } = useSelector((state) => state.moviesReducer);

  const loadMovieList = async () => {
    const movieListAux = await getAllMoviesFetch();
    dispatch(loadAllMoviesAction(movieListAux));
  };

  useEffect(() => {
    if (location.pathname === "/") {
      
      loadMovieList();
    }
  }, [location.pathname]);


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
