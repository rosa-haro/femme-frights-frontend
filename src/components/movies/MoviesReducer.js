// ✅ MoviesReducer.js
import {
    LOAD_ALL_MOVIES,
    LOAD_ONE_MOVIE,
    SEARCH_MOVIES,
    SORT_MOVIES,
    RESET_BROWSER,
    SET_ACTIVE_LIST,
    SET_CURRENT_PAGE
  } from "./MoviesActions";
  
  const initialState = {
    movies: [],
    selectedMovie: undefined,
    activeList: [],        // Lista base sobre la que se opera
    searchResults: [],     // Resultado visible (búsqueda o sort)
    hasSearched: false,
    hasSorted: false,
    currentPage: 1
  };
  
  const moviesReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOAD_ALL_MOVIES:
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
        return {
          ...state,
          selectedMovie: action.payload
        };
  
      case SET_ACTIVE_LIST:
        return {
          ...state,
          activeList: action.payload,
          searchResults: action.payload,
          hasSearched: false,
          hasSorted: false,
          currentPage: 1
        };
  
      case SEARCH_MOVIES:
        return {
          ...state,
          searchResults: action.payload,
          hasSearched: true,
          hasSorted: false,
          currentPage: 1
        };
  
      case SORT_MOVIES:
        return {
          ...state,
          searchResults: action.payload,
          hasSorted: true,
          hasSearched: true,
          currentPage: 1
        };
  
      case RESET_BROWSER:
        return {
          ...state,
          searchResults: [],
          hasSearched: false,
          hasSorted: false,
          currentPage: 1
        };
      case SET_CURRENT_PAGE:
        return {
          ...state,
          currentPage: action.payload
        }
  
      default:
        return state;
    }
  };
  
  export default moviesReducer;
  