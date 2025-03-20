import { GET_USER_DETAILS, SIGN_IN, SIGN_UP, SIGN_OUT, DELETE_USER, TOGGLE_PASSWORD_VISIBILITY, UPDATE_USER } from "./UserActions";

const initialState = {
    user: undefined,
    token: undefined,
    isLogged: false,
    isPasswordVisible: false,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SIGN_IN:
            return { 
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                isLogged: true,
            };
        case SIGN_UP:
        case GET_USER_DETAILS:
            if (!action.payload || !action.payload.user || !action.payload.token) {
                return state;
            } 
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token
            };
        case UPDATE_USER:
            return {
                ...state,
                user: { ...state.user, ...action.payload },
            };
        case SIGN_OUT:
        case DELETE_USER:
            return {
                ...state,
                user: undefined,
                token: undefined,
                isLogged: false,
            };
        case TOGGLE_PASSWORD_VISIBILITY:
            return {
                ...state,
                isPasswordVisible: !state.isPasswordVisible
            };
        default:
            return state;
    }
};

export default userReducer;