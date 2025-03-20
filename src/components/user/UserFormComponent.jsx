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
  // Precargar datos si initialData existe (modo edición)
  const [registerInfo, setRegisterInfo] = useState(initialData || {});
  const [error, setError] = useState("");

  useEffect(() => {
    if (initialData) {
      setRegisterInfo(initialData);
    }
  }, [initialData]);

  const handleProfilePicture = (e) => {
    const file = e.target.files[0];
    if (file) {
      setRegisterInfo({ ...registerInfo, profilePicture: file });
    }
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateFields = () => {
    setError("");
    if (
      !registerInfo.name ||
      !registerInfo.lastName ||
      !registerInfo.username ||
      !registerInfo.email
    ) {
      setError("All (*) fields are required.");
      return false;
    }
    if (registerInfo.password && registerInfo.password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return false;
    }
    if (!validateEmail(registerInfo.email)) {
      setError("Invalid email format.");
      return false;
    }
    if (registerInfo.username.includes(" ")) {
      setError("Username cannot contain spaces.");
      return false;
    }
    if (
      !/^[a-zA-Z]+$/.test(registerInfo.name) ||
      !/^[a-zA-Z]+$/.test(registerInfo.lastName)
    ) {
      setError("Name and Last Name must contain only letters.");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateFields()) return;

    try {
        if (initialData) {
            if (!token) {
                setError("Authentication error: No token found.");
                return;
            }

            // const formData = new FormData();
            // for (const key in registerInfo) {
            //     if (key === "watchlist" || key === "favorites") {
            //         if (Array.isArray(registerInfo[key])) {
            //             const filteredArray = registerInfo[key].filter(item => item && item.trim() !== "");
            //             formData.append(key, JSON.stringify(filteredArray));
            //         }
            //     } else {
            //         formData.append(key, registerInfo[key]);
            //     }
            // }

            const updatedUser = await updateUserFetch(token, registerInfo);
            dispatch(updateUserAction(updatedUser));
            dispatch(activateEditMode(false));
        } else {
            const userInfo = await signUpFetch(registerInfo);
            if (!userInfo) {
                setError("Signup failed. Try again.");
                return;
            }
            dispatch(signUpAction(userInfo));
            navigate("/");
        }
    } catch (error) {
        setError(error.message || "An error occurred.");
    }
};

  const registerInputHandler = (name, value) => {
    setRegisterInfo({ ...registerInfo, [name]: value.trim() });
  };

  return (
    <div>
      {error && <div>{error}</div>}
      <div>
        <span>Name (*): </span>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={registerInfo.name || ""}
          onChange={(e) => registerInputHandler(e.target.name, e.target.value)}
        />
      </div>
      <div>
        <span>Last name (*): </span>
        <input
          type="text"
          placeholder="Lastname"
          name="lastName"
          value={registerInfo.lastName || ""}
          onChange={(e) => registerInputHandler(e.target.name, e.target.value)}
        />
      </div>
      <div>
        <span>Username (*): </span>
        <input
          type="text"
          placeholder="Username"
          name="username"
          value={registerInfo.username || ""}
          onChange={(e) => registerInputHandler(e.target.name, e.target.value)}
        />
      </div>
      <div>
        <span>E-mail (*): </span>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={registerInfo.email || ""}
          onChange={(e) => registerInputHandler(e.target.name, e.target.value)}
        />
      </div>
      <div>
        <span>Password: </span>
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={(e) => registerInputHandler(e.target.name, e.target.value)}
        />
      </div>
      <div>
        <span>Profile picture: </span>
        <input type="file" accept="image/*" onChange={handleProfilePicture} />
      </div>
      <div>
        <button onClick={handleSubmit}>
          {initialData ? "Save Changes" : "Sign up"}
        </button>
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
