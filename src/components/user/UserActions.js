export const SIGN_IN = "SIGN_IN"

export const signInAction = (payload) => {
    return {
        type: SIGN_IN,
        payload
    }
}