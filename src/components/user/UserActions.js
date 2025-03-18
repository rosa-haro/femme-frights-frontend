export const SIGN_IN = "SIGN_IN"
export const SIGN_UP = "SIGN_UP"

export const signInAction = (payload) => {
    return {
        type: SIGN_IN,
        payload
    }
}

export const signUpAction = (user) => {
    return {
        type: SIGN_UP,
        payload: user,
    }
}