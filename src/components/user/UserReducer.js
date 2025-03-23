import {
  GET_USER_DETAILS,
  SIGN_IN,
  SIGN_UP,
  SIGN_OUT,
  DELETE_USER,
  TOGGLE_PASSWORD_VISIBILITY,
  UPDATE_USER,
} from "./UserActions";

// Initial state for user-related data
const initialState = {
  user: undefined,
  token: undefined,
  isLogged: false,
  isPasswordVisible: false,
  favorites: [],
  watchlist: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN:
      // Set user and token on login
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isLogged: true,
      };

    case SIGN_UP:
    case GET_USER_DETAILS:
      // Sign up or fetch user details (e.g. after reload); ensures payload is valid
      if (!action.payload || !action.payload.user || !action.payload.token) {
        return state;
      }
      //  user state
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        favorites: action.payload.user.favorites,
        watchlist: action.payload.user.watchlist,
      };

    case UPDATE_USER:
      // Merge new user data with existing one (patch)
      return {
        ...state,
        user: { ...state.user, ...action.payload },
      };

    case SIGN_OUT:
    case DELETE_USER:
      // Clear all user-related data
      return {
        ...state,
        user: undefined,
        token: undefined,
        isLogged: false,
        favorites: [],
        watchlist: [],
      };

    case TOGGLE_PASSWORD_VISIBILITY:
      // Toggle password visibility state
      return {
        ...state,
        isPasswordVisible: !state.isPasswordVisible,
      };

    default:
      return state;
  }
};

export default userReducer;
