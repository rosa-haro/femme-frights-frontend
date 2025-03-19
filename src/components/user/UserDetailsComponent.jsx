import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useLocation } from 'react-router-dom'
import { deleteLoggedUserFetch, getUserByIdFetch } from "../../core/services/userFetch";
import {
  deleteUserAction,
  getUserDetailsAction,
  signOutAction,
  togglePasswordVisibility,
} from "./UserActions";
import { useNavigate } from "react-router-dom";

const UserDetailsComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const { user, token } = useSelector((state) => state.userReducer);

  console.log("Redux Token:", token);

  const goHome = () => {
    navigate("/")
  }

  const loadUserDetails = async () => {
    if (!token) {
      console.error("No hay token disponible. Cerrando sesión...");
      dispatch(signOutAction());
      return;
    }

    try {
      const auxUser = await getUserByIdFetch(token);
      dispatch(getUserDetailsAction(auxUser));
    } catch (error) {
      console.error("Error obteniendo los detalles del usuario:", error);
      dispatch(signOutAction());
    }
  };

  const deleteUserHandler = async () => {
    try {
      await deleteLoggedUserFetch(token);
      dispatch(deleteUserAction())
    } catch (error) {
      console.error("Error deleting user:", error.message)
    }
    signOutHandler()
  }

  const signOutHandler = () => {
    dispatch(signOutAction())
    goHome()
  }

  useEffect(() => {
    if (token) {
      loadUserDetails();
    }
  }, [token]);

  return (
    <div>
      {!user ? (
        <div>
          <p>Loading...</p>
        </div>
      ) : (
        <div>
          <div>
            <img src={user.profilePicture} alt="User profile picture" />
          </div>
          <div>
            <span>Name: </span>
            <span>{user.name}</span>
          </div>
          <div>
            <span>Last name: </span>
            <span>{user.lastName}</span>
          </div>
          <div>
            <span>Username: </span>
            <span>{user.username}</span>
          </div>
          <div>
            <span>Email: </span>
            <span>{user.email}</span>
          </div>
          <div>
            <span>Password: </span>
            <span>{"•".repeat(8)}</span>
          </div>
          <div>
            <button onClick={() => {}}>Edit my profile</button>
            <button onClick={deleteUserHandler}>Delete my account</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDetailsComponent;
