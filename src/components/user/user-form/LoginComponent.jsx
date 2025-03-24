import React, { useState } from "react";
import { signInFetch } from "../../../core/services/userFetch";
import { signInAction } from "../UserActions";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./UserFormComponent.css"

const LoginComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Check that fields are filled
  const validateSignInFields = () => {
    if (!username || !password) {
      setError("Username and password are required.");
      return false;
    }
    return true;
  };

  // Sign in handler
  const signIn = async () => {
    setError("");
    if (!validateSignInFields()) return;

    try {
      const userInfo = await signInFetch(username.trim(), password);
      if (!userInfo || !userInfo.token) {
        setError("Invalid username or password.");
        return;
      }

      dispatch(signInAction(userInfo));
      localStorage.setItem("token", userInfo.token);
      navigate("/");
    } catch (error) {
      setError(error.message || "An error occurred while signing in.");
    }
  };

  return (
<div className="user-form compact">
  {/* Error message */}
  {error && <div className="form-error">{error}</div>}

  <div className="form-group">
    <label>Username</label>
    <input
      type="text"
      placeholder="Username"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
    />
  </div>

  <div className="form-group">
    <label>Password</label>
    <input
      type="password"
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />
  </div>

  <div className="form-actions">
    <button onClick={signIn}>Sign in</button>
  </div>

  <div className="form-footer">
    <span>Don't have an account yet?</span>
    <Link to="/signup">Sign up.</Link>
  </div>
</div>
  );
};

export default LoginComponent;
