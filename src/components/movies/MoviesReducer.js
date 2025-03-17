import { LOAD_ALL_MOVIES, LOAD_ONE_MOVIE } from "./MoviesActions";

const initialState = {
    movies: [],
    selectedMovie: undefined,
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
        
        default:
            return state;
    }
};

export default moviesReducer