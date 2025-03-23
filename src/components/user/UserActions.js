// Action types
export const SIGN_IN = "SIGN_IN";
export const SIGN_UP = "SIGN_UP";
export const GET_USER_DETAILS = "GET_USER_DETAILS";
export const SIGN_OUT = "SIGN_OUT";
export const TOGGLE_PASSWORD_VISIBILITY = "TOGGLE_PASSWORD_VISIBILITY";
export const DELETE_USER = "DELETE_USER";
export const UPDATE_USER = "UPDATE_USER";

// Login
export const signInAction = (payload) => {
  return {
    type: SIGN_IN,
    payload: {
      user: payload.user,
      token: payload.token,
    },
  };
};

// Sign up
export const signUpAction = (user) => {
  return {
    type: SIGN_UP,
    payload: user,
  };
};

// Fetch user details (e.g. after login or reload)
export const getUserDetailsAction = (payload) => {
  return {
    type: GET_USER_DETAILS,
    payload,
  };
};

// Sign out user
export const signOutAction = () => {
  return {
    type: SIGN_OUT,
  };
};

// Delete user account
export const deleteUserAction = () => {
  return {
    type: DELETE_USER,
  };
};

// Update user data (e.g. profile edits)
export const updateUserAction = (updatedUserData) => {
  return {
    type: UPDATE_USER,
    payload: updatedUserData,
  };
};

// Toggle password visibility in form inputs
export const togglePasswordVisibility = () => {
  return {
    type: TOGGLE_PASSWORD_VISIBILITY,
  };
};
