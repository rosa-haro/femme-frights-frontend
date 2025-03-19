import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

const NavMenuComponent = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { pathname } = location;
    const { isLogged } = useSelector(state => state.userReducer);

    const goTo = (path) => {
        navigate(path);
    };

    return (
        <nav>
            <button 
                onClick={() => goTo(isLogged ? "/myprofile" : "/signin")} 
                disabled={pathname === "/myprofile"}
            >
                My Profile
            </button>
            <button onClick={() => goTo("/")} disabled={pathname === "/"}>HOME</button>
            <button onClick={() => goTo("/favorites")} disabled={pathname === "/favorites"}>Favorites</button>
            <button onClick={() => goTo("/watchlist")} disabled={pathname === "/watchlist"}>Watchlist</button>
            <button onClick={() => goTo("/contact")} disabled={pathname === "/contact"}>Contact</button>
        </nav>
    );
};

export default NavMenuComponent;