const apiUrl = import.meta.env.VITE_API_URL;

// Sign in with username and password
export const signInFetch = async (username, password) => {
  try {
    const res = await fetch(`${apiUrl}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const result = await res.json();
    if (!res.ok) {
      throw new Error(
        result.message || `Error: ${res.status} - ${res.statusText}`
      );
    }

    return result;
  } catch (error) {
    throw error;
  }
};

// Sign up new user (JSON, or FormData for profile picture)
export const signUpFetch = async (newUser) => {
  try {
    const options = { method: "POST" };

    if (newUser instanceof FormData) {
      options.body = newUser;
    } else {
      options.headers = { "Content-Type": "application/json" };
      options.body = JSON.stringify(newUser);
    }

    const res = await fetch(`${apiUrl}/signup`, options);
    const result = await res.json();

    if (!res.ok) {
      throw new Error(
        result.message || `Error: ${res.status} - ${res.statusText}`
      );
    }

    return result.user;
  } catch (error) {
    throw error;
  }
};

// Get current user profile
export const getUserByIdFetch = async (token) => {
  if (!token) {
    console.error("Token is required for getUserByIdFetch.");
    return null;
  }

  try {
    const res = await fetch(`${apiUrl}/users/myprofile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Error: ${res.status} - ${errorText}`);
    }

    const userData = await res.json();
    return { user: userData, token };
  } catch (error) {
    throw error;
  }
};

// Delete current user
export const deleteLoggedUserFetch = async (token) => {
  if (!token) {
    console.error("Token is required for deleteLoggedUserFetch.");
    return null;
  }

  try {
    const res = await fetch(`${apiUrl}/users/myprofile`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Error: ${res.status} - ${errorText}`);
    }

    return { message: "User deleted successfully" };
  } catch (error) {
    throw error;
  }
};

// Update user profile (JSON, or FormData for profile picture)
export const updateUserFetch = async (token, updatedUserData) => {
  if (!token) {
    console.error("Token is required for updateUserFetch.");
    return null;
  }

  try {
    const options = {
      method: "PATCH",
      headers: { "auth-token": token },
    };

    if (updatedUserData instanceof FormData) {
      options.body = updatedUserData;
    } else {
      options.headers["Content-Type"] = "application/json";
      options.body = JSON.stringify(updatedUserData);
    }

    const res = await fetch(`${apiUrl}/users/myprofile`, options);

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Error: ${res.status} - ${errorText}`);
    }

    return await res.json();
  } catch (error) {
    throw error;
  }
};

// Toggle favorite movie (add/remove)
export const toggleFavoriteFetch = async (token, idMovie) => {
  if (!token) {
    console.error("Token is required for toggleFavoriteFetch.");
    return null;
  }

  try {
    const res = await fetch(`${apiUrl}/users/favorites/${idMovie}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Error: ${res.status} - ${errorText}`);
    }

    const result = await res.json();
    return result.favorites;
  } catch (error) {
    console.error("Error in toggleFavoriteFetch:", error.message);
    throw error;
  }
};

// Toggle watchlist movie (add/remove)
export const toggleWatchlistFetch = async (token, idMovie) => {
  if (!token) {
    console.error("Token is required for toggleWatchlistFetch.");
    return null;
  }

  try {
    const res = await fetch(`${apiUrl}/users/watchlist/${idMovie}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Error: ${res.status} - ${errorText}`);
    }

    const result = await res.json();
    return result.watchlist;
  } catch (error) {
    console.error("Error in toggleWatchlistFetch:", error.message);
    throw error;
  }
};
