import { useDispatch, useSelector } from "react-redux";
import { getUserByIdFetch, toggleFavoriteFetch, toggleWatchlistFetch } from "../services/userFetch";
import { getUserDetailsAction } from "../../components/user/UserActions";

const useToggleMovie = () => {
    const dispatch = useDispatch();
    const { favorites, watchlist, isLogged, token } = useSelector((state) => state.userReducer);

    const isFavorite = (id) => favorites.some((fav) => fav._id === id);
    const isInWatchlist = (id) => watchlist.some((movie) => movie._id === id);

    const handleToggleFavorite = async (idMovie) => {
        if (!token) {
            console.error("User not logged in");
            return;
        }
        try {
            await toggleFavoriteFetch(token, idMovie);
            const updatedUserData = await getUserByIdFetch(token);
            dispatch(getUserDetailsAction(updatedUserData));
        } catch (error) {
            console.error("Error toggling favorite:", error);
        }
    };

    const handleToggleWatchlist = async (idMovie) => {
        if (!token) {
            console.error("User not logged in");
            return;
        }
        try {
            await toggleWatchlistFetch(token, idMovie);
            const updatedUserData = await getUserByIdFetch(token);
            dispatch(getUserDetailsAction(updatedUserData));
        } catch (error) {
            console.error("Error toggling watchlist:", error);
        }
    };

    return { isFavorite, isInWatchlist, handleToggleFavorite, handleToggleWatchlist, isLogged };
};

export default useToggleMovie;
