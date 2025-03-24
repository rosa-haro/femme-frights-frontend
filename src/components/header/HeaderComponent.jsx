import React from "react";
import NavMenuComponent from "../menu/NavMenuComponent";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOutAction } from "../user/UserActions";
import "./HeaderComponent.css";

const HeaderComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLogged, user } = useSelector((state) => state.userReducer);

  // Navigate to sign-in
  const goToSignIn = () => {
    navigate("/signin");
  };

  // Navigate to Home page
  const goHome = () => {
    navigate("/");
  };

  // Sign out user and return to home
  const signOutHandler = () => {
    dispatch(signOutAction());
    localStorage.removeItem("token");
    goHome();
  };

  return (
    <header>
      <div>
        {/* Logo image (loaded from URL for Vite compatibility in later deployment) */}
        <img
          src={new URL("../../../public/logo.png", import.meta.url).href}
          alt="Femme Frights logo"
        />
        <div className="header-titles">
          <h1>Femme Frights</h1>
          <h2 className="subtitle">Horror movies directed by women</h2>
        </div>

        {/* Sign in/out button */}
        <button
          onClick={isLogged ? signOutHandler : goToSignIn}
          className="button-solid"
        >
          {isLogged ? "Sign Out" : "Sign In"}
        </button>
      </div>

      <div>
        {/* Greeting message */}
        {isLogged ? (
          <div className="user-status">
            <span className="status-indicator" title="Online" />
            <span>Hi, {user.name}!</span>
          </div>
        ) : null}

        {/* Navigation menu */}
        <NavMenuComponent />
      </div>
    </header>
  );
};

export default HeaderComponent;
