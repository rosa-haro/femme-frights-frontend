export const SIGN_IN = "SIGN_IN"
export const SIGN_UP = "SIGN_UP"
export const GET_USER_DETAILS = "GET_USER_DETAILS"
export const SIGN_OUT = "SIGN_OUT"
export const TOGGLE_PASSWORD_VISIBILITY = "TOGGLE_PASSWORD_VISIBILITY"
export const DELETE_USER = "DELETE_USER"
export const UPDATE_USER = "UPDATE_USER"


export const signInAction = (payload) => {
    return {
        type: SIGN_IN,
        payload: {
            user: payload.user,
            token: payload.token
        }
    }
}

export const signUpAction = (user) => {
    return {
        type: SIGN_UP,
        payload: user,
    }
}

export const getUserDetailsAction = (payload) => {
    console.log("Dispatching GET_USER DETAILS with payload: ", payload)
    return {
        type: GET_USER_DETAILS,
        payload
    }
}

export const signOutAction = () => {
    return {
        type: SIGN_OUT
    }
}

export const deleteUserAction = () => {
    return {
        type: DELETE_USER
    }
}

export const updateUserAction = (updatedUserData) => {
    return {
        type: UPDATE_USER,
        payload: updatedUserData,
    }
}

// No puedo implementarlo en myprofile, pero sí me serviría para el login/signup y para el editar
export const togglePasswordVisibility = () => {
    return {
        type: TOGGLE_PASSWORD_VISIBILITY
    }
}