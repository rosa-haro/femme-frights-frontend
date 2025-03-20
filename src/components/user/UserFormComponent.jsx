import React, { useState, useEffect } from "react";
import { signUpFetch, updateUserFetch } from "../../core/services/userFetch";
import { signUpAction, updateUserAction } from "./UserActions";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { activateEditMode } from "../../core/redux/reducers/global/GlobalActions";

const UserFormComponent = ({ initialData, onCancel }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.userReducer);

  const [formUserInfo, setFormUserInfo] = useState(initialData || {});
  const [error, setError] = useState("");

  useEffect(() => {
    if (initialData) setFormUserInfo(initialData);
  }, [initialData]);

  const handleInputChange = (e) => {
    setFormUserInfo({ ...formUserInfo, [e.target.name]: e.target.value.trim() });
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

    console.log("✅ Sending FormData:", [...formData.entries()]);
    return formData;
  };

  const goHome = () => {
    navigate("/");
  };

  const handleSubmit = async () => {
    if (!validateFields()) return;

    try {
      if (!token) {
        setError("Authentication error: No token found.");
        return;
      }

      if (initialData) {
        // Edit mode
        const updatedData = Object.keys(formUserInfo).reduce((acc, key) => {
          if (formUserInfo[key] !== initialData[key] && formUserInfo[key] !== "") {
            acc[key] = formUserInfo[key];
          }
          return acc;
        }, {});

        const dataToSend = formUserInfo.profilePicture instanceof File
          ? prepareFormData(updatedData)
          : updatedData;

        await updateUserFetch(token, dataToSend);
        dispatch(updateUserAction(updatedData));
        dispatch(activateEditMode(false));
      } else {
        // Registration mode
        const formData = new FormData();
        Object.entries(formUserInfo).forEach(([key, value]) => formData.append(key, value));

        console.log("✅ Sending FormData for registration:", [...formData.entries()]);

        const userInfo = await signUpFetch(formData);
        if (!userInfo) {
          setError("Signup failed. Try again.");
          return;
        }

        dispatch(signUpAction(userInfo));
        goHome();
      }
    } catch (error) {
      setError(error.message || "An error occurred.");
    }
  };

  return (
    <div>
      {error && <div>{error}</div>}
      {initialData && (
        <div style={{ color: "red", fontSize: "14px", marginBottom: "10px" }}>
          ⚠️ If you change your profile picture, it may take a few minutes to update.
        </div>
      )}
      <div>
        <span>Name (*): </span>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={formUserInfo.name || ""}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <span>Last name (*): </span>
        <input
          type="text"
          placeholder="Lastname"
          name="lastName"
          value={formUserInfo.lastName || ""}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <span>Username (*): </span>
        <input
          type="text"
          placeholder="Username"
          name="username"
          value={formUserInfo.username || ""}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <span>E-mail (*): </span>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={formUserInfo.email || ""}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <span>Password: </span>
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleInputChange}
        />
      </div>
      <div>
        <span>Profile picture: </span>
        <input type="file" accept="image/*" onChange={handleProfilePicture} />
      </div>
      <div>
        <button onClick={handleSubmit}>{initialData ? "Save Changes" : "Sign up"}</button>
        {initialData && <button onClick={onCancel}>Cancel</button>}
      </div>
      {!initialData && (
        <div>
          <span>Already have an account? </span>
          <Link to="/signin">Sign in.</Link>
        </div>
      )}
    </div>
  );
};

export default UserFormComponent;
