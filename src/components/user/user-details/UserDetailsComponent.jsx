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
  const [showDeleteModal, setShowDeleteModal] = useState(false);

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
      {/* Modal */}
        {showDeleteModal && (
    <div className="modal-overlay">
      <div className="modal-container">
        <p className="modal-message">
          Are you sure you want to delete your account?
          <br />
          <span className="modal-warning delete">This action cannot be undone.</span>
        </p>
        <div className="modal-actions">
          <button className="button-solid cancel-button" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </button>
          <button
            className="button-solid delete-button"
            onClick={() => {
              setShowDeleteModal(false);
              deleteUserHandler();
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )}
  {/* Show UserForm if in edit mode */}
      {isEditing ? (
        <UserFormComponent initialData={user} onCancel={handleEditMode} />
      ) : (
        <div className="user-profile">
          {/* Back button */}
          <div className="top-row">
            <div className="button-placeholder"/>
            <h2 className="profile-title">My Profile</h2>
            <button className="back-button" onClick={goHome}>
              <img
                src="/icons/left-arrow.svg"
                alt="Back"
                width={20}
                height={20}
                />
            </button>
          </div>

          {/* Profile picture */}
          <img src={user.profilePicture} alt="User profile picture" />

          {/* User info */}
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
            <button
              onClick={() => {
                setShowDeleteModal(true);
              }}
            >
              Delete my account
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDetailsComponent;