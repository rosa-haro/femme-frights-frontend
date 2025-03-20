import { LOAD_ALL_MOVIES, LOAD_ONE_MOVIE, SEARCH_MOVIES } from "./MoviesActions";

const initialState = {
    movies: [],
    selectedMovie: undefined,
    searchResults: [],
};

const moviesReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_ALL_MOVIES:
            return {
                ...state,
                movies: action.payload,
            };
        case LOAD_ONE_MOVIE:
            return {
                ...state,
                selectedMovie: action.payload
            }
        case SEARCH_MOVIES:
            return {
                ...state,
                searchResults: action.payload
            };
        default:
            return state;
    }
};

export default moviesReducer