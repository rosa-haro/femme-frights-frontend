import React from 'react'
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom'

const NavMenuComponent = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { pathname } = location;

    const goHome = () => {
        navigate("/")
    }

    const goToProfile = () => {
        navigate("/myprofile")
    }
    
    const goToFavorites = () => {
        navigate("/favorites")
    }

    const goToWatchlist = () => {
        navigate("/watchlist")
    }

    const goToContact = () => {
        navigate("/contact")
    }

    return (
        <nav>
        <button onClick={goToProfile} disabled={pathname === "/myprofile"}>My profile</button>
        <button onClick={goHome} disabled={pathname === "/"}>HOME</button>
        <button onClick={goToFavorites} disabled={pathname === "/favorites"}>Favorites</button>
        <button onClick={goToWatchlist} disabled={pathname === "/watchlist"}>Watchlist</button>
        <button onClick={goToContact} disabled={pathname === "/contact"}>Contact</button>

    </nav>
  )
}

export default NavMenuComponent