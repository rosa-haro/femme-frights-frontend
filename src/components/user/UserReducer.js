import { GET_USER_DETAILS, SIGN_IN, SIGN_UP, SIGN_OUT } from "./UserActions"

const initialState = {
    user: undefined,
    token: undefined, //undefined cuando no está logueado
}

const userReducer = (state = initialState, action) => {
    switch (action.type ) {
    case SIGN_IN:
        console.log("SIGN_IN Reducer triggered with:", action.payload)
        return {...state,
            user: action.payload.user,
            token: action.payload.token
        }
    case SIGN_UP:
    case GET_USER_DETAILS:
        if (!action.payload || !action.payload.user || !action.payload.token) {
            console.warn("GET_USER_DETAILS received invalid data:", action.payload); 
            // ES ESTO LO QUE ME ESTÁ DICIENDO!
            return state;
         } 
         console.log("GET_USER_DETAILS Reducer triggered with:", action.payload)
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token
            };
    case SIGN_OUT:
        return {
            ...state,
            user: undefined,
            token: undefined,
        };

        default:
            return state;
}}

export default userReducer