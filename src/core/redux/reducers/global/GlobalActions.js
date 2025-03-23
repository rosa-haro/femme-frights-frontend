// Action types
export const ACTIVATE_EDIT_MODE = "ACTIVATE_EDIT_MODE";

// Toggle edit mode for the global state (e.g. editing user profile)
export const activateEditMode = (isEditing) => {
  return {
    type: ACTIVATE_EDIT_MODE,
    payload: isEditing,
  };
};