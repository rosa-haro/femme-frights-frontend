export const LOAD_ALL_MOVIES = "LOAD_ALL_MOVIES"
export const LOAD_ONE_MOVIE = "LOAD_ONE_MOVIE"

export const loadAllMoviesAction = (movies) => {
    return {
        type: LOAD_ALL_MOVIES,
        payload: movies
    }
}

export const loadOneMovieAction = (id) => {
    return {
        type: LOAD_ONE_MOVIE,
        payload: id
    }
}