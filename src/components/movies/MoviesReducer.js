import {
  LOAD_ALL_MOVIES,
  LOAD_ONE_MOVIE,
  SEARCH_MOVIES,
  SORT_MOVIES,
  RESET_BROWSER,
  SET_ACTIVE_LIST,
  SET_CURRENT_PAGE
} from "./MoviesActions";

// Initial state for movie-related data
const initialState = {
  movies: [],
  selectedMovie: undefined,
  activeList: [],
  searchResults: [],
  hasSearched: false,
  hasSorted: false,
  currentPage: 1
};

const moviesReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ALL_MOVIES:
      // Load all movies and reset search/sort results
      return {
        ...state,
        movies: action.payload,
        activeList: action.payload,
        searchResults: action.payload,
        hasSearched: false,
        hasSorted: false,
        currentPage: 1
      };

    case LOAD_ONE_MOVIE:
      // Load one movie by ID for detail view
      return {
        ...state,
        selectedMovie: action.payload
      };

    case SET_ACTIVE_LIST:
      // Update currently visible list (Home, Favorites, Watchlist)
      return {
        ...state,
        activeList: action.payload,
        searchResults: action.payload,
        hasSearched: false,
        hasSorted: false
      };

    case SEARCH_MOVIES:
      // Set search results
      return {
        ...state,
        searchResults: action.payload,
        hasSearched: true,
        hasSorted: false,
        currentPage: 1
      };

    case SORT_MOVIES:
      // Sort current results 
      return {
        ...state,
        searchResults: action.payload,
        hasSorted: true,
        hasSearched: true,
        currentPage: 1
      };

    case RESET_BROWSER:
      // Clear search/sort state (e.g. on view change)
      return {
        ...state,
        searchResults: [],
        hasSearched: false,
        hasSorted: false,
        currentPage: 1
      };

    case SET_CURRENT_PAGE:
      // Change current page
      return {
        ...state,
        currentPage: action.payload
      };

    default:
      return state;
  }
};

export default moviesReducer;
