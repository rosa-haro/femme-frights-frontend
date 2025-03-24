import React, { useState, useEffect } from "react";
import { signUpFetch, updateUserFetch } from "../../../core/services/userFetch";
import { signUpAction, updateUserAction } from "../UserActions";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { activateEditMode } from "../../../core/redux/reducers/global/GlobalActions";
import { ClipLoader } from "react-spinners";
import "./UserFormComponent.css";

const UserFormComponent = ({ initialData, onCancel }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.userReducer);

  const [formUserInfo, setFormUserInfo] = useState(initialData || {});
  const [error, setError] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (initialData) setFormUserInfo(initialData);
  }, [initialData]);

  const handleInputChange = (e) => {
    setFormUserInfo({
      ...formUserInfo,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleProfilePicture = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormUserInfo({ ...formUserInfo, profilePicture: file });
    }
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateFields = () => {
    setError("");
    const { name, lastName, username, email, password } = formUserInfo;

    if (!name || !lastName || !username || !email) {
      setError("All (*) fields are required.");
      return false;
    }

    if (password && password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return false;
    }

    if (!validateEmail(email)) {
      setError("Invalid email format.");
      return false;
    }

    if (username.includes(" ")) {
      setError("Username cannot contain spaces.");
      return false;
    }

    if (!/^[a-zA-Z]+$/.test(name) || !/^[a-zA-Z]+$/.test(lastName)) {
      setError("Name and Last Name must contain only letters.");
      return false;
    }

    return true;
  };

  const prepareFormData = (updatedData) => {
    const formData = new FormData();
    formData.append("profilePicture", formUserInfo.profilePicture);

    for (const key in updatedData) {
      if (key !== "profilePicture") {
        formData.append(key, updatedData[key]);
      }
    }

    return formData;
  };

  const goHome = () => navigate("/");

  const handleSubmit = async () => {
    if (!validateFields()) return;

    try {
      if (initialData) {
        // Edit mode
        if (!token) {
          setError("Authentication error: No token found.");
          return;
        }

        const updatedData = Object.keys(formUserInfo).reduce((acc, key) => {
          if (
            formUserInfo[key] !== initialData[key] &&
            formUserInfo[key] !== ""
          ) {
            acc[key] = formUserInfo[key];
          }
          return acc;
        }, {});

        const dataToSend =
          formUserInfo.profilePicture instanceof File
            ? prepareFormData(updatedData)
            : updatedData;

        setIsUpdating(true);
        await updateUserFetch(token, dataToSend);
        setIsUpdating(false);

        dispatch(updateUserAction(updatedData));
        dispatch(activateEditMode(false));
      } else {
        // Registration mode
        let dataToSend = { ...formUserInfo };

        if (formUserInfo.profilePicture instanceof File) {
          const formData = new FormData();
          Object.entries(formUserInfo).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
              formData.append(key, value);
            }
          });
          dataToSend = formData;
        }

        const userInfo = await signUpFetch(dataToSend);
        if (!userInfo) {
          setError("Signup failed. Try again.");
          return;
        }

        dispatch(signUpAction(userInfo));
        goHome();
      }
    } catch (error) {
      setIsUpdating(false);
      setError(error.message || "An error occurred.");
    }
  };

  return (
    <div className="user-form">
      {error && <div className="form-error">{error}</div>}
      {isUpdating && (
        <div className="form-loader">
          <ClipLoader color="#888" size={30} />
        </div>
      )}

      <div className="form-group">
        <label>Name{!initialData && " (*)"}</label>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formUserInfo.name || ""}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group">
        <label>Last name{!initialData && " (*)"}</label>
        <input
          type="text"
          name="lastName"
          placeholder="Last name"
          value={formUserInfo.lastName || ""}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group">
        <label>Username{!initialData && " (*)"}</label>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formUserInfo.username || ""}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group">
        <label>Email{!initialData && " (*)"}</label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formUserInfo.email || ""}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group">
        <label>Password{!initialData && " (*)"}</label>
        <input
          type="password"
          name="password"
          placeholder="New password"
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group">
        <label>Profile picture{initialData && " (*)"}</label>
        <input type="file" accept="image/*" onChange={handleProfilePicture} />
      </div>

      <div className="form-note">
        {initialData ? (
          <p>(*) Updating profile picture may require refreshing the page.</p>
        ) : (
          <p>All (*) fields are required.</p>
        )}
      </div>

      <div className="form-actions">
        <button onClick={handleSubmit}>
          {initialData ? "Save changes" : "Sign up"}
        </button>
        {initialData && (
          <button className="button-secondary" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>

      {!initialData && (
        <div className="form-footer">
          <span>Already have an account?</span>
          <Link to="/signin">Sign in</Link>
        </div>
      )}
    </div>
  );
};

export default UserFormComponent;
