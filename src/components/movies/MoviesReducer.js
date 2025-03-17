import { LOAD_ALL_MOVIES } from "./MoviesActions";

const initialState = {
    movies: [],
};

const moviesReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_ALL_MOVIES:
            return {
                ...state,
                movies: action.payload,
            };
        
        default:
            return state;
    }
};

export default moviesReducer