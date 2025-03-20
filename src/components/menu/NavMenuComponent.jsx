import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

const NavMenuComponent = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { pathname } = location;
    const { isLogged } = useSelector(state => state.userReducer);

    const goHome = () => navigate("/");
    const goToFavorites = () => navigate(isLogged ? "/favorites" : "/signin");
    const goToWatchlist = () => navigate(isLogged ? "/watchlist" : "/signin");
    const goToContact = () => navigate("/contact");
    const goToProfile = () => navigate(isLogged ? "/myprofile" : "/signin");

    return (
        <nav>
            <button onClick={goToProfile} disabled={pathname === "/myprofile"}>My Profile</button>
            <button onClick={goHome} disabled={pathname === "/"}>HOME</button>
            <button onClick={goToFavorites} disabled={pathname === "/favorites"}>Favorites</button>
            <button onClick={goToWatchlist} disabled={pathname === "/watchlist"}>Watchlist</button>
            <button onClick={goToContact} disabled={pathname === "/contact"}>Contact</button>
        </nav>
    );
};

export default NavMenuComponent;
