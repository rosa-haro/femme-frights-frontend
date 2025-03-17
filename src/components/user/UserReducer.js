import { SIGN_IN } from "./UserActions"

const initialState = {
    user: undefined, //undefined cuando no está logueado
}

const userReducer = (state = initialState, action) => {
    switch (action.type ) {
    case SIGN_IN:
            return {
                ...state,
                user: action.payload
            }
        
        default:
            return state;
}}

export default userReducer