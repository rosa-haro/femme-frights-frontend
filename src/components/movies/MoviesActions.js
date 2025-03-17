export const LOAD_ALL_MOVIES = "LOAD_ALL_MOVIES"

export const loadAllMoviesAction = (movies) => {
    return {
        type: LOAD_ALL_MOVIES,
        payload: movies
    }
}