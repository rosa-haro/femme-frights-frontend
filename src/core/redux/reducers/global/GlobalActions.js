export const ACTIVATE_EDIT_MODE = "ACTIVATE_EDIT_MODE"

export const activateEditMode = (isEditing) => {
    return {
        type: ACTIVATE_EDIT_MODE,
        payload: isEditing
    }
}