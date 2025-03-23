// ✅ MoviesActions.js

// Tipos de acción
export const LOAD_ALL_MOVIES = "LOAD_ALL_MOVIES";
export const LOAD_ONE_MOVIE = "LOAD_ONE_MOVIE";
export const SEARCH_MOVIES = "SEARCH_MOVIES";
export const SORT_MOVIES = "SORT_MOVIES";
export const RESET_BROWSER = "RESET_BROWSER";
export const SET_ACTIVE_LIST = "SET_ACTIVE_LIST";
export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE"

// Cargar todas las películas (HOME)
export const loadAllMoviesAction = (movies) => ({
  type: LOAD_ALL_MOVIES,
  payload: movies
});

// Cargar una película por ID
export const loadOneMovieAction = (id) => ({
  type: LOAD_ONE_MOVIE,
  payload: id
});

// Establecer los resultados de búsqueda
export const searchMoviesAction = (movies) => ({
  type: SEARCH_MOVIES,
  payload: movies
});

// Establecer los resultados de sort
export const sortMoviesAction = (movies) => ({
  type: SORT_MOVIES,
  payload: movies
});

// Resetear búsqueda y orden al cambiar de vista
export const resetBrowserAction = () => ({
  type: RESET_BROWSER
});

// Establecer la lista activa (Home, Favorites, Watchlist)
export const setActiveListAction = (list) => ({
  type: SET_ACTIVE_LIST,
  payload: list
});

export const setCurrentPageAction = (page) => ({
  type: SET_CURRENT_PAGE,
  payload: page
})
