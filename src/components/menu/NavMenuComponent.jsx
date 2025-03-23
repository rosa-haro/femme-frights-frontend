import React from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import "./NavMenuComponent.css"

const NavMenuComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { pathname } = location;
  const { isLogged } = useSelector((state) => state.userReducer);

  // Navigation handlers: if it requires login, it navigates to Sign-in page
  const goHome = () => navigate("/");
  const goToContact = () => navigate("/contact");
  const goToProfile = () => navigate(isLogged ? "/myprofile" : "/signin");
  const goToFavorites = () => navigate(isLogged ? "/favorites" : "/signin");
  const goToWatchlist = () => navigate(isLogged ? "/watchlist" : "/signin");

  return (
    <nav>
      {/* Buttons are disabled when already on the corresponding page */}
      <button className="button" onClick={goHome} disabled={pathname === "/"}>
        HOME
      </button>
      <button className="button" onClick={goToProfile} disabled={pathname === "/myprofile"}>
        My Profile
      </button>
      <button className="button" onClick={goToFavorites} disabled={pathname === "/favorites"}>
        Favorites
      </button>
      <button className="button" onClick={goToWatchlist} disabled={pathname === "/watchlist"}>
        Watchlist
      </button>
      <button className="button" onClick={goToContact} disabled={pathname === "/contact"}>
        Contact
      </button>
    </nav>
  );
};

export default NavMenuComponent;
