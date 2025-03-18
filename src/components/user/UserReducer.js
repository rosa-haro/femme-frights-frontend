import { SIGN_IN, SIGN_UP } from "./UserActions"

const initialState = {
    user: undefined, //undefined cuando no está logueado
}

const userReducer = (state = initialState, action) => {
    switch (action.type ) {
    case SIGN_IN:
    case SIGN_UP:
            return {
                ...state,
                user: action.payload
            };
        
        default:
            return state;
}}

export default userReducer