export const SIGN_IN = "SIGN_IN"
export const SIGN_UP = "SIGN_UP"
export const GET_USER_DETAILS = "GET_USER_DETAILS"
export const SIGN_OUT = "SIGN_OUT"

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