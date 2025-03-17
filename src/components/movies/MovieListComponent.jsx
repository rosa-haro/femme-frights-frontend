import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loadAllMoviesAction } from "./MoviesActions";
import { getAllMoviesFetch } from "../../core/services/moviesFetch";

const MovieListComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { movies } = useSelector((state) => state.moviesReducer);

  useEffect(() => {
    loadMovieList();
  }, []);

  const loadMovieList = async () => {
    const movieListAux = await getAllMoviesFetch();
    dispatch(loadAllMoviesAction(movieListAux));
  };

  const goToDetails = (_id) => {
    navigate("/details", {
      state: {
        _id,
      },
    });
  };

  return (
    <div>
      {!movies || movies.length === 0 ? (
        <div>
          <p>Loading...</p>
        </div>
      ) : (
        movies.map((m, idx) => (
          <div key={idx}>
            <div>
              <span>{m.titleEnglish}</span>
              {m.titleEnglish !== m.titleOriginal ? (
                <span>( {m.titleOriginal})</span>
              ) : null}
            </div>
            <div>
              <span>{m.year}</span>
            </div>
            <div>
              <span>{m.director}</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MovieListComponent;
