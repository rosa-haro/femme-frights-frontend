import { ACTIVATE_EDIT_MODE } from "./GlobalActions";

const initialState = {
    isEditing: false,
};

const globalReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIVATE_EDIT_MODE: {
            return {
                ...state,
                isEditing: action.payload,
            }
        }
        default:
            return state
    }
}

export default globalReducer