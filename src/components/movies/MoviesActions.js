// Action types
export const LOAD_ALL_MOVIES = "LOAD_ALL_MOVIES";
export const LOAD_ONE_MOVIE = "LOAD_ONE_MOVIE";
export const SEARCH_MOVIES = "SEARCH_MOVIES";
export const SORT_MOVIES = "SORT_MOVIES";
export const RESET_BROWSER = "RESET_BROWSER";
export const SET_ACTIVE_LIST = "SET_ACTIVE_LIST";
export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";

// Load all movies (HOME)
export const loadAllMoviesAction = (movies) => {
  return {
    type: LOAD_ALL_MOVIES,
    payload: movies,
  };
};

// Load one movie by ID (for details view)
export const loadOneMovieAction = (id) => {
  return {
    type: LOAD_ONE_MOVIE,
    payload: id,
  };
};

// Set search results
export const searchMoviesAction = (movies) => {
  return {
    type: SEARCH_MOVIES,
    payload: movies,
  };
};

// Set sorted movie list
export const sortMoviesAction = (movies) => {
  return {
    type: SORT_MOVIES,
    payload: movies,
  };
};

// Reset search and sort
export const resetBrowserAction = () => {
  return {
    type: RESET_BROWSER,
  };
};

// Set the active list (Home, Favorites, Watchlist)
export const setActiveListAction = (list) => {
  return {
    type: SET_ACTIVE_LIST,
    payload: list,
  };
};

// Set current page
export const setCurrentPageAction = (page) => {
  return {
    type: SET_CURRENT_PAGE,
    payload: page,
  };
};
