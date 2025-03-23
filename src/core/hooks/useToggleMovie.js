// useToggleMovie.js ✅ Cleaned (names preserved)

import { useDispatch, useSelector } from "react-redux";
import {
  getUserByIdFetch,
  toggleFavoriteFetch,
  toggleWatchlistFetch
} from "../services/userFetch";
import { getUserDetailsAction } from "../../components/user/UserActions";

const useToggleMovie = () => {
  const dispatch = useDispatch();
  const { favorites, watchlist, isLogged, token } = useSelector((state) => state.userReducer);

  // Check if a movie is already marked as favorite
  const isFavorite = (id) => favorites.some((fav) => fav._id === id);

  // Check if a movie is in the user's watchlist
  const isInWatchlist = (id) => watchlist.some((movie) => movie._id === id);

  // Toggle favorite status
  const handleToggleFavorite = async (idMovie) => {
    if (!token) return;

    try {
      await toggleFavoriteFetch(token, idMovie);
      const updatedUserData = await getUserByIdFetch(token);
      dispatch(getUserDetailsAction(updatedUserData));
    } catch (error) {
      throw error;
    }
  };

  // Toggle watchlist status
  const handleToggleWatchlist = async (idMovie) => {
    if (!token) return;

    try {
      await toggleWatchlistFetch(token, idMovie);
      const updatedUserData = await getUserByIdFetch(token);
      dispatch(getUserDetailsAction(updatedUserData));
    } catch (error) {
      throw error;
    }
  };

  return {
    isFavorite,
    isInWatchlist,
    handleToggleFavorite,
    handleToggleWatchlist,
    isLogged
  };
};

export default useToggleMovie;
