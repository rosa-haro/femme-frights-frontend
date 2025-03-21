import { LOAD_ALL_MOVIES, LOAD_ONE_MOVIE, SEARCH_MOVIES, RESET_BROWSER } from "./MoviesActions";

const initialState = {
    movies: [],
    selectedMovie: undefined,
    searchResults: [],
    hasSearched: false, // Otherwise it shows "No search results" unless you write something on the search bar
};

const moviesReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_ALL_MOVIES:
            return {
                ...state,
                movies: action.payload,
                searchResults: [],
                hasSearched: false
            };
        case LOAD_ONE_MOVIE:
            return {
                ...state,
                selectedMovie: action.payload
            }
        case SEARCH_MOVIES:
            return {
                ...state,
                searchResults: action.payload,
                hasSearched: true,
            };
        case RESET_BROWSER:
            return {
                ...state,
                searchResults: [],
                hasSearched: false
            }
        default:
            return state;
    }
};

export default moviesReducer