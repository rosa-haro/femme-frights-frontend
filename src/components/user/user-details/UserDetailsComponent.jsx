import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteLoggedUserFetch,
  getUserByIdFetch,
} from "../../../core/services/userFetch";
import {
  deleteUserAction,
  getUserDetailsAction,
  signOutAction,
} from "../UserActions";
import { useNavigate } from "react-router-dom";
import { activateEditMode } from "../../../core/redux/reducers/global/GlobalActions";
import UserFormComponent from "../user-form/UserFormComponent";
import { ClipLoader } from "react-spinners";
import "./UserDetailsComponent.css";

const UserDetailsComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, token } = useSelector((state) => state.userReducer);
  const { isEditing } = useSelector((state) => state.globalReducer);
  const [loading, setLoading] = useState(true);

  // Load user details from token
  const loadUserDetails = async () => {
    if (!token) {
      dispatch(signOutAction());
      localStorage.removeItem("token");
      return;
    }
    try {
      const auxUser = await getUserByIdFetch(token);
      dispatch(getUserDetailsAction(auxUser));
    } catch {
      dispatch(signOutAction());
      localStorage.removeItem("token");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      setLoading(false);
    } else {
      loadUserDetails();
    }
  }, [token]);

  const goHome = () => {
    navigate("/");
  };

  const handleEditMode = () => {
    dispatch(activateEditMode(!isEditing));
  };

  const signOutHandler = () => {
    dispatch(signOutAction());
    localStorage.removeItem("token");
    goHome();
  };

  const deleteUserHandler = async () => {
    try {
      await deleteLoggedUserFetch(token);
      dispatch(deleteUserAction());
    } catch {
      throw error;
    }
    signOutHandler();
  };

  useEffect(() => {
    return () => {
      dispatch(activateEditMode(false));
    };
  }, []);

  if (loading) {
    return (
      <div>
        <ClipLoader color="#444" size={50} />
      </div>
    );
  }

  if (!user) {
    return (
      <div>
        <p>User not found.</p>
      </div>
    );
  }

  return (
    <div>
      {isEditing ? (
        <UserFormComponent initialData={user} onCancel={handleEditMode} />
      ) : (
        <div className="user-profile">
          {/* Botón volver */}
          <div className="top-row">
            <button className="back-button" onClick={goHome}>
              <img
                src="/icons/left-arrow.svg"
                alt="Back"
                width={20}
                height={20}
              />
            </button>
          </div>

          {/* Foto de perfil */}
          <img src={user.profilePicture} alt="User profile picture" />

          {/* Info */}
          <div className="user-info">
            <div>
              <span>Name:</span>
              <span>{user.name}</span>
            </div>
            <div>
              <span>Last name:</span>
              <span>{user.lastName}</span>
            </div>
            <div>
              <span>Username:</span>
              <span>{user.username}</span>
            </div>
            <div>
              <span>Email:</span>
              <span>{user.email}</span>
            </div>
            <div>
              <span>Password:</span>
              <span>{"•".repeat(8)}</span>
            </div>
          </div>

          {/* Acciones */}
          <div className="user-actions">
            <button onClick={handleEditMode}>Edit my profile</button>
            <button onClick={deleteUserHandler}>Delete my account</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDetailsComponent;
